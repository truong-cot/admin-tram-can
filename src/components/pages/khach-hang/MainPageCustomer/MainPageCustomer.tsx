import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useState} from 'react';
import {HiOutlineLockClosed} from 'react-icons/hi';
import {LuPencil} from 'react-icons/lu';
import Button from '~/components/common/Button';
import DataWrapper from '~/components/common/DataWrapper';
import Noti from '~/components/common/DataWrapper/components/Noti';
import Dialog from '~/components/common/Dialog';
import FilterCustom from '~/components/common/FilterCustom';
import IconCustom from '~/components/common/IconCustom';
import Search from '~/components/common/Search';
import Table from '~/components/common/Table';
import {PATH} from '~/constants/config';
import icons from '~/constants/images/icons';

import Loading from '~/components/common/Loading';
import Pagination from '~/components/common/Pagination';
import TagStatusCustomer from '~/components/common/TagStatusCustomer';
import {CONFIG_DESCENDING, CONFIG_PAGING, CONFIG_STATUS, CONFIG_TYPE_FIND, QUERY_KEY, STATUS_CUSTOMER} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import customerServices from '~/services/customerServices';
import partnerServices from '~/services/partnerServices';
import userServices from '~/services/userServices';
import styles from './MainPageCustomer.module.scss';
import {ICustomer, PropsMainPageCustomer} from './interfaces';

function MainPageCustomer({}: PropsMainPageCustomer) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_page, _pageSize, _keyword, _userUuid, _partnerUUid, _status} = router.query;

	const [dataStatus, setDataStatus] = useState<ICustomer | null>(null);

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

	// Lấy danh sách công ty ==> partner ==> status == 0
	const listPartner = useQuery([QUERY_KEY.dropdown_cong_ty], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: partnerServices.listPartner({
					page: 1,
					pageSize: 20,
					keyword: '',
					isPaging: CONFIG_PAGING.NO_PAGING,
					isDescending: CONFIG_DESCENDING.NO_DESCENDING,
					typeFind: CONFIG_TYPE_FIND.DROPDOWN,
					status: CONFIG_STATUS.HOAT_DONG,
					provinceId: '',
					userUuid: '',
				}),
			}),
		select(data) {
			return data;
		},
	});

	// Lấy danh sách khách hàng
	const listCustomer = useQuery([QUERY_KEY.table_khach_hang, _page, _pageSize, _keyword, _userUuid, _partnerUUid, _status], {
		queryFn: () =>
			httpRequest({
				isList: true,
				http: customerServices.listCustomer({
					page: Number(_page) || 1,
					pageSize: Number(_pageSize) || 20,
					keyword: (_keyword as string) || '',
					isPaging: CONFIG_PAGING.IS_PAGING,
					isDescending: CONFIG_DESCENDING.NO_DESCENDING,
					typeFind: CONFIG_TYPE_FIND.TABLE,
					partnerUUid: (_partnerUUid as string) || '',
					userUuid: (_userUuid as string) || '',
					status: !!_status ? Number(_status) : null,
					typeCus: null,
					provinceId: '',
					specUuid: '',
				}),
			}),
		select(data) {
			return data;
		},
	});

	// Đổi trạng thái team
	const fucnChangeStatus = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: dataStatus?.status == STATUS_CUSTOMER.HOP_TAC ? 'Dừng hợp tác thành công' : 'Hợp tác thành công',
				http: customerServices.changeStatus({
					uuid: dataStatus?.uuid!,
					status: dataStatus?.status! == STATUS_CUSTOMER.HOP_TAC ? STATUS_CUSTOMER.DUNG_HOP_TAC : STATUS_CUSTOMER.HOP_TAC,
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				setDataStatus(null);
				queryClient.invalidateQueries([QUERY_KEY.table_khach_hang, _page, _pageSize, _keyword, _userUuid, _partnerUUid, _status]);
			}
		},
	});

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
							name='Người quản lý'
							query='_userUuid'
							listFilter={listUser?.data?.map((v: any) => ({
								id: v?.uuid,
								name: v?.fullName,
							}))}
						/>
					</div>

					<div className={styles.filter}>
						<FilterCustom
							isSearch
							name='Tên công ty'
							query='_partnerUUid'
							listFilter={listPartner?.data?.map((v: any) => ({
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
									id: STATUS_CUSTOMER.HOP_TAC,
									name: 'Hợp tác',
								},
								{
									id: STATUS_CUSTOMER.DUNG_HOP_TAC,
									name: 'Dừng hợp tác',
								},
							]}
						/>
					</div>
				</div>

				<div>
					<Button
						href={PATH.ThemKhachHang}
						p_8_16
						icon={<Image alt='icon add' src={icons.add} width={20} height={20} />}
						rounded_2
					>
						Thêm khách hàng
					</Button>
				</div>
			</div>
			<div className={styles.table}>
				<DataWrapper
					data={listCustomer?.data?.items || []}
					loading={listCustomer?.isLoading}
					noti={
						<Noti
							titleButton='Thêm khách hàng'
							onClick={() => router.push(PATH.ThemKhachHang)}
							des='Hiện tại chưa có khách hàng nào, thêm ngay?'
						/>
					}
				>
					<Table
						data={listCustomer?.data?.items || []}
						column={[
							{
								title: 'MÃ KH',
								render: (data: ICustomer) => <>{data?.code}</>,
							},
							{
								title: 'Tên khách hàng',
								render: (data: ICustomer) => (
									<Link href={`/khach-hang/${data?.uuid}`} className={styles.link}>
										{data?.name}
									</Link>
								),
							},
							{
								title: 'Thuộc công ty',
								render: (data: ICustomer) => <>{data?.partnerUu?.name}</>,
							},
							{
								title: 'Số điện thoại',
								render: (data: ICustomer) => <>{data?.phoneNumber}</>,
							},
							{
								title: 'Email',
								render: (data: ICustomer) => <>{data?.email}</>,
							},
							{
								title: 'Nhân viên',
								render: (data: ICustomer) => <>{data?.userUu?.fullName || '---'}</>,
							},
							{
								title: 'Trạng thái',
								render: (data: ICustomer) => <TagStatusCustomer status={data.status} />,
							},
							{
								title: 'Tác vụ',
								render: (data: ICustomer) => (
									<div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
										<IconCustom
											edit
											icon={<LuPencil fontSize={20} fontWeight={600} />}
											tooltip='Chỉnh sửa'
											color='#777E90'
											href={`/khach-hang/chinh-sua?_id=${data?.uuid}`}
										/>
										<IconCustom
											lock
											icon={<HiOutlineLockClosed size='22' />}
											tooltip={data.status == STATUS_CUSTOMER.HOP_TAC ? 'Dừng hợp tác' : 'Hợp tác'}
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
					pageSize={Number(_pageSize) || 20}
					total={listCustomer?.data?.pagination?.totalCount}
					dependencies={[_pageSize, _keyword, _userUuid, _partnerUUid, _status]}
				/>
			</div>
			<Dialog
				danger
				open={!!dataStatus}
				onClose={() => setDataStatus(null)}
				title={dataStatus?.status == STATUS_CUSTOMER.HOP_TAC ? 'Dừng hợp tác' : 'Hợp tác'}
				note={
					dataStatus?.status == STATUS_CUSTOMER.HOP_TAC ? 'Bạn có chắc chắn muốn dừng hợp tác?' : 'Bạn có chắc chắn muốn hợp tác?'
				}
				onSubmit={fucnChangeStatus.mutate}
			/>
		</div>
	);
}

export default MainPageCustomer;
