import React, {useState} from 'react';
import {IUser, PropsMainPage} from './interfaces';
import styles from './MainPage.module.scss';
import Search from '~/components/common/Search';
import FilterCustom from '~/components/common/FilterCustom';
import Button from '~/components/common/Button';
import {PATH} from '~/constants/config';
import DataWrapper from '~/components/common/DataWrapper';
import Noti from '~/components/common/DataWrapper/components/Noti';
import {useRouter} from 'next/router';
import Table from '~/components/common/Table';
import IconCustom from '~/components/common/IconCustom';
import {LuPencil} from 'react-icons/lu';
import {UserAdd} from 'iconsax-react';
import Pagination from '~/components/common/Pagination';
import Dialog from '~/components/common/Dialog';
import Image from 'next/image';
import icons from '~/constants/images/icons';
import Link from 'next/link';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {CONFIG_DESCENDING, CONFIG_PAGING, CONFIG_STATUS, CONFIG_TYPE_FIND, QUERY_KEY} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import userServices from '~/services/userServices';
import Loading from '~/components/common/Loading';
import {HiOutlineLockClosed} from 'react-icons/hi';
import TagStatus from '~/components/common/TagStatus';
import regencyServices from '~/services/regencyServices';

function MainPage({}: PropsMainPage) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_page, _pageSize, _userOwnerUu, _keyword, _manager, _regencyUuid, _regencyUuidExclude, _provinceIDOwer, _status} = router.query;

	const [dataStatus, setDataStatus] = useState<IUser | null>(null);

	const listRegency = useQuery([QUERY_KEY.dropdown_chuc_vu], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: regencyServices.listRegency({
					page: 1,
					pageSize: 20,
					keyword: '',
					isPaging: CONFIG_PAGING.NO_PAGING,
					isDescending: CONFIG_DESCENDING.NO_DESCENDING,
					typeFind: CONFIG_TYPE_FIND.DROPDOWN,
					status: CONFIG_STATUS.HOAT_DONG,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const fucnChangeStatus = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: dataStatus?.status == CONFIG_STATUS.HOAT_DONG ? 'Dừng hoạt động thành công' : 'Mở khóa thành công',
				http: userServices.changeStatus({
					uuid: dataStatus?.uuid!,
					status: dataStatus?.status! == CONFIG_STATUS.HOAT_DONG ? CONFIG_STATUS.BI_KHOA : CONFIG_STATUS.HOAT_DONG,
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				setDataStatus(null);
				queryClient.invalidateQueries([
					QUERY_KEY.table_nhan_vien,
					_page,
					_pageSize,
					_keyword,
					_regencyUuid,
					_regencyUuidExclude,
					_provinceIDOwer,
					_status,
					_userOwnerUu,
				]);
			}
		},
	});

	const listUserStaff = useQuery(
		[QUERY_KEY.table_nhan_vien, _page, _pageSize, _keyword, _userOwnerUu, _regencyUuid, _regencyUuidExclude, _provinceIDOwer, _status],
		{
			queryFn: () =>
				httpRequest({
					isList: true,
					http: userServices.listUser({
						page: Number(_page) || 1,
						pageSize: Number(_pageSize) || 20,
						keyword: (_keyword as string) || '',
						isPaging: CONFIG_PAGING.IS_PAGING,
						isDescending: CONFIG_DESCENDING.NO_DESCENDING,
						typeFind: CONFIG_TYPE_FIND.TABLE,
						status: !!_status ? Number(_status) : null,
						regencyUuid: (_regencyUuid as string) || '',
						regencyUuidExclude: (_regencyUuidExclude as string) || '',
						provinceIDOwer: (_provinceIDOwer as string) || '',
					}),
				}),
			select(data) {
				return data;
			},
		}
	);
	return (
		<div className={styles.container}>
			<Loading loading={fucnChangeStatus.isLoading} />
			<div className={styles.header}>
				<div className={styles.main_search}>
					<div className={styles.search}>
						<Search keyName='_keyword' placeholder='Tìm kiếm theo id, tên' />
					</div>
					<div className={styles.filter}>
						<FilterCustom
							isSearch
							name='Chức vụ'
							query='_regencyUuid'
							listFilter={listRegency?.data?.map((v: any) => ({
								id: v?.uuid,
								name: v?.name,
							}))}
						/>
					</div>
					<div className={styles.filter}>
						<FilterCustom
							isSearch
							name='Trạng thái'
							query='_status'
							listFilter={[
								{
									id: CONFIG_STATUS.HOAT_DONG,
									name: 'Đang hoạt động',
								},
								{
									id: CONFIG_STATUS.BI_KHOA,
									name: 'Bị khóa',
								},
							]}
						/>
					</div>
				</div>
				<div className={styles.btn}>
					<Button
						p_8_16
						rounded_2
						href={PATH.ThemNhanVien}
						icon={<Image alt='icon add' src={icons.add} width={20} height={20} />}
					>
						Thêm nhân viên
					</Button>
				</div>
			</div>

			<div className={styles.table}>
				<DataWrapper
					data={listUserStaff?.data?.items || []}
					loading={listRegency.isLoading || listRegency.isLoading || listUserStaff.isLoading}
					noti={
						<Noti
							titleButton='Thêm Nhân viên'
							onClick={() => router.push(PATH.ThemNhanVien)}
							des='Hiện tại chưa có Nhân viên nào, thêm ngay?'
						/>
					}
				>
					<Table
						data={listUserStaff?.data?.items || []}
						column={[
							{
								title: 'STT',
								render: (data: IUser, index: number) => <>{index + 1}</>,
							},
							{
								title: 'Họ tên',
								render: (data: IUser) => (
									<Link href={`/nhan-vien/${data?.uuid}`} className={styles.link}>
										{data?.fullName}
									</Link>
								),
							},
							{
								title: 'Chức vụ',
								render: (data: IUser) => <>{data?.regencyUuName}</>,
							},
							{
								title: 'Số điện thoại',
								render: (data: IUser) => <>{data?.phoneNumber}</>,
							},
							{
								title: 'Email',
								render: (data: IUser) => <>{data?.email}</>,
							},
							{
								title: 'Tỉnh thành quản lý',
								render: (data: IUser) => <>{data?.address}</>,
							},
							{
								title: 'Ghi chú',
								render: (data: IUser) => <>{data?.description}</>,
							},
							{
								title: 'Trạng thái',
								render: (data: IUser) => <TagStatus status={data.status} />,
							},
							{
								title: 'Tác vụ',
								render: (data: IUser) => (
									<div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
										<IconCustom
											edit
											icon={<UserAdd fontSize={20} fontWeight={600} />}
											tooltip='Cấp tài khoản'
											color='#777E90'
											onClick={() => {
												router.push(`/nhan-vien/123`);
											}}
										/>
										<IconCustom
											edit
											icon={<LuPencil fontSize={20} fontWeight={600} />}
											tooltip='Chỉnh sửa'
											color='#777E90'
											href={`/nhan-vien/chinh-sua?_id=${123}`}
										/>

										<IconCustom
											lock
											icon={<HiOutlineLockClosed size='22' />}
											tooltip={data.status == CONFIG_STATUS.HOAT_DONG ? 'Khóa' : 'Mở khóa'}
											color='#777E90'
											onClick={() => {
												setDataStatus(data);
											}}
										/>
									</div>
								),
							},
						]}
					/>
				</DataWrapper>
				<Pagination
					currentPage={Number(_page) || 1}
					total={listUserStaff?.data?.pagination?.totalCount}
					pageSize={Number(_pageSize) || 20}
					dependencies={[_pageSize, _keyword, _manager]}
				/>
			</div>

			<Dialog
				danger
				open={!!dataStatus}
				onClose={() => setDataStatus(null)}
				title={dataStatus?.status == CONFIG_STATUS.HOAT_DONG ? 'Khóa hoạt động nhân viên' : 'Mở khóa hoạt động nhân viên'}
				note={
					dataStatus?.status == CONFIG_STATUS.HOAT_DONG
						? 'Bạn có chắc chắn muốn khóa hoạt động nhân viên này?'
						: 'Bạn có chắc chắn muốn mở khóa hoạt động nhân viên này?'
				}
				onSubmit={fucnChangeStatus.mutate}
			/>
		</div>
	);
}

export default MainPage;
