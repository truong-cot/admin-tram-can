import React from 'react';

import {PropsMainPageScalesExport} from './interfaces';
import styles from './MainPageScalesExport.module.scss';
import Search from '~/components/common/Search';
import FilterCustom from '~/components/common/FilterCustom';
import {
	CONFIG_DESCENDING,
	CONFIG_PAGING,
	CONFIG_STATUS,
	CONFIG_TYPE_FIND,
	QUERY_KEY,
	STATUS_BILL,
	TYPE_BATCH,
	TYPE_SCALES,
	TYPE_SIFT,
} from '~/constants/config/enum';
import {useQuery} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import customerServices from '~/services/customerServices';
import wareServices from '~/services/wareServices';
import DateRangerCustom from '~/components/common/DateRangerCustom';
import DataWrapper from '~/components/common/DataWrapper';
import Noti from '~/components/common/DataWrapper/components/Noti';
import Table from '~/components/common/Table';
import Pagination from '~/components/common/Pagination';
import {useRouter} from 'next/router';
import batchBillServices from '~/services/batchBillServices';
import Link from 'next/link';
import {getFromToBatchBill} from '~/common/funcs/optionConvert';
import {ITableBillScale} from '../MainPageScalesAll/interfaces';

function MainPageScalesExport({}: PropsMainPageScalesExport) {
	const router = useRouter();

	const {_page, _pageSize, _keyword, _isBatch, _customerUuid, _productTypeUuid, _status, _dateFrom, _dateTo} = router.query;

	const listCustomer = useQuery([QUERY_KEY.dropdown_khach_hang], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: customerServices.listCustomer({
					page: 1,
					pageSize: 20,
					keyword: '',
					isPaging: CONFIG_PAGING.NO_PAGING,
					isDescending: CONFIG_DESCENDING.NO_DESCENDING,
					typeFind: CONFIG_TYPE_FIND.DROPDOWN,
					partnerUUid: '',
					userUuid: '',
					status: null,
					typeCus: null,
					provinceId: '',
					specUuid: '',
				}),
			}),
		select(data) {
			return data;
		},
	});

	const listProductType = useQuery([QUERY_KEY.dropdown_loai_hang], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: wareServices.listProductType({
					page: 1,
					pageSize: 20,
					keyword: '',
					status: CONFIG_STATUS.HOAT_DONG,
					isPaging: CONFIG_PAGING.NO_PAGING,
					isDescending: CONFIG_DESCENDING.NO_DESCENDING,
					typeFind: CONFIG_TYPE_FIND.DROPDOWN,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const listBatch = useQuery(
		[QUERY_KEY.table_phieu_can, _page, _pageSize, _keyword, _isBatch, _customerUuid, _productTypeUuid, _status, _dateFrom, _dateTo],
		{
			queryFn: () =>
				httpRequest({
					isList: true,
					http: batchBillServices.getListBill({
						page: Number(_page) || 1,
						pageSize: Number(_pageSize) || 20,
						keyword: (_keyword as string) || '',
						isPaging: CONFIG_PAGING.IS_PAGING,
						isDescending: CONFIG_DESCENDING.NO_DESCENDING,
						typeFind: CONFIG_TYPE_FIND.TABLE,
						scalesType: TYPE_SCALES.CAN_NHAP,
						customerUuid: (_customerUuid as string) || '',
						isBatch: !!_isBatch ? Number(_isBatch) : null,
						isCreateBatch: null,
						productTypeUuid: (_productTypeUuid as string) || '',
						specificationsUuid: '',
						status: !!_status
							? [Number(_status)]
							: [
									STATUS_BILL.DANG_CAN,
									STATUS_BILL.TAM_DUNG,
									STATUS_BILL.DA_CAN_CHUA_KCS,
									STATUS_BILL.DA_KCS,
									STATUS_BILL.CHOT_KE_TOAN,
							  ],
						timeStart: _dateFrom ? (_dateFrom as string) : null,
						timeEnd: _dateTo ? (_dateTo as string) : null,
						warehouseUuid: '',
					}),
				}),
			select(data) {
				return data;
			},
		}
	);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.main_search}>
					<div className={styles.search}>
						<Search keyName='_keyword' placeholder='Tìm kiếm theo mã lô hàng' />
					</div>
					<div className={styles.filter}>
						<FilterCustom
							isSearch
							name='Kiểu cân'
							query='_isBatch'
							listFilter={[
								{
									id: TYPE_BATCH.CAN_LO,
									name: 'Cân lô',
								},
								{
									id: TYPE_BATCH.CAN_LE,
									name: 'Cân lẻ',
								},
							]}
						/>
					</div>
					<FilterCustom
						isSearch
						name='Khách hàng'
						query='_customerUuid'
						listFilter={listCustomer?.data?.map((v: any) => ({
							id: v?.uuid,
							name: v?.name,
						}))}
					/>
					<FilterCustom
						isSearch
						name='Loại hàng'
						query='_productTypeUuid'
						listFilter={listProductType?.data?.map((v: any) => ({
							id: v?.uuid,
							name: v?.name,
						}))}
					/>
					<FilterCustom
						isSearch
						name='Trạng thái'
						query='_status'
						listFilter={[
							{
								id: STATUS_BILL.DANG_CAN,
								name: 'Đang cân',
							},
							{
								id: STATUS_BILL.TAM_DUNG,
								name: 'Tạm dừng',
							},
							{
								id: STATUS_BILL.DA_CAN_CHUA_KCS,
								name: 'Đã cân chưa KCS',
							},
							{
								id: STATUS_BILL.DA_KCS,
								name: 'Đã KCS',
							},
							{
								id: STATUS_BILL.CHOT_KE_TOAN,
								name: 'Chốt kế toán',
							},
						]}
					/>
					<div className={styles.filter}>
						<DateRangerCustom titleTime='Thời gian' />
					</div>
				</div>
			</div>
			<div className={styles.table}>
				<DataWrapper
					data={listBatch?.data?.items || []}
					loading={listBatch?.isLoading}
					noti={<Noti des='Hiện tại chưa có phiếu cân nào, thêm ngay?' disableButton />}
				>
					<Table
						data={listBatch?.data?.items || []}
						column={[
							{
								title: 'STT',
								render: (data: ITableBillScale, index: number) => <>{index + 1}</>,
							},
							{
								title: 'Mã lô',
								render: (data: ITableBillScale) => <span style={{fontWeight: '600'}}>{data?.code}</span>,
							},
							{
								title: 'Loại cân',
								render: (data: ITableBillScale) => (
									<>
										{data?.scalesType == TYPE_SCALES.CAN_NHAP && 'Cân nhập'}
										{data?.scalesType == TYPE_SCALES.CAN_XUAT && 'Cân xuất'}
										{data?.scalesType == TYPE_SCALES.CAN_DICH_VU && 'Cân dịch vụ'}
										{data?.scalesType == TYPE_SCALES.CAN_CHUYEN_KHO && 'Cân chuyển kho'}
									</>
								),
							},
							{
								title: 'Kiểu cân',
								render: (data: ITableBillScale) => (
									<>
										{data?.isBatch == TYPE_BATCH.CAN_LO && 'Cân lô'}
										{data?.isBatch == TYPE_BATCH.CAN_LE && 'Cân lẻ'}
									</>
								),
							},
							{
								title: 'Mã tàu',
								render: (data: ITableBillScale) => <>{data?.batchInfo?.ship || '---'}</>,
							},
							{
								title: 'Từ',
								render: (data: ITableBillScale) => (
									<>
										{
											getFromToBatchBill({
												scalesType: data?.scalesType,
												customerUu: data?.customerUu,
												customnerName: data?.customnerName,
												storageFromUu: data?.storageFromUu,
												storageUu: data?.storageUu,
											}).from
										}
									</>
								),
							},
							{
								title: 'Loại hàng',
								render: (data: ITableBillScale) => <>{data?.productTypeUu?.name || '---'}</>,
							},
							{
								title: 'Phân loại',
								render: (data: ITableBillScale) => (
									<>
										{data?.isSift == TYPE_SIFT.DA_SANG && 'Đã sàng'}
										{data?.isSift == TYPE_SIFT.KHONG_SANG && 'Chưa sàng'}
									</>
								),
							},
							{
								title: 'Đến',
								render: (data: ITableBillScale) => (
									<>
										{
											getFromToBatchBill({
												scalesType: data?.scalesType,
												customerUu: data?.customerUu,
												customnerName: data?.customnerName,
												storageFromUu: data?.storageFromUu,
												storageUu: data?.storageUu,
											}).to
										}
									</>
								),
							},
							{
								title: 'KL hàng',
								render: (data: ITableBillScale) => <>{data?.weightTotal || 0}</>,
							},
							{
								title: 'Trạng thái',
								render: (data: ITableBillScale) => (
									<>
										{data?.status == STATUS_BILL.DANG_CAN && <span style={{color: '#9757D7'}}>Đang cân</span>}
										{data?.status == STATUS_BILL.TAM_DUNG && <span style={{color: '#353945'}}>Tạm dừng</span>}
										{data?.status == STATUS_BILL.DA_CAN_CHUA_KCS && (
											<span style={{color: '#D94212'}}>Đã cân chưa KCS</span>
										)}
										{data?.status == STATUS_BILL.DA_KCS && <span style={{color: '#3772FF'}}>Đã KCS</span>}
										{data?.status == STATUS_BILL.CHOT_KE_TOAN && <span style={{color: '#2CAE39'}}>Chốt kế toán</span>}
									</>
								),
							},
							{
								title: 'Tác vụ',
								render: (data: ITableBillScale) => (
									<Link href={`/phieu-can/${data.uuid}`} className={styles.linkdetail}>
										Xem chi tiết
									</Link>
								),
							},
						]}
					/>
				</DataWrapper>
				<Pagination
					currentPage={Number(_page) || 1}
					pageSize={Number(_pageSize) || 20}
					total={listBatch?.data?.pagination?.totalCount}
					dependencies={[_pageSize, _keyword, _isBatch, _customerUuid, _productTypeUuid, _status, _dateFrom, _dateTo]}
				/>
			</div>
		</div>
	);
}

export default MainPageScalesExport;
