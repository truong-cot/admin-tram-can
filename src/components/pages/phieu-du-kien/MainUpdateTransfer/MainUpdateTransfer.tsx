import {useRouter} from 'next/router';
import {useState} from 'react';
import {IFormUpdateTransfer, PropsMainUpdateTransfer} from './interfaces';
import {
	CONFIG_DESCENDING,
	CONFIG_PAGING,
	CONFIG_STATUS,
	CONFIG_TYPE_FIND,
	QUERY_KEY,
	TYPE_BATCH,
	TYPE_SCALES,
	TYPE_SIFT,
	TYPE_TRANSPORT,
} from '~/constants/config/enum';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import wareServices from '~/services/wareServices';
import truckServices from '~/services/truckServices';
import batchBillServices from '~/services/batchBillServices';
import moment from 'moment';
import {convertCoin, price} from '~/common/funcs/convertCoin';
import {toastWarn} from '~/common/funcs/toast';
import styles from './MainUpdateTransfer.module.scss';
import Loading from '~/components/common/Loading';
import Form, {FormContext, Input} from '~/components/common/Form';
import Button from '~/components/common/Button';
import clsx from 'clsx';
import Select, {Option} from '~/components/common/Select';
import warehouseServices from '~/services/warehouseServices';
import storageServices from '~/services/storageServices';
import DatePicker from '~/components/common/DatePicker';
import ButtonSelectMany from '~/components/common/ButtonSelectMany';
import TextArea from '~/components/common/Form/components/TextArea';

