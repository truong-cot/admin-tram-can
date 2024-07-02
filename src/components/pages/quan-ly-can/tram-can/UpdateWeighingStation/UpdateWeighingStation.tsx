import React, {useState} from 'react';
import {IFormUpdate, PropsUpdateWeighingStation} from './interfaces';
import styles from './UpdateWeighingStation.module.scss';
import Form, {FormContext, Input} from '~/components/common/Form';
import Button from '~/components/common/Button';
import TextArea from '~/components/common/Form/components/TextArea';
import clsx from 'clsx';
import {useMutation, useQuery} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import {CONFIG_DESCENDING, CONFIG_PAGING, CONFIG_STATUS, CONFIG_TYPE_FIND, QUERY_KEY} from '~/constants/config/enum';
import {PATH} from '~/constants/config';
import Select, {Option} from '~/components/common/Select';
import {useRouter} from 'next/router';
import companyServices from '~/services/companyServices';
import commonServices from '~/services/commonServices';
import {toastWarn} from '~/common/funcs/toast';
import Loading from '~/components/common/Loading';
import scalesStationServices from '~/services/scalesStationServices';

function UpdateWeighingStation({}: PropsUpdateWeighingStation) {
	const router = useRouter();

	const {_id} = router.query;

	const [form, setForm] = useState<IFormUpdate>({
		name: '',
		address: '',
		description: '',
		phoneNumber: '',
		companyUuid: '',
		provinceId: '',
		dictrictId: '',
		townId: '',
	});

	useQuery([QUERY_KEY.chi_tiet_tram_can, _id], {
		queryFn: () =>
			httpRequest({
				http: scalesStationServices.getDetail({
					uuid: _id as string,
				}),
			}),
		onSuccess(data) {
			if (data) {
				setForm({
					...data,
					companyUuid: data?.companyUu?.uuid,
					provinceId: data?.detailAddress?.province?.uuid,
					dictrictId: data?.detailAddress?.district?.uuid,
					townId: data?.detailAddress?.town?.uuid,
				});
			}
		},
		enabled: !!_id,
	});

	const listCompany = useQuery([QUERY_KEY.dropdown_cong_ty], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: companyServices.listCompany({
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

	const listTown = useQuery([QUERY_KEY.dropdown_xa_phuong, form.dictrictId], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: commonServices.listTown({
					keyword: '',
					status: CONFIG_STATUS.HOAT_DONG,
					idParent: form.dictrictId,
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!form?.dictrictId,
	});

	const fucnUpdateScalesstation = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Chỉnh sửa trạm cân thành công!',
				http: scalesStationServices.upsertScalesstation({
					uuid: _id as string,
					...form,
				}),
			}),
		onSuccess(data) {
			if (data) {
				router.replace(PATH.TramCan, undefined, {
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
		if (!form.companyUuid) {
			return toastWarn({msg: 'Vui lòng chọn công ty!'});
		}
		if (!form.provinceId) {
			return toastWarn({msg: 'Vui lòng chọn tỉnh/thành phố!'});
		}
		if (!form.dictrictId) {
			return toastWarn({msg: 'Vui lòng chọn quận/huyện!'});
		}
		if (!form.townId) {
			return toastWarn({msg: 'Vui lòng chọn xã/phường!'});
		}

		return fucnUpdateScalesstation.mutate();
	};

	return (
		<div className={styles.container}>
			<Loading loading={fucnUpdateScalesstation.isLoading} />
			<Form form={form} setForm={setForm} onSubmit={handleSubmit}>
				<div className={styles.header}>
					<div className={styles.left}>
						<h4>Chỉnh sửa trạm cân</h4>
						<p>Điền đầy đủ các thông tin trạm cân</p>
					</div>
					<div className={styles.right}>
						<Button href={PATH.TramCan} p_10_24 rounded_2 grey_outline>
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
									Tên trạm cân <span style={{color: 'red'}}>*</span>
								</span>
							}
							placeholder='Nhập tên trạm cân'
						/>
					</div>

					<div className={clsx('mt', 'col_2')}>
						<div>
							<Select
								isSearch
								name='companyUuid'
								value={form.companyUuid}
								placeholder='Chọn công ty'
								onChange={(e) =>
									setForm((prev: any) => ({
										...prev,
										companyUuid: e.target.value,
									}))
								}
								label={
									<span>
										Thuộc công ty <span style={{color: 'red'}}>*</span>
									</span>
								}
							>
								{listCompany?.data?.map((v: any) => (
									<Option key={v?.uuid} value={v?.uuid} title={v?.name} />
								))}
							</Select>
						</div>

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
											dictrictId: '',
											townId: '',
										}))
									}
								/>
							))}
						</Select>
						<div>
							<Select
								isSearch
								name='dictrictId'
								value={form.dictrictId}
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
												dictrictId: v?.maqh,
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
					<div className={clsx('mt')}>
						<TextArea placeholder='Nhập ghi chú' name='description' label={<span>Mô tả</span>} blur />
					</div>
				</div>
			</Form>
		</div>
	);
}

export default UpdateWeighingStation;
