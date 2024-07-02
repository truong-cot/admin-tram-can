import React, {useState} from 'react';
import Select, {Option} from '~/components/common/Select';
import {IFormCreateCompany, PropsCreateCompany} from './interfaces';
import styles from './CreateCompany.module.scss';
import {PATH} from '~/constants/config';
import Button from '~/components/common/Button';
import Form, {FormContext, Input} from '~/components/common/Form';
import clsx from 'clsx';
import TextArea from '~/components/common/Form/components/TextArea';
import ButtonSelectMany from '~/components/common/ButtonSelectMany';
import {useMutation, useQuery} from '@tanstack/react-query';
import {CONFIG_DESCENDING, CONFIG_PAGING, CONFIG_STATUS, CONFIG_TYPE_FIND, QUERY_KEY, REGENCY_NAME} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import customerServices from '~/services/customerServices';
import commonServices from '~/services/commonServices';
import partnerServices from '~/services/partnerServices';
import {useRouter} from 'next/router';
import Loading from '~/components/common/Loading';
import userServices from '~/services/userServices';
import regencyServices from '~/services/regencyServices';

function CreateCompany({}: PropsCreateCompany) {
	const router = useRouter();

	const [form, setForm] = useState<IFormCreateCompany>({
		description: '',
		name: '',
		taxCode: '',
		contact: '',
		email: '',
		address: '',
		phoneNumber: '',
		provinceId: '',
		districtId: '',
		townId: '',
		userOwenerUuid: '',
		director: '',
	});
	const [listCustomerChecked, setListCustomerChecked] = useState<any[]>([]);

	const listProvince = useQuery([QUERY_KEY.dropdown_tinh_thanh_pho, form?.provinceId], {
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

	const listDistrict = useQuery([QUERY_KEY.dropdown_quan_huyen, form.districtId], {
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

	const listTown = useQuery([QUERY_KEY.dropdown_xa_phuong, form?.townId], {
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
	const listUser = useQuery([QUERY_KEY.dropdown_nguoi_quan_ly_xe], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: userServices.listUser({
					page: 1,
					pageSize: 20,
					keyword: '',
					regencyUuid: listRegency?.data?.find((v: any) => v?.id == REGENCY_NAME['Quản lý nhập hàng'])
						? listRegency?.data?.find((v: any) => v?.id == REGENCY_NAME['Quản lý nhập hàng'])?.uuid
						: null,
					isPaging: CONFIG_PAGING.NO_PAGING,
					isDescending: CONFIG_DESCENDING.NO_DESCENDING,
					typeFind: CONFIG_TYPE_FIND.DROPDOWN,
					status: CONFIG_STATUS.HOAT_DONG,
					provinceIDOwer: '',
					regencyUuidExclude: '',
				}),
			}),
		select(data) {
			return data;
		},
		enabled: listRegency.isSuccess,
	});

	const fucnCreatePartner = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Thêm mới đối tác thành công!',
				http: partnerServices.upsertPartner({
					uuid: '',

					name: form?.name,
					taxCode: form?.taxCode,
					phoneNumber: form?.phoneNumber,
					email: form?.email,
					director: form?.director,
					provinceId: form?.provinceId,
					districtId: form?.districtId,

					townId: form?.townId,
					address: form?.address,
					description: form?.description,
					userOwenerUuid: form?.userOwenerUuid,
					customersUuid: listCustomerChecked?.map((v: any) => v?.uuid) || [],
				}),
			}),
		onSuccess(data) {
			if (data) {
				setForm({
					description: '',
					name: '',
					taxCode: '',
					contact: '',
					email: '',
					address: '',
					phoneNumber: '',
					provinceId: '',
					districtId: '',
					townId: '',
					userOwenerUuid: '',
					director: '',
				});
				setListCustomerChecked([]);
				router.replace(PATH.CongTy, undefined, {
					scroll: false,
					locale: false,
				});
			}
		},
		onError(error) {
			console.log({error});
			return;
		},
	});

	const handleSubmit = async () => {
		return fucnCreatePartner.mutate();
	};

	return (
		<div className={styles.container}>
			<Loading loading={fucnCreatePartner.isLoading} />
			<Form form={form} setForm={setForm} onSubmit={handleSubmit}>
				<div className={styles.header}>
					<div className={styles.left}>
						<h4>Thêm công ty</h4>
						<p>Điền đầy đủ các thông tin công ty</p>
					</div>
					<div className={styles.right}>
						<Button href={PATH.CongTy} p_10_24 rounded_2 grey_outline>
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
					<div className={clsx('mt', 'col-2')}>
						<div>
							<Input
								name='name'
								value={form.name || ''}
								label={
									<span>
										Tên công ty <span style={{color: 'red'}}>*</span>
									</span>
								}
								placeholder='Nhập tên công ty'
							/>
						</div>
						<Input
							name='director'
							value={form.director || ''}
							label={
								<span>
									Người đại diện <span style={{color: 'red'}}>*</span>
								</span>
							}
							placeholder='Nhập tên người đại diện'
						/>
					</div>

					<div className={clsx('mt', 'col_2')}>
						<div>
							<Input
								name='taxCode'
								value={form.taxCode || ''}
								label={<span>Mã số thuế</span>}
								placeholder='Nhập mã số thuế'
							/>
						</div>
						<Input
							name='contact'
							value={form.contact || ''}
							label={<span>Người liên hệ</span>}
							placeholder='Nhập người liên hệ'
						/>
					</div>

					<div className={clsx('mt', 'col_2')}>
						<div>
							<Input name='email' value={form.email || ''} label={<span>Email</span>} placeholder='Nhập email' />
						</div>
						<Input
							name='phoneNumber'
							value={form.phoneNumber || ''}
							label={
								<span>
									Số điện thoại<span style={{color: 'red'}}>*</span>
								</span>
							}
							placeholder='Nhập số điện thoại'
						/>
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
							label={<span>Địa chỉ chi tiết</span>}
							placeholder='Nhập địa chỉ chi tiết'
						/>
					</div>
					{/* {form.userOwenerUuid && ( */}
					<div className={clsx('mt')}>
						<Select
							isSearch
							name='userOwenerUuid'
							placeholder='Chọn người quản lý'
							value={form?.userOwenerUuid}
							onChange={(e: any) =>
								setForm((prev: any) => ({
									...prev,
									userOwenerUuid: e.target.value,
								}))
							}
							label={<span>Người quản lý</span>}
						>
							{listUser?.data?.map((v: any) => (
								<Option key={v?.uuid} value={v?.uuid} title={v?.fullName} />
							))}
						</Select>
					</div>
					{/* )} */}

					<div className={clsx('mt')}>
						<TextArea placeholder='Nhập ghi chú' name='description' label={<span>Ghi chú</span>} blur />
					</div>
					<div className={clsx('mt')}>
						<ButtonSelectMany
							label='Khách hàng thuộc công ty'
							placeholder='Tìm và thêm khách hàng'
							title='Thêm khách hàng'
							description='Thêm và lựa chọn khách hàng'
							dataList={listCustomer.data || []}
							dataChecked={listCustomerChecked}
							setDataChecked={setListCustomerChecked}
						/>
					</div>
				</div>
			</Form>
		</div>
	);
}

export default CreateCompany;
