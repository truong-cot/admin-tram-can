import {useMutation, useQuery} from '@tanstack/react-query';
import clsx from 'clsx';
import {useRouter} from 'next/router';
import {useState} from 'react';
import {toastWarn} from '~/common/funcs/toast';
import Button from '~/components/common/Button';
import Form, {FormContext, Input} from '~/components/common/Form';
import TextArea from '~/components/common/Form/components/TextArea';
import Loading from '~/components/common/Loading';
import Select, {Option} from '~/components/common/Select';
import {PATH} from '~/constants/config';
import {CONFIG_DESCENDING, CONFIG_PAGING, CONFIG_STATUS, CONFIG_TYPE_FIND, QUERY_KEY} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import commonServices from '~/services/commonServices';
import scalesStationServices from '~/services/scalesStationServices';
import warehouseServices from '~/services/warehouseServices';
import styles from './MainUpdateWarehouse.module.scss';
import {IFormUpdateWarehouse, PropsMainUpdateWarehouse} from './interfaces';

function MainUpdateWarehouse({}: PropsMainUpdateWarehouse) {
	const router = useRouter();

	const {_id} = router.query;

	const [form, setForm] = useState<IFormUpdateWarehouse>({
		uuid: '',
		name: '',
		address: '',
		scaleStationUuid: '',
		provinceId: '',
		dictrictId: '',
		townId: '',
		description: '',
	});

	useQuery([QUERY_KEY.chi_tiet_kho_hang_chinh, _id], {
		queryFn: () =>
			httpRequest({
				http: warehouseServices.detailWarehouse({
					uuid: _id as string,
				}),
			}),
		onSuccess(data) {
			if (data) {
				setForm({
					...data,
					scaleStationUuid: data?.scaleStationUu?.uuid || null,
					provinceId: data?.detailAddress?.province?.uuid,
					dictrictId: data?.detailAddress?.district?.uuid,
					townId: data?.detailAddress?.town?.uuid,
				});
			}
		},
		enabled: !!_id,
	});

	const listScaleStation = useQuery([QUERY_KEY.dropdown_tram_can], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: scalesStationServices.listScalesStation({
					page: 1,
					pageSize: 20,
					keyword: '',
					companyUuid: '',
					status: CONFIG_STATUS.HOAT_DONG,
					isDescending: CONFIG_DESCENDING.NO_DESCENDING,
					isPaging: CONFIG_PAGING.NO_PAGING,
					typeFind: CONFIG_TYPE_FIND.DROPDOWN,
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

	const fucnUpdateWarehouse = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Chỉnh sửa kho hàng thành công!',
				http: warehouseServices.upsertWarehouse({
					uuid: form.uuid,
					name: form.name,
					provinceId: form.provinceId,
					dictrictId: form.dictrictId,
					townId: form.townId,
					address: form.address,
					description: form.description,
					scaleStationUuid: form.scaleStationUuid,
				}),
			}),
		onSuccess(data) {
			if (data) {
				router.replace(PATH.QuanLyKhoHang, undefined, {
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
		if (!form.provinceId) {
			return toastWarn({msg: 'Vui lòng chọn tỉnh/thành phố!'});
		}
		if (!form.dictrictId) {
			return toastWarn({msg: 'Vui lòng chọn quận/huyện!'});
		}
		if (!form.townId) {
			return toastWarn({msg: 'Vui lòng chọn xã/phường!'});
		}

		return fucnUpdateWarehouse.mutate();
	};

	return (
		<div className={styles.container}>
			<Loading loading={fucnUpdateWarehouse.isLoading} />
			<Form form={form} setForm={setForm} onSubmit={handleSubmit}>
				<div className={styles.header}>
					<div className={styles.left}>
						<h4>Kho hàng chính</h4>
						<p>Điền đầy đủ các thông tin kho hàng chính</p>
					</div>
					<div className={styles.right}>
						<Button href={PATH.QuanLyKhoHang} p_10_24 rounded_2 grey_outline>
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
								Tên kho hàng <span style={{color: 'red'}}>*</span>
							</span>
						}
						placeholder='Nhập tên kho hàng'
					/>
					<div className='mt'>
						<Select
							isSearch
							name='scaleStationUuid'
							value={form.scaleStationUuid}
							placeholder='Chọn trạm cân'
							label={<span>Trạm cân</span>}
						>
							{listScaleStation?.data?.map((v: any) => (
								<Option
									key={v?.uuid}
									value={v?.uuid}
									title={v?.name}
									onClick={() =>
										setForm((prev: any) => ({
											...prev,
											scaleStationUuid: v?.uuid,
										}))
									}
								/>
							))}
						</Select>
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
						<TextArea name='description' placeholder='Nhập ghi chú' label={<span>Ghi chú</span>} />
					</div>
				</div>
			</Form>
		</div>
	);
}

export default MainUpdateWarehouse;
