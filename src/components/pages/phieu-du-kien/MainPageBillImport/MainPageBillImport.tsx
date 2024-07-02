import React, {useState} from 'react';
import Image from 'next/image';

import {PropsMainPageBillImport} from './interfaces';
import styles from './MainPageBillImport.module.scss';
import Search from '~/components/common/Search';
import FilterCustom from '~/components/common/FilterCustom';
import Button from '~/components/common/Button';
import icons from '~/constants/images/icons';
import {
	CONFIG_DESCENDING,
	CONFIG_PAGING,
	CONFIG_STATUS,
	CONFIG_TYPE_FIND,
	QUERY_KEY,
	STATUS_BILL,
	TYPE_BATCH,
	TYPE_SCALES,
} from '~/constants/config/enum';
import {useQuery, useQueryClient} from '@tanstack/react-query';
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
import Moment from 'react-moment';
import IconCustom from '~/components/common/IconCustom';
import {LuPencil} from 'react-icons/lu';
import {Trash} from 'iconsax-react';
import {ITableBatch} from '../MainPageBillAll/interfaces';
import {getFromToBatchBill} from '~/common/funcs/optionConvert';
import Link from 'next/link';
import Popup from '~/components/common/Popup';
import PopupDeleteBill from '../PopupDeleteBill';

function MainPageBillImport({}: PropsMainPageBillImport) {
	const router = useRouter();

	const {_page, _pageSize, _keyword, _isBatch, _customerUuid, _productTypeUuid, _status, _dateFrom, _dateTo} = router.query;

	const [billUuid, setBilldUuid] = useState<string | null>(null);

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
		[
			QUERY_KEY.table_phieu_hang_du_kien,
			_page,
			_pageSize,
			_keyword,
			_isBatch,
			_customerUuid,
			_productTypeUuid,
			_status,
			_dateFrom,
			_dateTo,
		],
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
						isCreateBatch: 1,
						productTypeUuid: (_productTypeUuid as string) || '',
						specificationsUuid: '',
						status: !!_status ? (_status as string)?.split(',')?.map((v: string) => Number(v)) : [],
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
								id: STATUS_BILL.DA_HUY,
								name: 'Đã hủy bỏ',
							},
							{
								id: STATUS_BILL.CHUA_CAN,
								name: 'Chưa xử lý',
							},
							{
								id: `${STATUS_BILL.DANG_CAN}, ${STATUS_BILL.TAM_DUNG}`,
								name: 'Đang xử lý',
							},
							{
								id: `${STATUS_BILL.DA_CAN_CHUA_KCS}, ${STATUS_BILL.DA_KCS}, ${STATUS_BILL.CHOT_KE_TOAN}`,
								name: 'Đã hoàn thành',
							},
						]}
					/>

					<div className={styles.filter}>
						<DateRangerCustom titleTime='Thời gian' />
					</div>
				</div>

				<div>
					<Button
						href={'/phieu-du-kien/them-phieu-nhap'}
						p_8_16
						icon={<Image alt='icon add' src={icons.add} width={20} height={20} />}
						rounded_2
					>
						Tạo phiếu
					</Button>
				</div>
			</div>
			<div className={styles.table}>
				<DataWrapper
					data={listBatch?.data?.items || []}
					loading={listBatch?.isLoading}
					noti={
						<Noti
							titleButton='Tạo phiếu'
							onClick={() => router.push('/phieu-du-kien/them-phieu-nhap')}
							des='Hiện tại chưa có phiếu hàng nào, thêm ngay?'
						/>
					}
				>
					<Table
						data={listBatch?.data?.items || []}
						column={[
							{
								title: 'STT',
								render: (data: ITableBatch, index: number) => <>{index + 1}</>,
							},
							{
								title: 'Mã lô hàng',
								render: (data: ITableBatch) => (
									<Link href={`/phieu-du-kien/${data.uuid}`} className={styles.link}>
										{data?.code}
									</Link>
								),
							},
							{
								title: 'Loại cân',
								render: (data: ITableBatch) => (
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
								render: (data: ITableBatch) => (
									<>
										{data?.isBatch == TYPE_BATCH.CAN_LO && 'Cân lô'}
										{data?.isBatch == TYPE_BATCH.CAN_LE && 'Cân lẻ'}
									</>
								),
							},
							{
								title: 'Mã tàu',
								render: (data: ITableBatch) => <>{data?.batchInfo?.ship || '---'}</>,
							},
							{
								title: 'Từ',
								render: (data: ITableBatch) => (
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
								render: (data: ITableBatch) => <>{data?.productTypeUu?.name || '---'}</>,
							},
							{
								title: 'Quy cách',
								render: (data: ITableBatch) => <>{data?.specificationsUu?.name || '---'}</>,
							},
							{
								title: 'Đến',
								render: (data: ITableBatch) => (
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
								title: 'KL dự kiến',
								render: (data: ITableBatch) => <>{data?.batchInfo?.weightIntent || '---'}</>,
							},
							{
								title: 'Ngày dự kiến',
								render: (data: ITableBatch) => (
									<>
										{data?.batchInfo?.timeIntend ? (
											<Moment date={data?.batchInfo?.timeIntend} format='DD/MM/YYYY' />
										) : (
											'---'
										)}
									</>
								),
							},
							{
								title: 'Trạng thái',
								render: (data: ITableBatch) => (
									<>
										{data?.status == STATUS_BILL.DA_HUY && <span style={{color: '#D94212'}}>Đã hủy bỏ</span>}
										{data?.status == STATUS_BILL.CHUA_CAN && <span style={{color: '#3772FF'}}>Chưa xử lý</span>}
										{(data?.status == STATUS_BILL.DANG_CAN || data?.status == STATUS_BILL.TAM_DUNG) && (
											<span style={{color: '#9757D7'}}>Đang xử lý</span>
										)}
										{data?.status >= STATUS_BILL.DA_CAN_CHUA_KCS && (
											<span style={{color: '#2CAE39'}}>Đã hoàn thành</span>
										)}
									</>
								),
							},
							{
								title: 'Tác vụ',
								render: (data: ITableBatch) => (
									<div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
										{data?.status < STATUS_BILL.DA_CAN_CHUA_KCS && data?.status != STATUS_BILL.DA_HUY ? (
											<IconCustom
												edit
												icon={<LuPencil fontSize={20} fontWeight={600} />}
												tooltip='Chỉnh sửa'
												color='#777E90'
												href={`/phieu-du-kien/chinh-sua-phieu-nhap?_id=${data.uuid}`}
											/>
										) : null}
										{data?.status == STATUS_BILL.CHUA_CAN && (
											<IconCustom
												lock
												icon={<Trash size='22' />}
												tooltip={'Hủy phiếu'}
												color='#777E90'
												onClick={() => setBilldUuid(data.uuid)}
											/>
										)}
									</div>
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

			{/* POPUP */}
			<Popup open={!!billUuid} onClose={() => setBilldUuid(null)}>
				<PopupDeleteBill uuid={billUuid} onClose={() => setBilldUuid(null)} />
			</Popup>
		</div>
	);
}

export default MainPageBillImport;
