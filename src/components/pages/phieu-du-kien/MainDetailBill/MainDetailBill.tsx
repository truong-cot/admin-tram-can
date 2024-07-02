import React, {Fragment, useState} from 'react';
import {IDetailBatchBill, PropsMainDetailBill} from './interfaces';
import styles from './MainDetailBill.module.scss';
import Link from 'next/link';
import {IoArrowBackOutline} from 'react-icons/io5';
import {PATH} from '~/constants/config';
import clsx from 'clsx';
import Table from '~/components/common/Table';
import Button from '~/components/common/Button';
import {convertCoin} from '~/common/funcs/convertCoin';
import {useRouter} from 'next/router';
import {useQuery} from '@tanstack/react-query';
import TippyHeadless from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react';
import {
	CONFIG_DESCENDING,
	CONFIG_PAGING,
	CONFIG_TYPE_FIND,
	OWNEW_TYPE_TRUCK,
	QUERY_KEY,
	STATUS_BILL,
	TYPE_BATCH,
	TYPE_SCALES,
	TYPE_SIFT,
} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import batchBillServices from '~/services/batchBillServices';
import Moment from 'react-moment';
import truckServices from '~/services/truckServices';
import DataWrapper from '~/components/common/DataWrapper';
import Noti from '~/components/common/DataWrapper/components/Noti';
import {ITruck} from '../../xe-hang/MainPageDelverTruck/interfaces';
import Pagination from '~/components/common/Pagination';
import {HiOutlineLockClosed} from 'react-icons/hi';
import {LuPencil} from 'react-icons/lu';
import Popup from '~/components/common/Popup';
import PopupDeleteBill from '../PopupDeleteBill';

