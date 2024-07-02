import {useState} from 'react';

import {useMutation, useQuery} from '@tanstack/react-query';
import clsx from 'clsx';
import {useRouter} from 'next/router';
import {toastWarn} from '~/common/funcs/toast';
import Button from '~/components/common/Button';
import Form, {FormContext, Input} from '~/components/common/Form';
import TextArea from '~/components/common/Form/components/TextArea';
import Loading from '~/components/common/Loading';
import Select, {Option} from '~/components/common/Select';
import {PATH} from '~/constants/config';
import {
	CONFIG_DESCENDING,
	CONFIG_PAGING,
	CONFIG_STATUS,
	CONFIG_TYPE_FIND,
	QUERY_KEY,
	REGENCY_NAME,
	TYPE_CUSTOMER,
	TYPE_SIFT,
	TYPE_TRANSPORT,
} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import commonServices from '~/services/commonServices';
import customerServices from '~/services/customerServices';
import partnerServices from '~/services/partnerServices';
import userServices from '~/services/userServices';
import ItemProductType from '../ItemProductType';
import styles from './MainCreateCustomer.module.scss';
import {IFormCreateCustomer, PropsMainCreateCustomer} from './interfaces';
import regencyServices from '~/services/regencyServices';

function MainCreateCustomer({}: PropsMainCreateCustomer) {
	const router = useRouter();

	const [form, setForm] = useState<IFormCreateCustomer>({
		name: '',
		userUuid: '',
		director: '',
		partnerUuid: '',
		taxCode: '',
		email: '',
		phoneNumber: '',
		provinceId: '',
		districtId: '',
		townId: '',
		address: '',
		description: '',
		typeCus: null,
		transportType: null,
		isSift: null,
	});

	const [productTypes, setProductTypes] = useState<
		{
			productTypeUuid: string;
			specUuid: string;
			status: 0 | 1;
			state: 0 | 1;
		}[]
	>([
		{
			specUuid: '',
			productTypeUuid: '',
			status: 0,
			state: 1,
		},
	]);

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

	const listUser = useQuery([QUERY_KEY.dropdown_nhan_vien_thi_truong, form.provinceId], {
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
					provinceIDOwer: form.provinceId,
					regencyUuid: listRegency?.data?.find((v: any) => v?.id == REGENCY_NAME['Nhân viên thị trường'])
						? listRegency?.data?.find((v: any) => v?.id == REGENCY_NAME['Nhân viên thị trường'])?.uuid
						: null,
					regencyUuidExclude: '',
				}),
			}),
		select(data) {
			return data;
		},
	});

	const listProvince = useQuery([QUERY_KEY.dropdown_tinh_thanh_pho], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: commonServices.listProvince({
					keyword: '',
					status: CONFIG_STATUS.HOAT_DONG,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const listDistrict = useQuery([QUERY_KEY.dropdown_quan_huyen, form?.provinceId], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: commonServices.listDistrict({
					keyword: '',
					status: CONFIG_STATUS.HOAT_DONG,
					idParent: form?.provinceId,
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!form?.provinceId,
	});

	const listTown = useQuery([QUERY_KEY.dropdown_xa_phuong, form.districtId], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: commonServices.listTown({
					keyword: '',
					status: CONFIG_STATUS.HOAT_DONG,
					idParent: form.districtId,
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!form?.districtId,
	});

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

	const handleAddRow = () => {
		setProductTypes((prev) => [
			...prev,
			{
				specUuid: '',
				productTypeUuid: '',
				status: 0,
				state: 1,
			},
		]);
	};

	const handleDeleteRow = (index: number) => {
		if (productTypes.length > 1) {
			const updateData = [...productTypes];
			updateData.splice(index, 1);
			setProductTypes([...updateData]);
		} else {
			setProductTypes([
				{
					specUuid: '',
					productTypeUuid: '',
					status: 0,
					state: 1,
				},
			]);
		}
	};

	const handleChangeValue = (index: number, name: string, value: any) => {
		const newData = [...productTypes];

		newData[index] = {
			...newData[index],
			[name]: value,
		};

		setProductTypes(newData);
	};

	const fucnCreateCustomer = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageFailed: true,
				showMessageSuccess: false,
				http: customerServices.upsertCustomer({
					uuid: '',
					director: form.director,
					partnerUuid: form.partnerUuid,
					name: form.name,
					email: form.email,
					phoneNumber: form.phoneNumber,
					taxCode: form.taxCode,
					userUuid: form.userUuid,
					provinceId: form.provinceId,
					districtId: form.districtId,
					townId: form.townId,
					address: form.address,
					description: form.description,
					isSift: form.isSift!,
					transportType: form.transportType!,
					typeCus: form.typeCus!,
				}),
			}),
		onSuccess(data) {
			if (data) {
				fucnAddSpecification.mutate(data?.uuid);
			}
		},
		onError(error) {
			console.log({error});
			return;
		},
	});

	const fucnAddSpecification = useMutation({
		mutationFn: (uuidCustomer: string) =>
			httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Thêm mới khách hàng thành công!',
				http: customerServices.addSpecificationToCustomer({
					customerUuid: [uuidCustomer],
					infoSpec: productTypes?.map((v) => ({
						...v,
						priceTagUuid: null,
					})),
				}),
			}),
		onSuccess(data) {
			if (data) {
				router.replace(PATH.KhachHang, undefined, {
					scroll: false,
					shallow: false,
				});
			}
		},
		onError(error) {
			console.log({error});
			return;
		},
	});

	const handleSubmit = async () => {
		if (form.typeCus == null) {
			return toastWarn({msg: 'Vui lòng chọn loại khách hàng!'});
		}
		if (!form.transportType == null) {
			return toastWarn({msg: 'Vui lòng chọn hình thức vận chuyển!'});
		}
		if (!form.isSift == null) {
			return toastWarn({msg: 'Vui lòng chọn phân loại hàng!'});
		}
		if (!form.partnerUuid) {
			return toastWarn({msg: 'Vui lòng chọn công ty!'});
		}
		if (!form.userUuid) {
			return toastWarn({msg: 'Vui lòng chọn nhân viên thị trường!'});
		}
		if (!form.provinceId) {
			return toastWarn({msg: 'Vui lòng chọn tỉnh/thành phố!'});
		}
		if (!form.districtId) {
			return toastWarn({msg: 'Vui lòng chọn quận/huyện!'});
		}
		if (!form.townId) {
			return toastWarn({msg: 'Vui lòng chọn xã/phường!'});
		}
		// if (productTypes.some((v) => !v.productTypeUuid)) {
		// 	return toastWarn({msg: 'Vui lòng loại hàng hóa!'});
		// }
		// if (productTypes.some((v) => !v.specUuid)) {
		// 	return toastWarn({msg: 'Vui lòng chất lượng!'});
		// }

		return fucnCreateCustomer.mutate();
	};

	return (
		<div className={styles.container}>
			<Loading loading={fucnAddSpecification.isLoading || fucnCreateCustomer.isLoading} />
			<Form form={form} setForm={setForm} onSubmit={handleSubmit}>
				<div className={styles.header}>
					<div className={styles.left}>
						<h4>Khách hàng</h4>
						<p>Điền đầy đủ các thông tin khách hàng</p>
					</div>
					<div className={styles.right}>
						<Button href={PATH.KhachHang} p_10_24 rounded_2 grey_outline>
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
								Khách hàng <span style={{color: 'red'}}>*</span>
							</label>
							<div className={styles.group_radio}>
								<div className={styles.item_radio}>
									<input
										type='radio'
										id='khach_hang_nhap'
										name='typeCus'
										checked={form.typeCus == TYPE_CUSTOMER.KH_NHAP}
										onChange={() =>
											setForm((prev) => ({
												...prev,
												typeCus: TYPE_CUSTOMER.KH_NHAP,
											}))
										}
									/>
									<label htmlFor='khach_hang_nhap'>Khách hàng nhập</label>
								</div>
								<div className={styles.item_radio}>
									<input
										type='radio'
										id='khach_hang_xuat'
										name='typeCus'
										checked={form.typeCus == TYPE_CUSTOMER.KH_XUAT}
										onChange={() =>
											setForm((prev) => ({
												...prev,
												typeCus: TYPE_CUSTOMER.KH_XUAT,
											}))
										}
									/>
									<label htmlFor='khach_hang_xuat'>Khách hàng xuất</label>
								</div>
							</div>
						</div>
						<div className={styles.item}>
							<label className={styles.label}>
								Vận chuyển <span style={{color: 'red'}}>*</span>
							</label>
							<div className={styles.group_radio}>
								<div className={styles.item_radio}>
									<input
										type='radio'
										id='van_chuyen_bo'
										name='transportType'
										checked={form.transportType == TYPE_TRANSPORT.DUONG_BO}
										onChange={() =>
											setForm((prev) => ({
												...prev,
												transportType: TYPE_TRANSPORT.DUONG_BO,
											}))
										}
									/>
									<label htmlFor='van_chuyen_bo'>Đường bộ</label>
								</div>
								<div className={styles.item_radio}>
									<input
										type='radio'
										id='van_chuyen_thủy'
										name='transportType'
										checked={form.transportType == TYPE_TRANSPORT.DUONG_THUY}
										onChange={() =>
											setForm((prev) => ({
												...prev,
												transportType: TYPE_TRANSPORT.DUONG_THUY,
											}))
										}
									/>
									<label htmlFor='van_chuyen_thủy'>Đường thủy</label>
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
								Tên khách hàng <span style={{color: 'red'}}>*</span>
							</span>
						}
						placeholder='Nhập tên khách hàng'
					/>
					<div className={clsx('mt', 'col_2')}>
						<Select
							isSearch
							name='partnerUuid'
							placeholder='Chọn công ty'
							value={form?.partnerUuid}
							onChange={(e: any) =>
								setForm((prev: any) => ({
									...prev,
									partnerUuid: e.target.value,
								}))
							}
							label={
								<span>
									Thuộc công ty<span style={{color: 'red'}}>*</span>
								</span>
							}
						>
							{listPartner?.data?.map((v: any) => (
								<Option key={v?.uuid} value={v?.uuid} title={v?.name} />
							))}
						</Select>
						<Input
							name='director'
							value={form.director || ''}
							type='text'
							label={<span>Người liên hệ</span>}
							placeholder='Nhập tên người liên hệ'
						/>
					</div>

					<div className={clsx('mt', 'col_2')}>
						<Input
							name='email'
							value={form.email || ''}
							isRequired
							isEmail
							min={5}
							max={50}
							type='text'
							blur={true}
							label={
								<span>
									Email <span style={{color: 'red'}}>*</span>
								</span>
							}
							placeholder='Nhập email'
						/>
						<div>
							<Input
								name='phoneNumber'
								value={form.phoneNumber || ''}
								isRequired
								isPhone
								type='number'
								blur={true}
								label={
									<span>
										Số điện thoại<span style={{color: 'red'}}>*</span>
									</span>
								}
								placeholder='Nhập số điện thoại'
							/>
						</div>
					</div>

					<div className={clsx('mt', 'col_3')}>
						<Select
							isSearch
							name='provinceId'
							value={form.provinceId}
							placeholder='Chọn tỉnh/thành phố'
							label={
								<span>
									Tỉnh/Thành phố<span style={{color: 'red'}}>*</span>
								</span>
							}
						>
							{listProvince?.data?.map((v: any) => (
								<Option
									key={v?.matp}
									value={v?.matp}
									title={v?.name}
									onClick={() =>
										setForm((prev: any) => ({
											...prev,
											provinceId: v?.matp,
											districtId: '',
											townId: '',
										}))
									}
								/>
							))}
						</Select>
						<div>
							<Select
								isSearch
								name='districtId'
								value={form.districtId}
								placeholder='Chọn quận/huyện'
								label={
									<span>
										Quận/Huyện<span style={{color: 'red'}}>*</span>
									</span>
								}
							>
								{listDistrict?.data?.map((v: any) => (
									<Option
										key={v?.maqh}
										value={v?.maqh}
										title={v?.name}
										onClick={() =>
											setForm((prev: any) => ({
												...prev,
												districtId: v?.maqh,
												townId: '',
											}))
										}
									/>
								))}
							</Select>
						</div>
						<Select
							isSearch
							name='townId'
							value={form.townId}
							placeholder='Chọn xã/phường'
							label={
								<span>
									Xã/phường<span style={{color: 'red'}}>*</span>
								</span>
							}
						>
							{listTown?.data?.map((v: any) => (
								<Option
									key={v?.xaid}
									value={v?.xaid}
									title={v?.name}
									onClick={() =>
										setForm((prev: any) => ({
											...prev,
											townId: v?.xaid,
										}))
									}
								/>
							))}
						</Select>
					</div>
					<div className={clsx('mt')}>
						<Input
							name='address'
							value={form.address || ''}
							type='text'
							label={<span>Địa chỉ chi tiết</span>}
							placeholder='Nhập địa chỉ chi tiết'
						/>
					</div>
					<div className={clsx('mt', 'col_2')}>
						<Select
							isSearch
							name='userUuid'
							placeholder='Chọn nhân viên'
							value={form?.userUuid}
							onChange={(e: any) =>
								setForm((prev: any) => ({
									...prev,
									userUuid: e.target.value,
								}))
							}
							label={
								<span>
									Thuộc nhân viên thị trường<span style={{color: 'red'}}>*</span>
								</span>
							}
						>
							{listUser?.data?.map((v: any) => (
								<Option key={v?.uuid} value={v?.uuid} title={v?.fullName} />
							))}
						</Select>
						<Input
							name='taxCode'
							value={form.taxCode || ''}
							isRequired
							min={5}
							max={50}
							type='text'
							blur={true}
							label={
								<span>
									Mã số thuế<span style={{color: 'red'}}>*</span>
								</span>
							}
							placeholder='Nhập mã số thuế'
						/>
					</div>
					<div className={clsx('mt')}>
						<TextArea name='description' placeholder='Nhập ghi chú' label={<span>Ghi chú</span>} />
					</div>

					<div className={clsx('mt')}>
						<div className={styles.header_quantily}>
							<p>
								Loại hàng <span style={{color: 'red'}}>*</span>
							</p>
							<p>
								Quy cách <span style={{color: 'red'}}>*</span>
							</p>
							<p>Trạng thái cung cấp</p>
						</div>
						{productTypes?.map((v, idx) => (
							<ItemProductType
								key={idx}
								data={v}
								idx={idx}
								showBtnDelete={idx != 0 || productTypes.length > 0}
								handleDeleteRow={handleDeleteRow}
								handleChangeValue={handleChangeValue}
							/>
						))}
					</div>

					<div className={clsx('mt')}>
						<p className={styles.btn_add} onClick={handleAddRow}>
							+ Thêm chất lượng
						</p>
					</div>
				</div>
			</Form>
		</div>
	);
}

export default MainCreateCustomer;
