import React, {useState} from 'react';

import styles from './MainUpdateService.module.scss';
import {IFormUpdateService, PropsMainUpdateService} from './interfaces';
import {toastWarn} from '~/common/funcs/toast';
import {
	CONFIG_DESCENDING,
	CONFIG_PAGING,
	CONFIG_STATUS,
	CONFIG_TYPE_FIND,
	QUERY_KEY,
	STATUS_CUSTOMER,
	TYPE_BATCH,
	TYPE_SCALES,
	TYPE_SIFT,
	TYPE_TRANSPORT,
} from '~/constants/config/enum';
import {convertCoin, price} from '~/common/funcs/convertCoin';
import moment from 'moment';
import batchBillServices from '~/services/batchBillServices';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import truckServices from '~/services/truckServices';
import wareServices from '~/services/wareServices';
import customerServices from '~/services/customerServices';
import {useRouter} from 'next/router';
import Loading from '~/components/common/Loading';
import Form, {FormContext, Input} from '~/components/common/Form';
import Button from '~/components/common/Button';
import clsx from 'clsx';
import Select, {Option} from '~/components/common/Select';
import DatePicker from '~/components/common/DatePicker';
import ButtonSelectMany from '~/components/common/ButtonSelectMany';
import TextArea from '~/components/common/Form/components/TextArea';
import SelectSearch from '~/components/common/SelectSearch';

function MainUpdateService({}: PropsMainUpdateService) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_id} = router.query;

	const [dataCustomer, setDataCustomer] = useState<any>({});
	const [listTruckChecked, setListTruckChecked] = useState<any[]>([]);
	const [listTruckBatchBill, setListTruckBatchBill] = useState<any[]>([]);

	const [form, setForm] = useState<IFormUpdateService>({
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
		warehouseUuid: '',
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
					warehouseUuid: data?.warehouseUu?.uuid,
					productTypeUuid: data?.productTypeUu?.uuid,
					pricetagUuid: data?.pricetagUu?.uuid || '',
					documentId: data?.documentId || '',
					description: data?.description || '',
					customerUuid: data?.customerUu?.uuid,
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
				setDataCustomer(
					data?.customnerName
						? {
								id: '',
								name: data?.customnerName,
						  }
						: {
								id: data?.customerUu?.uuid,
								name: data?.customerUu?.name,
						  }
				);
			}
		},
		enabled: !!_id,
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

	const fucnUpdateBatchBill = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Chỉnh sửa phiếu hàng thành công!',
				http: batchBillServices.upsertBatchBill({
					batchUuid: form?.batchUuid,
					billUuid: form.billUuid,
					ship: form?.ship,
					isShip: form?.isShip,
					timeIntend: moment(form?.timeIntend!).format('YYYY-MM-DD'),
					weightIntent: price(form?.weightIntent),
					name: form?.name,
					isBatch: form?.isBatch,
					isCreateBatch: 1,
					scalesStationUuid: form?.scalesStationUuid,
					isSift: form.isSift,
					scalesType: TYPE_SCALES.CAN_DICH_VU,
					specificationsUuid: form.specificationsUuid,
					productTypeUuid: form.productTypeUuid,
					pricetagUuid: form.pricetagUuid,
					documentId: form.documentId,
					description: form.description,
					customerName: !dataCustomer?.id ? dataCustomer?.name : '',
					customerUuid: dataCustomer?.id ? dataCustomer?.id : '',
					storageFromUuid: '',
					storageUuid: '',
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
			}
		},
		onError(error) {
			console.log({error});
			return;
		},
	});

	const handleSubmit = async () => {
		if (!dataCustomer?.id && !dataCustomer?.name) {
			return toastWarn({msg: 'Vui lòng chọn khách hàng!'});
		}
		if (!form.productTypeUuid) {
			return toastWarn({msg: 'Vui lòng chọn loại hàng!'});
		}
		if (!form.timeIntend) {
			return toastWarn({msg: 'Vui lòng chọn ngày dự kiến!'});
		}
		if (listTruckChecked.length == 0) {
			return toastWarn({msg: 'Vui lòng chọn xe hàng!'});
		}

		return fucnUpdateBatchBill.mutate();
	};

	return (
		<div className={styles.container}>
			<Loading loading={fucnUpdateBatchBill.isLoading} />
			<Form form={form} setForm={setForm} onSubmit={handleSubmit}>
				<div className={styles.header}>
					<div className={styles.left}>
						<h4>Chỉnh sửa phiếu hàng dịch vụ dự kiến</h4>
						<p>Điền đầy đủ các thông tin phiếu hàng dịch vụ dự kiến</p>
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
						<SelectSearch
							options={listCustomer?.data?.map((v: any) => ({
								id: v?.uuid,
								name: v?.name,
							}))}
							data={dataCustomer}
							setData={setDataCustomer}
							label={
								<span>
									Khách hàng <span style={{color: 'red'}}>*</span>
								</span>
							}
							placeholder='Nhập, chọn khách hàng'
						/>
						<div>
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
						</div>
					</div>
					<div className={clsx('mt')}>
						<Input
							name='weightIntent'
							value={form.weightIntent || ''}
							type='text'
							isMoney
							unit='KG'
							label={<span>Khối lượng dự kiến</span>}
							placeholder='Nhập khối lượng dự kiến'
						/>
					</div>
					<div className={clsx('mt', 'col_2')}>
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

export default MainUpdateService;
