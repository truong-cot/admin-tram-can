import React, {useState} from 'react';

import {IFormCreateImport, PropsMainCreateImport} from './interfaces';
import styles from './MainCreateImport.module.scss';
import Form, {FormContext, Input} from '~/components/common/Form';
import Button from '~/components/common/Button';
import clsx from 'clsx';
import {
	CONFIG_DESCENDING,
	CONFIG_PAGING,
	CONFIG_STATUS,
	CONFIG_TYPE_FIND,
	QUERY_KEY,
	STATUS_CUSTOMER,
	TYPE_BATCH,
	TYPE_CUSTOMER,
	TYPE_SCALES,
	TYPE_SIFT,
	TYPE_TRANSPORT,
} from '~/constants/config/enum';
import Select, {Option} from '~/components/common/Select';
import {useMutation, useQuery} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import customerServices from '~/services/customerServices';
import wareServices from '~/services/wareServices';
import warehouseServices from '~/services/warehouseServices';
import storageServices from '~/services/storageServices';
import DatePicker from '~/components/common/DatePicker';
import TextArea from '~/components/common/Form/components/TextArea';
import truckServices from '~/services/truckServices';
import ButtonSelectMany from '~/components/common/ButtonSelectMany';
import {useRouter} from 'next/router';
import batchBillServices from '~/services/batchBillServices';
import moment from 'moment';
import {price} from '~/common/funcs/convertCoin';
import Loading from '~/components/common/Loading';
import {toastWarn} from '~/common/funcs/toast';