const MainDetailBill = ({}: PropsMainDetailBill) => {
	const router = useRouter();

	const {_id, _page, _pageSize} = router.query;

	const [uuidTruck, setUuidTruck] = useState<string>('');
	const [openCancel, setOpenCancel] = useState<boolean>(false);

	const {data: detailBatchBill} = useQuery<IDetailBatchBill>([QUERY_KEY.chi_tiet_phieu_du_kien, _id], {
		queryFn: () =>
			httpRequest({
				http: batchBillServices.detailBatchbill({
					uuid: _id as string,
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!_id,
	});

	const listTruck = useQuery([QUERY_KEY.table_xe_hang, _page, _pageSize, _id], {
		queryFn: () =>
			httpRequest({
				isList: true,
				http: truckServices.listTruck({
					page: Number(_page) || 1,
					pageSize: Number(_pageSize) || 20,
					keyword: '',
					isPaging: CONFIG_PAGING.IS_PAGING,
					isDescending: CONFIG_DESCENDING.NO_DESCENDING,
					typeFind: CONFIG_TYPE_FIND.TABLE,
					status: null,
					billUuid: _id as string,
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!_id,
	});

	const getUrlUpdateBatchBill = (): string => {
		if (detailBatchBill?.scalesType == TYPE_SCALES.CAN_NHAP) {
			return `/phieu-du-kien/chinh-sua-phieu-nhap?_id=${detailBatchBill?.uuid}`;
		}
		if (detailBatchBill?.scalesType == TYPE_SCALES.CAN_XUAT) {
			return `/phieu-du-kien/chinh-sua-phieu-xuat?_id=${detailBatchBill?.uuid}`;
		}
		if (detailBatchBill?.scalesType == TYPE_SCALES.CAN_DICH_VU) {
			return `/phieu-du-kien/chinh-sua-phieu-dich-vu?_id=${detailBatchBill?.uuid}`;
		}
		if (detailBatchBill?.scalesType == TYPE_SCALES.CAN_CHUYEN_KHO) {
			return `/phieu-du-kien/chinh-sua-phieu-chuyen-kho?_id=${detailBatchBill?.uuid}`;
		}
		return '/phieu-du-kien/tat-ca';
	};

	return (
		<Fragment>
			<div className={styles.header}>
				<Link href={PATH.PhieuAllDuKien} className={styles.header_title}>
					<IoArrowBackOutline fontSize={20} fontWeight={600} />
					<p>Chi tiết phiếu dự kiến</p>
				</Link>

				<div className={styles.list_btn}>
					{detailBatchBill?.status == STATUS_BILL.CHUA_CAN && (
						<Button
							rounded_2
							w_fit
							light_outline
							p_8_16
							bold
							icon={<HiOutlineLockClosed color='#23262F' fontSize={16} fontWeight={600} />}
							onClick={() => setOpenCancel(true)}
						>
							Hủy phiếu
						</Button>
					)}

					{detailBatchBill?.status! < STATUS_BILL.DA_CAN_CHUA_KCS && detailBatchBill?.status != STATUS_BILL.DA_HUY ? (
						<Button
							rounded_2
							w_fit
							light_outline
							p_8_16
							bold
							icon={<LuPencil color='#23262F' fontSize={16} fontWeight={600} />}
							href={getUrlUpdateBatchBill()}
						>
							Chỉnh sửa
						</Button>
					) : null}
				</div>
			</div>
			<div className={clsx('mt')}>
				<div className={styles.header_table}>
					<div className={styles.content_table}>
						<div className={styles.item_table}>
							<p>Loại cân:</p>
							<span>
								{detailBatchBill?.scalesType == TYPE_SCALES.CAN_NHAP && 'Cân nhập'}
								{detailBatchBill?.scalesType == TYPE_SCALES.CAN_XUAT && 'Cân xuất'}
								{detailBatchBill?.scalesType == TYPE_SCALES.CAN_DICH_VU && 'Cân dịch vụ'}
								{detailBatchBill?.scalesType == TYPE_SCALES.CAN_CHUYEN_KHO && 'Cân chuyển kho'}
							</span>
						</div>
						<div className={styles.item_table}>
							<p>Tên lô hàng:</p>
							<span>{detailBatchBill?.batchInfo?.name}</span>
						</div>
						<div className={styles.item_table}>
							<p>Mã lô hàng:</p>
							<span>{detailBatchBill?.code}</span>
						</div>
						<div className={styles.item_table}>
							<p>Kiểu cân:</p>
							<span>
								{detailBatchBill?.isBatch == TYPE_BATCH.CAN_LE && 'Cân lẻ'}
								{detailBatchBill?.isBatch == TYPE_BATCH.CAN_LO && 'Cân lô'}
							</span>
						</div>
						<div className={styles.item_table}>
							<p>Khách hàng:</p>
							<span>{detailBatchBill?.customerUu?.name || detailBatchBill?.customnerName || '---'}</span>
						</div>
						<div className={styles.item_table}>
							<p>Loại hàng:</p>
							<span>{detailBatchBill?.productTypeUu?.name || '---'}</span>
						</div>
						<div className={styles.item_table}>
							<p>Chất lượng hàng:</p>
							<span>
								{detailBatchBill?.specificationsUu?.name}{' '}
								{detailBatchBill?.isSift ? (
									<span style={{color: '#777E90'}}>
										- {detailBatchBill?.isSift == TYPE_SIFT.DA_SANG && 'đã sàng'}
										{detailBatchBill?.isSift == TYPE_SIFT.KHONG_SANG && 'chưa sàng'}
									</span>
								) : null}
							</span>
						</div>

						{/* PHIẾU NHẬP VÀ PHIẾU XUẤT */}
						{detailBatchBill?.scalesType == TYPE_SCALES.CAN_NHAP || detailBatchBill?.scalesType == TYPE_SCALES.CAN_XUAT ? (
							<div className={styles.item_table}>
								<p>Kho hàng:</p>
								<span>
									{detailBatchBill.storageUu?.name}{' '}
									<span style={{color: '#777E90'}}>({detailBatchBill.storageUu?.warehouseUu?.name})</span>
								</span>
							</div>
						) : null}

						{/* PHIẾU CHUYỂN KHO */}
						{detailBatchBill?.scalesType == TYPE_SCALES.CAN_CHUYEN_KHO ? (
							<>
								<div className={styles.item_table}>
									<p>Kho hàng chính:</p>
									{detailBatchBill.storageFromUu?.name}{' '}
									<span style={{color: '#777E90'}}>({detailBatchBill.storageFromUu?.warehouseUu?.name})</span>
								</div>
								<div className={styles.item_table}>
									<p>Kho hàng đích:</p>
									{detailBatchBill.storageUu?.name}{' '}
									<span style={{color: '#777E90'}}>({detailBatchBill.storageUu?.warehouseUu?.name})</span>
								</div>
							</>
						) : null}

						<div className={styles.item_table}>
							<p>Khối lượng dự kiến:</p>
							<span>{convertCoin(detailBatchBill?.batchInfo?.weightIntent!)}</span>
						</div>
						<div className={styles.item_table}>
							<p>Ngày dự kiến :</p>
							<span>
								<Moment date={detailBatchBill?.batchInfo?.timeIntend} format='DD/MM/YYYY' />
							</span>
						</div>
						<div className={styles.item_table}>
							<p>Xe chở hàng:</p>
							<span style={{color: '#2D74FF'}}>{detailBatchBill?.lstTruck?.length} xe</span>
						</div>
					</div>
					<div className={styles.content_table_left}>
						<div className={styles.item_table}>
							<p>Trạng thái phiếu:</p>
							<span>
								{detailBatchBill?.status == STATUS_BILL.DA_HUY && 'Đã hủy'}
								{detailBatchBill?.status == STATUS_BILL.CHUA_CAN && 'Chưa cân'}
								{detailBatchBill?.status == STATUS_BILL.DANG_CAN && 'Đang cân'}
								{detailBatchBill?.status == STATUS_BILL.TAM_DUNG && 'Tạm dừng'}
								{detailBatchBill?.status == STATUS_BILL.DA_CAN_CHUA_KCS && 'Đã cân chưa KCS'}
								{detailBatchBill?.status == STATUS_BILL.DA_KCS && 'Đã KCS'}
								{detailBatchBill?.status == STATUS_BILL.CHOT_KE_TOAN && 'Chốt kế toán'}
							</span>
						</div>
						<div className={styles.item_table}>
							<p>Người tạo phiếu:</p>
							<span>{detailBatchBill?.accountUu?.username || '---'}</span>
						</div>
						<div className={styles.item_table}>
							<p>Thời gian tạo phiếu:</p>
							<span>
								<Moment date={detailBatchBill?.created} format='HH:mm, DD/MM/YYYY' />
							</span>
						</div>

						{/* PHIẾU HỦY */}
						{detailBatchBill?.status == STATUS_BILL.DA_HUY && (
							<>
								<div className={styles.item_table}>
									<p>Người hủy:</p>
									<span>{detailBatchBill?.accountUpdateUu?.username || '---'}</span>
								</div>
								<div className={styles.item_table}>
									<p>Thời gian hủy:</p>
									<span>
										<Moment date={detailBatchBill?.updatedTime} format='HH:mm, DD/MM/YYYY' />
									</span>
								</div>
								<div className={styles.item_table}>
									<p>Lý do hủy:</p>
									<span>{detailBatchBill?.description}</span>
								</div>
							</>
						)}

						{detailBatchBill?.status != STATUS_BILL.DA_HUY && (
							<>
								<div className={styles.item_table}>
									<p>Người cập nhật:</p>
									<span>{detailBatchBill?.accountUpdateUu?.username || '---'}</span>
								</div>
								<div className={styles.item_table}>
									<p>Thời gian cập nhật:</p>
									<span>
										{detailBatchBill?.updatedTime ? (
											<Moment date={detailBatchBill?.updatedTime} format='HH:mm, DD/MM/YYYY' />
										) : (
											'---'
										)}
									</span>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
			<div className={clsx('mt')}>
				<DataWrapper
					data={listTruck?.data?.items || []}
					loading={listTruck?.isLoading}
					noti={<Noti title='Xe hàng trống' des='Hiện tại chưa có xe hàng nào!' disableButton />}
				>
					<Table
						data={listTruck?.data?.items || []}
						column={[
							{
								title: 'STT',
								render: (data: ITruck, index: number) => <>{index + 1} </>,
							},
							{
								title: 'Mã xe',
								render: (data: ITruck) => <>{data?.code || '---'}</>,
							},
							{
								title: 'Loại xe',
								render: (data: ITruck) => <>{data?.trucktype || '---'}</>,
							},
							{
								title: 'Biển số',
								render: (data: ITruck) => <>{data?.licensePalate || '---'}</>,
							},
							{
								title: 'Phân loại xe',
								render: (data: ITruck) => (
									<>
										{data?.ownerType == OWNEW_TYPE_TRUCK.XE_CONG_TY && <span>Xe công ty</span>}
										{data?.ownerType == OWNEW_TYPE_TRUCK.XE_KHACH_HANG && <span>Xe khách hàng</span>}
									</>
								),
							},
							{
								title: 'Khối lượng nhỏ nhất',
								render: (data: ITruck) => <>{convertCoin(data?.minWeight) || '---'}</>,
							},
							{
								title: 'Khối lượng lớn nhất',
								render: (data: ITruck) => <>{convertCoin(data?.maxWeight) || '---'}</>,
							},
							{
								title: 'Người quản lý',
								render: (data: ITruck) => <>{data?.managerUu?.fullName || '---'} </>,
							},
							{
								title: 'RFID',
								render: (data: ITruck) => (
									<div className={styles.ruler}>
										<TippyHeadless
											maxWidth={'100%'}
											interactive
											onClickOutside={() => setUuidTruck('')}
											visible={uuidTruck == data?.uuid}
											placement='bottom'
											render={(attrs) => (
												<div className={styles.main_ruler}>
													<div className={styles.content}>
														{data?.rfid?.map((v, i) => (
															<div key={i} className={styles.item}>
																<div className={styles.dot}></div>
																<p>{v?.code}</p>
															</div>
														))}
													</div>
												</div>
											)}
										>
											<Tippy content='Xem RFID'>
												<p
													onClick={() => {
														if (data?.rfid?.length == 0) {
															return;
														} else {
															setUuidTruck(uuidTruck ? '' : data.uuid);
														}
													}}
													className={clsx(styles.value, {[styles.active]: uuidTruck == data.uuid})}
												>
													{data?.rfid.length || 0}
												</p>
											</Tippy>
										</TippyHeadless>
									</div>
								),
							},
						]}
					/>
				</DataWrapper>
				<Pagination
					currentPage={Number(_page) || 1}
					total={listTruck?.data?.pagination?.totalCount}
					pageSize={Number(_pageSize) || 20}
					dependencies={[_pageSize, _id]}
				/>
			</div>

			<Popup open={openCancel} onClose={() => setOpenCancel(false)}>
				<PopupDeleteBill uuid={detailBatchBill?.uuid!} onClose={() => setOpenCancel(false)} />
			</Popup>
		</Fragment>
	);
};

export default MainDetailBill;
