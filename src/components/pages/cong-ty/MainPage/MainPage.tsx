import React, {useState} from 'react';
import {ICompany, PropsMainPage} from './interfaces';
import styles from './MainPage.module.scss';
import Search from '~/components/common/Search';
import FilterCustom from '~/components/common/FilterCustom';
import Button from '~/components/common/Button';
import {PATH} from '~/constants/config';
import DataWrapper from '~/components/common/DataWrapper';
import Noti from '~/components/common/DataWrapper/components/Noti';
import {useRouter} from 'next/router';
import Table from '~/components/common/Table';
import {LuPencil} from 'react-icons/lu';
import IconCustom from '~/components/common/IconCustom';
import Pagination from '~/components/common/Pagination';
import DateRangerCustom from '~/components/common/DateRangerCustom';
import Dialog from '~/components/common/Dialog';
import Link from 'next/link';
import {HiOutlineLockClosed} from 'react-icons/hi';
import Image from 'next/image';
import icons from '~/constants/images/icons';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {CONFIG_DESCENDING, CONFIG_PAGING, CONFIG_STATUS, CONFIG_TYPE_FIND, QUERY_KEY} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import partnerServices from '~/services/partnerServices';
import userServices from '~/services/userServices';
import TagStatus from '~/components/common/TagStatus';
import Loading from '~/components/common/Loading';

function MainPage({}: PropsMainPage) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_page, _pageSize, _keyword, _manager, _dateFrom, _dateTo, _status, _userUuid} = router.query;

	const [dataStatus, setDataStatus] = useState<ICompany | null>(null);

	// Lấy danh sách người quản lý ==> user ==> status == 0
	const listUser = useQuery([QUERY_KEY.dropdown_nguoi_quan_ly], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: userServices.listUser({
					page: 1,
					pageSize: 20,
					keyword: '',
					isPaging: CONFIG_PAGING.NO_PAGING,
					isDescending: CONFIG_DESCENDING.NO_DESCENDING,
					typeFind: CONFIG_TYPE_FIND.DROPDOWN,
					status: CONFIG_STATUS.HOAT_DONG,
					provinceIDOwer: '',
					regencyUuid: '',
					regencyUuidExclude: '',
				}),
			}),
		select(data) {
			return data;
		},
	});

	// Lấy danh sach công ty
	const listPartner = useQuery([QUERY_KEY.table_cong_ty, _page, _pageSize, _keyword, _status, _userUuid], {
		queryFn: () =>
			httpRequest({
				isList: true,
				http: partnerServices.listPartner({
					pageSize: Number(_pageSize) || 20,
					page: Number(_page) || 1,
					keyword: (_keyword as string) || '',
					status: !!_status ? Number(_status) : null,
					isDescending: CONFIG_DESCENDING.NO_DESCENDING,
					typeFind: CONFIG_TYPE_FIND.TABLE,
					isPaging: CONFIG_PAGING.IS_PAGING,
					userUuid: (_userUuid as string) || '',
					provinceId: '',
				}),
			}),
		select(data) {
			return data;
		},
	});

	const funcChangeStatus = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: dataStatus?.status == CONFIG_STATUS.BI_KHOA ? 'Mở khóa thành công' : 'Khóa thành công',
				http: partnerServices.changeStatus({
					uuid: dataStatus?.uuid!,
					status: dataStatus?.status! == CONFIG_STATUS.HOAT_DONG ? CONFIG_STATUS.BI_KHOA : CONFIG_STATUS.HOAT_DONG,
				}),
			});
		},
		onSuccess: (data) => {
			if (data) {
				setDataStatus(null);
				queryClient.invalidateQueries([QUERY_KEY.table_cong_ty, _page, _pageSize, _keyword, _status]);
			}
		},
	});

	return (
		<div className={styles.container}>
			<Loading loading={funcChangeStatus.isLoading} />
			<div className={styles.header}>
				<div className={styles.main_search}>
					<div className={styles.search}>
						<Search keyName='_keyword' />
					</div>
					<div className={styles.filter}>
						<FilterCustom
							isSearch
							name='Người quản lý'
							query='_userUuid'
							listFilter={listUser?.data?.map((v: any) => ({
								id: v?.uuid,
								name: v?.fullName,
							}))}
						/>
					</div>
					<div>
						<DateRangerCustom />
					</div>
					<div className={styles.filter}>
						<FilterCustom
							isSearch
							name='Trạng thái'
							query='_status'
							listFilter={[
								{
									id: CONFIG_STATUS.BI_KHOA,
									name: 'Bị khóa',
								},
								{
									id: CONFIG_STATUS.HOAT_DONG,
									name: 'Hoạt động',
								},
							]}
						/>
					</div>
				</div>

				<div className={styles.btn}>
					<Button
						href={PATH.ThemMoiCongTy}
						p_8_16
						rounded_2
						icon={<Image alt='icon add' src={icons.add} width={20} height={20} />}
					>
						Thêm công ty
					</Button>
				</div>
			</div>

			<div className={styles.table}>
				<DataWrapper
					data={listPartner?.data?.items || []}
					loading={listPartner?.isLoading}
					noti={
						<Noti
							titleButton='Thêm công ty'
							onClick={() => router.push(PATH.ThemMoiCongTy)}
							des='Hiện tại chưa có công ty nào, thêm ngay?'
						/>
					}
				>
					<Table
						data={listPartner?.data?.items || []}
						column={[
							{
								title: 'Mã CTY',
								render: (data: ICompany) => <>{data?.code  || '---'}</>,
							},
							{
								title: 'Tên công ty',
								render: (data: ICompany) => (
									<Link href={`/cong-ty/$${data?.uuid}`} className={styles.link}>
										{data?.name || '---'}
									</Link>
								),
							},
							{
								title: 'SL Khách hàng',
								render: (data: ICompany) => <>---</>,
							},
							{
								title: 'Số điện thoại',
								render: (data: ICompany) => <>{data?.phoneNumber  || '---'}</>,
							},
							{
								title: 'Email',
								render: (data: ICompany) => <>{data?.email  || '---'}</>,
							},

							{
								title: 'Ghi chú',
								render: (data: ICompany) => <>{data?.description || '---'}</>,
							},
							{
								title: 'Trạng thái',
								render: (data: ICompany) => <TagStatus status={data.status} />,
							},
							{
								title: 'Tác vụ',
								render: (data: ICompany) => (
									<div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
										<IconCustom
											edit
											icon={<LuPencil fontSize={20} fontWeight={600} />}
											tooltip='Chỉnh sửa'
											color='#777E90'
											href={`/cong-ty/chinh-sua?_id=${data?.uuid}`}
										/>

										<IconCustom
											lock
											icon={<HiOutlineLockClosed fontSize={20} fontWeight={600} />}
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
					<Pagination
						currentPage={Number(_page) || 1}
						total={listPartner?.data?.pagination?.totalCount}
						pageSize={Number(_pageSize) || 20}
						dependencies={[_pageSize, _keyword, _manager, _dateFrom, _dateTo, _status]}
					/>
				</DataWrapper>
			</div>
			<Dialog
				danger
				open={!!dataStatus}
				onClose={() => setDataStatus(null)}
				title={dataStatus?.status == CONFIG_STATUS.HOAT_DONG ? 'Khóa công ty' : 'Dùng công ty'}
				note={
					dataStatus?.status == CONFIG_STATUS.HOAT_DONG
						? 'Bạn có chắc chắn muốn khóa công ty này?'
						: 'Bạn có chắc chắn muốn dùng công ty này?'
				}
				onSubmit={funcChangeStatus.mutate}
			/>
		</div>
	);
}

export default MainPage;