function MainUpdateTransfer({}: PropsMainUpdateTransfer) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_id} = router.query;

	const [listTruckChecked, setListTruckChecked] = useState<any[]>([]);
	const [listTruckBatchBill, setListTruckBatchBill] = useState<any[]>([]);

	const [form, setForm] = useState<IFormUpdateTransfer>({
		batchUuid: '',
		billUuid: '',
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
		warehouseToUuid: '',
		warehouseFromUuid: '',
		productTypeUuid: '',
		pricetagUuid: '',
		documentId: '',
		description: '',
		customerUuid: '',
		storageFromUuid: '',
		storageUuid: '',
	});

	useQuery([QUERY_KEY.chi_tiet_phieu_du_kien, _id], {
		queryFn: () =>
			httpRequest({
				http: batchBillServices.detailBatchbill({
					uuid: _id as string,
				}),
			}),
		onSuccess(data) {
			if (data) {
				setForm({
					batchUuid: data?.batchInfo?.uuid,
					billUuid: data?.uuid,
					ship: data?.batchInfo?.ship,
					isShip: data?.batchInfo?.isShip,
					timeIntend: new Date(data?.batchInfo?.timeIntend),
					weightIntent: convertCoin(data?.batchInfo?.weightIntent),
					customerName: data?.customnerName || '',
					name: data?.batchInfo?.name,
					isBatch: data?.isBatch,
					isCreateBatch: 1,
					scalesStationUuid: data?.scalesStationUu?.uuid || '',
					isSift: data?.isSift,
					scalesType: data?.scalesType,
					specificationsUuid: data?.specificationsUu?.uuid,
					productTypeUuid: data?.productTypeUu?.uuid,
					pricetagUuid: data?.pricetagUu?.uuid || '',
					documentId: data?.documentId || '',
					description: data?.description || '',
					customerUuid: data?.customerUu?.uuid,

					warehouseToUuid: '',
					warehouseFromUuid: '',
					storageFromUuid: data?.storageFromUu?.uuid || '',
					storageUuid: data?.storageUu?.uuid || '',
				});
				setListTruckChecked(
					data?.lstTruck?.map((v: any) => ({
						uuid: v?.uuid,
						name: v?.licensePalate,
						code: v?.code,
					}))
				);
				setListTruckBatchBill(
					data?.lstTruck?.map((v: any) => ({
						uuid: v?.uuid,
						name: v?.licensePalate,
						code: v?.code,
					}))
				);
			}
		},
		enabled: !!_id,
	});

	// Lấy kho warehouse từ
	useQuery([QUERY_KEY.chi_tiet_kho_hang_con, form.storageFromUuid], {
		queryFn: () =>
			httpRequest({
				http: storageServices.detailStorage({
					uuid: form.storageFromUuid,
				}),
			}),
		onSuccess(data) {
			if (data) {
				setForm((prev) => ({
					...prev,
					warehouseFromUuid: data?.warehouseUu?.uuid,
				}));
			}
		},
		enabled: !!form.storageFromUuid,
	});

	// Lấy kho warehouse đến
	useQuery([QUERY_KEY.chi_tiet_kho_hang_con_den, form.storageUuid], {
		queryFn: () =>
			httpRequest({
				http: storageServices.detailStorage({
					uuid: form.storageUuid,
				}),
			}),
		onSuccess(data) {
			if (data) {
				setForm((prev) => ({
					...prev,
					warehouseToUuid: data?.warehouseUu?.uuid,
				}));
			}
		},
		enabled: !!form.storageUuid,
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

	const listStorageFrom = useQuery([QUERY_KEY.dropdown_kho_hang_con, form.warehouseFromUuid], {
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
					specificationsUuid: '',
					warehouseUuid: form.warehouseFromUuid,
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!form.warehouseFromUuid,
	});

	const listStorageTo = useQuery([QUERY_KEY.dropdown_kho_hang_con_dich, form.warehouseToUuid, form.specificationsUuid], {
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
					warehouseUuid: form.warehouseToUuid,
					specificationsUuid: form.specificationsUuid,
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!form.warehouseToUuid && !!form.specificationsUuid,
	});

	const fucnCreateBatchBill = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Chỉnh sửa phiếu hàng thành công!',
				http: batchBillServices.upsertBatchBill({
					batchUuid: form?.batchUuid,
					billUuid: form?.billUuid,
					ship: form?.ship,
					isShip: form?.isShip,
					timeIntend: moment(form?.timeIntend!).format('YYYY-MM-DD'),
					weightIntent: price(form?.weightIntent),
					name: form?.name,
					isBatch: form?.isBatch,
					isCreateBatch: 1,
					scalesStationUuid: form?.scalesStationUuid,
					isSift: form.isSift,
					scalesType: TYPE_SCALES.CAN_CHUYEN_KHO,
					specificationsUuid: form.specificationsUuid,
					productTypeUuid: form.productTypeUuid,
					pricetagUuid: form.pricetagUuid,
					documentId: form.documentId,
					description: form.description,
					customerName: '',
					customerUuid: '',
					storageFromUuid: form.storageFromUuid,
					storageUuid: form.storageUuid,
					lstTruckAddUuid: listTruckChecked
						.filter((v) => !listTruckBatchBill.some((x) => v.uuid === x.uuid))
						?.map((item) => item.uuid),
					lstTruckRemoveUuid: listTruckBatchBill
						.filter((v) => !listTruckChecked.some((x) => v.uuid === x.uuid))
						?.map((item) => item.uuid),
				}),
			}),
		onSuccess(data) {
			if (data) {
				queryClient.invalidateQueries([QUERY_KEY.chi_tiet_phieu_du_kien, _id]);
				queryClient.invalidateQueries([QUERY_KEY.chi_tiet_kho_hang_con]);
				queryClient.invalidateQueries([QUERY_KEY.chi_tiet_kho_hang_con_den]);
			}
		},
		onError(error) {
			console.log({error});
			return;
		},
	});

	const handleSubmit = async () => {
		if (!form.storageFromUuid) {
			return toastWarn({msg: 'Vui lòng chọn kho hàng chuyển!'});
		}
		if (!form.storageUuid) {
			return toastWarn({msg: 'Vui lòng chọn kho đích phụ!'});
		}
		if (!form.productTypeUuid) {
			return toastWarn({msg: 'Vui lòng chọn loại hàng!'});
		}
		if (!form.specificationsUuid) {
			return toastWarn({msg: 'Vui lòng chọn quy cách!'});
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
						<h4>Chỉnh sửa phiếu hàng chuyển kho dự kiến</h4>
						<p>Điền đầy đủ các thông tin phiếu hàng chuyển kho dự kiến</p>
					</div>
					<div className={styles.right}>
						<Button p_10_24 rounded_2 grey_outline onClick={() => router.back()}>
							Hủy bỏ
						</Button>
						<FormContext.Consumer>
							{({isDone}) => (
								<Button disable={!isDone} p_10_24 rounded_2 primary>
									Cập nhật
								</Button>
							)}
						</FormContext.Consumer>
					</div>
				</div>
				<div className={styles.form}>
					<div className={clsx('mb', 'col_3')}>
						{/* <div className={styles.item}>
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
						</div> */}
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
					<div className={clsx('mt')}>
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
					</div>
					<div className={clsx('mt', 'col_2')}>
						<Select
							isSearch
							name='warehouseFromUuid'
							placeholder='Chọn kho'
							value={form?.warehouseFromUuid}
							label={
								<span>
									Từ kho chính <span style={{color: 'red'}}>*</span>
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
											warehouseFromUuid: v?.uuid,
											storageFromUuid: '',
										}))
									}
								/>
							))}
						</Select>
						<div>
							<Select
								isSearch
								name='storageFromUuid'
								placeholder='Chọn kho'
								value={form?.storageFromUuid}
								readOnly={!form.warehouseFromUuid}
								label={
									<span>
										Từ kho phụ <span style={{color: 'red'}}>*</span>
									</span>
								}
							>
								{listStorageFrom?.data?.map((v: any) => (
									<Option
										key={v?.uuid}
										value={v?.uuid}
										title={v?.name}
										onClick={() =>
											setForm((prev: any) => ({
												...prev,
												storageFromUuid: v?.uuid,
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
							name='warehouseToUuid'
							placeholder='Chọn kho'
							value={form?.warehouseToUuid}
							label={
								<span>
									Chọn kho đích chính <span style={{color: 'red'}}>*</span>
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
											warehouseToUuid: v?.uuid,
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
								placeholder='Chọn kho'
								value={form?.storageUuid}
								readOnly={!form.warehouseToUuid || !form.specificationsUuid}
								label={
									<span>
										Chọn kho đích <span style={{color: 'red'}}>*</span>
									</span>
								}
							>
								{listStorageTo?.data
									?.filter((x: any) => x?.uuid != form?.storageFromUuid)
									?.map((v: any) => (
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

export default MainUpdateTransfer;