function MainCreateImport({}: PropsMainCreateImport) {
	const router = useRouter();

	const [listTruckChecked, setListTruckChecked] = useState<any[]>([]);

	const [form, setForm] = useState<IFormCreateImport>({
		ship: '',
		isShip: TYPE_TRANSPORT.DUONG_THUY,
		timeIntend: '',
		weightIntent: 0,
		customerName: '',
		name: '',
		isBatch: TYPE_BATCH.CAN_LO,
		isCreateBatch: null,
		scalesStationUuid: '',
		isSift: TYPE_SIFT.DA_SANG,
		scalesType: null,
		specificationsUuid: '',
		warehouseUuid: '',
		productTypeUuid: '',
		pricetagUuid: '',
		documentId: '',
		description: '',
		customerUuid: '',
		storageFromUuid: '',
		storageUuid: '',
	});

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
					typeFind: CONFIG_TYPE_FIND.FILTER,
					partnerUUid: '',
					userUuid: '',
					status: STATUS_CUSTOMER.HOP_TAC,
					typeCus: TYPE_CUSTOMER.KH_NHAP,
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

	const listSpecification = useQuery([QUERY_KEY.dropdown_quy_cach], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: wareServices.listSpecification({
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

	const listWarehouse = useQuery([QUERY_KEY.dropdown_kho_hang_chinh], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: warehouseServices.listWarehouse({
					page: 1,
					pageSize: 20,
					keyword: '',
					status: CONFIG_STATUS.HOAT_DONG,
					isPaging: CONFIG_PAGING.NO_PAGING,
					isDescending: CONFIG_DESCENDING.NO_DESCENDING,
					typeFind: CONFIG_TYPE_FIND.DROPDOWN,
					customerUuid: '',
					timeEnd: null,
					timeStart: null,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const listStorage = useQuery([QUERY_KEY.dropdown_kho_hang_con, form.warehouseUuid, form.specificationsUuid], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: storageServices.listStorage({
					page: 1,
					pageSize: 20,
					keyword: '',
					status: CONFIG_STATUS.HOAT_DONG,
					isPaging: CONFIG_PAGING.NO_PAGING,
					isDescending: CONFIG_DESCENDING.NO_DESCENDING,
					typeFind: CONFIG_TYPE_FIND.DROPDOWN,
					productUuid: '',
					qualityUuid: '',
					specificationsUuid: form.specificationsUuid,
					warehouseUuid: form.warehouseUuid,
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!form.warehouseUuid && !!form.specificationsUuid,
	});

	const listTruck = useQuery([QUERY_KEY.dropdown_xe_hang], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: truckServices.listTruck({
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

	const fucnCreateBatchBill = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Thêm mới phiếu hàng thành công!',
				http: batchBillServices.upsertBatchBill({
					batchUuid: '',
					billUuid: '',
					ship: form?.ship,
					isShip: form?.isShip,
					timeIntend: moment(form?.timeIntend!).format('YYYY-MM-DD'),
					weightIntent: price(form?.weightIntent),
					customerName: '',
					name: form?.name,
					isBatch: form?.isBatch,
					isCreateBatch: 1,
					scalesStationUuid: form?.scalesStationUuid,
					isSift: form.isSift,
					scalesType: TYPE_SCALES.CAN_NHAP,
					specificationsUuid: form.specificationsUuid,
					productTypeUuid: form.productTypeUuid,
					pricetagUuid: form.pricetagUuid,
					documentId: form.documentId,
					description: form.description,
					lstTruckAddUuid: listTruckChecked?.map((v) => v.uuid),
					lstTruckRemoveUuid: [],
					customerUuid: form?.customerUuid,
					storageFromUuid: '',
					storageUuid: form?.storageUuid,
				}),
			}),
		onSuccess(data) {
			if (data) {
				router.back();
			}
		},
		onError(error) {
			console.log({error});
			return;
		},
	});

	const handleSubmit = async () => {
		if (!form.customerUuid) {
			return toastWarn({msg: 'Vui lòng chọn khách hàng!'});
		}
		if (!form.productTypeUuid) {
			return toastWarn({msg: 'Vui lòng chọn loại hàng!'});
		}
		if (!form.specificationsUuid) {
			return toastWarn({msg: 'Vui lòng chọn quy cách!'});
		}
		if (!form.warehouseUuid) {
			return toastWarn({msg: 'Vui lòng chọn kho chính!'});
		}
		if (!form.storageUuid) {
			return toastWarn({msg: 'Vui lòng chọn kho con!'});
		}
		if (!form.timeIntend) {
			return toastWarn({msg: 'Vui lòng chọn ngày dự kiến!'});
		}
		if (listTruckChecked.length == 0) {
			return toastWarn({msg: 'Vui lòng chọn xe hàng!'});
		}

		return fucnCreateBatchBill.mutate();
	};

	return (
		<div className={styles.container}>
			<Loading loading={fucnCreateBatchBill.isLoading} />
			<Form form={form} setForm={setForm} onSubmit={handleSubmit}>
				<div className={styles.header}>
					<div className={styles.left}>
						<h4>Thêm phiếu hàng nhập dự kiến</h4>
						<p>Điền đầy đủ các thông tin phiếu hàng nhập dự kiến</p>
					</div>
					<div className={styles.right}>
						<Button p_10_24 rounded_2 grey_outline onClick={() => router.back()}>
							Hủy bỏ
						</Button>
						<FormContext.Consumer>
							{({isDone}) => (
								<Button disable={!isDone} p_10_24 rounded_2 primary>
									Lưu lại
								</Button>
							)}
						</FormContext.Consumer>
					</div>
				</div>
				<div className={styles.form}>
					<div className={clsx('mb', 'col_3')}>
						<div className={styles.item}>
							<label className={styles.label}>
								Hình thức vận chuyển <span style={{color: 'red'}}>*</span>
							</label>
							<div className={styles.group_radio}>
								<div className={styles.item_radio}>
									<input
										type='radio'
										id='van_chuyen_bo'
										name='isShip'
										checked={form.isShip == TYPE_TRANSPORT.DUONG_BO}
										onChange={() =>
											setForm((prev) => ({
												...prev,
												isShip: TYPE_TRANSPORT.DUONG_BO,
												ship: '',
											}))
										}
									/>
									<label htmlFor='van_chuyen_bo'>Đường bộ</label>
								</div>
								<div className={styles.item_radio}>
									<input
										type='radio'
										id='van_chuyen_thủy'
										name='isShip'
										checked={form.isShip == TYPE_TRANSPORT.DUONG_THUY}
										onChange={() =>
											setForm((prev) => ({
												...prev,
												isShip: TYPE_TRANSPORT.DUONG_THUY,
											}))
										}
									/>
									<label htmlFor='van_chuyen_thủy'>Đường thủy</label>
								</div>
							</div>
						</div>

						<div className={styles.item}>
							<label className={styles.label}>
								Kiểu cân <span style={{color: 'red'}}>*</span>
							</label>
							<div className={styles.group_radio}>
								<div className={styles.item_radio}>
									<input
										type='radio'
										id='kieu-can-lo'
										name='isBatch'
										checked={form.isBatch == TYPE_BATCH.CAN_LO}
										onChange={() =>
											setForm((prev) => ({
												...prev,
												isBatch: TYPE_BATCH.CAN_LO,
											}))
										}
									/>
									<label htmlFor='kieu-can-lo'>Cân lô</label>
								</div>
								<div className={styles.item_radio}>
									<input
										type='radio'
										id='kieu-can-le'
										name='isBatch'
										checked={form.isBatch == TYPE_BATCH.CAN_LE}
										onChange={() =>
											setForm((prev) => ({
												...prev,
												isBatch: TYPE_BATCH.CAN_LE,
											}))
										}
									/>
									<label htmlFor='kieu-can-le'>Cân lẻ</label>
								</div>
							</div>
						</div>
						<div className={styles.item}>
							<label className={styles.label}>
								Phân loại <span style={{color: 'red'}}>*</span>
							</label>
							<div className={styles.group_radio}>
								<div className={styles.item_radio}>
									<input
										type='radio'
										id='phan_loai_da_sang'
										name='isSift'
										checked={form.isSift == TYPE_SIFT.DA_SANG}
										onChange={() =>
											setForm((prev) => ({
												...prev,
												isSift: TYPE_SIFT.DA_SANG,
											}))
										}
									/>
									<label htmlFor='phan_loai_da_sang'>Đã sàng</label>
								</div>
								<div className={styles.item_radio}>
									<input
										type='radio'
										id='phan_loai_chua_sang'
										name='isSift'
										checked={form.isSift == TYPE_SIFT.KHONG_SANG}
										onChange={() =>
											setForm((prev) => ({
												...prev,
												isSift: TYPE_SIFT.KHONG_SANG,
											}))
										}
									/>
									<label htmlFor='phan_loai_chua_sang'>Chưa sàng</label>
								</div>
							</div>
						</div>
					</div>
					<div className={clsx('mt', 'col_2')}>
						<Input
							name='name'
							value={form.name || ''}
							isRequired
							min={5}
							max={50}
							type='text'
							blur={true}
							label={
								<span>
									Tên lô hàng <span style={{color: 'red'}}>*</span>
								</span>
							}
							placeholder='Nhập tên lô hàng'
						/>
						<div>
							<Input
								name='ship'
								value={form.ship || ''}
								min={5}
								max={50}
								type='text'
								blur={true}
								isRequired={form.isShip == TYPE_TRANSPORT.DUONG_THUY}
								readOnly={form.isShip == TYPE_TRANSPORT.DUONG_BO}
								label={<span>Mã tàu</span>}
								placeholder='Nhập mã tàu'
							/>
						</div>
					</div>
					<div className={clsx('mt')}>
						<Select
							isSearch
							name='customerUuid'
							placeholder='Chọn khách hàng'
							value={form?.customerUuid}
							label={
								<span>
									Khách hàng<span style={{color: 'red'}}>*</span>
								</span>
							}
						>
							{listCustomer?.data?.map((v: any) => (
								<Option
									key={v?.uuid}
									value={v?.uuid}
									title={v?.name}
									onClick={() =>
										setForm((prev: any) => ({
											...prev,
											customerUuid: v?.uuid,
											isSift: v?.isSift,
										}))
									}
								/>
							))}
						</Select>
					</div>
					<div className={clsx('mt', 'col_2')}>
						<Select
							isSearch
							name='productTypeUuid'
							placeholder='Chọn loại hàng'
							value={form?.productTypeUuid}
							label={
								<span>
									Loại hàng<span style={{color: 'red'}}>*</span>
								</span>
							}
						>
							{listProductType?.data?.map((v: any) => (
								<Option
									key={v?.uuid}
									value={v?.uuid}
									title={v?.name}
									onClick={() =>
										setForm((prev: any) => ({
											...prev,
											productTypeUuid: v?.uuid,
										}))
									}
								/>
							))}
						</Select>
						<div>
							<Select
								isSearch
								name='specificationsUuid'
								placeholder='Chọn quy cách'
								value={form?.specificationsUuid}
								label={
									<span>
										Quy cách <span style={{color: 'red'}}>*</span>
									</span>
								}
							>
								{listSpecification?.data?.map((v: any) => (
									<Option
										key={v?.uuid}
										value={v?.uuid}
										title={v?.name}
										onClick={() =>
											setForm((prev: any) => ({
												...prev,
												specificationsUuid: v?.uuid,
												storageUuid: '',
											}))
										}
									/>
								))}
							</Select>
						</div>
					</div>
					<div className={clsx('mt', 'col_2')}>
						<Select
							isSearch
							name='warehouseUuid'
							placeholder='Chọn kho hàng chính'
							value={form?.warehouseUuid}
							label={
								<span>
									Kho hàng chính <span style={{color: 'red'}}>*</span>
								</span>
							}
						>
							{listWarehouse?.data?.map((v: any) => (
								<Option
									key={v?.uuid}
									value={v?.uuid}
									title={v?.name}
									onClick={() =>
										setForm((prev: any) => ({
											...prev,
											warehouseUuid: v?.uuid,
											storageUuid: '',
										}))
									}
								/>
							))}
						</Select>
						<div>
							<Select
								isSearch
								name='storageUuid'
								placeholder='Chọn kho hàng con'
								value={form?.storageUuid}
								readOnly={!form.specificationsUuid || !form.warehouseUuid}
								label={
									<span>
										Kho hàng con <span style={{color: 'red'}}>*</span>
									</span>
								}
							>
								{listStorage?.data?.map((v: any) => (
									<Option
										key={v?.uuid}
										value={v?.uuid}
										title={v?.name}
										onClick={() =>
											setForm((prev: any) => ({
												...prev,
												storageUuid: v?.uuid,
											}))
										}
									/>
								))}
							</Select>
						</div>
					</div>
					<div className={clsx('mt', 'col_2')}>
						<Input
							name='weightIntent'
							value={form.weightIntent || ''}
							type='text'
							isMoney
							unit='KG'
							label={<span>Khối lượng dự kiến</span>}
							placeholder='Nhập khối lượng dự kiến'
						/>
						<DatePicker
							label={
								<span>
									Ngày dự kiến <span style={{color: 'red'}}>*</span>
								</span>
							}
							value={form.timeIntend}
							onSetValue={(date) =>
								setForm((prev: any) => ({
									...prev,
									timeIntend: date,
								}))
							}
							placeholder='Chọn ngày dự kiến'
						/>
					</div>
					<div className={clsx('mt')}>
						<Input
							name='documentId'
							value={form.documentId || ''}
							type='text'
							label={<span>Chứng từ</span>}
							placeholder='Nhập chứng từ'
						/>
					</div>
					<div className={clsx('mt')}>
						<ButtonSelectMany
							label={
								<span>
									Xe hàng <span style={{color: 'red'}}>*</span>
								</span>
							}
							placeholder='Tìm và thêm xe hàng'
							title='Thêm xe hàng'
							description='Thêm và lựa chọn xe hàng'
							dataList={
								listTruck?.data?.map((v: any) => ({
									uuid: v?.uuid,
									name: v?.licensePalate,
									code: v?.code,
								})) || []
							}
							dataChecked={listTruckChecked}
							setDataChecked={setListTruckChecked}
						/>
					</div>
					<div className={clsx('mt')}>
						<TextArea name='description' placeholder='Nhập ghi chú' label={<span>Ghi chú</span>} />
					</div>
				</div>
			</Form>
		</div>
	);
}

export default MainCreateImport;
