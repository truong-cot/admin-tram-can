import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { PropsUpdatePriceTag } from './interfaces'; // Import your interfaces
import styles from './UpdatePriceTag.module.scss';
import Button from '~/components/common/Button';
import { PATH } from '~/constants/config';
import Form, { Input } from '~/components/common/Form';
import clsx from 'clsx';
import Select, { Option } from '~/components/common/Select';
import ButtonSelectMany from '~/components/common/ButtonSelectMany';
import { CONFIG_DESCENDING, CONFIG_PAGING, CONFIG_STATUS, CONFIG_TYPE_FIND, QUERY_KEY } from '~/constants/config/enum';
import { httpRequest } from '~/services';
import { useMutation, useQuery } from '@tanstack/react-query';
import customerServices from '~/services/customerServices';
import SelectSearch from '~/components/common/SelectSearch';
import priceTagServices from '~/services/priceTagServices';
import wareServices from '~/services/wareServices';
import { toastWarn } from '~/common/funcs/toast';

function UpdatePriceTag({ }: PropsUpdatePriceTag) {
	const router = useRouter();
	const { _uuid, _specId, _productId } = router.query;

	const [listCustomerChecked, setListCustomerChecked] = useState<any[]>([]);
	const [priceTag, setPriceTag] = useState<any>({});

	const [form, setForm] = useState<any>({
		specUuid: _specId,
		productTypeUuid: _productId,
	});

	useQuery([QUERY_KEY.table_gia_tien_hang, _uuid], {
		queryFn: () =>
			httpRequest({
				isList: true,
				http: priceTagServices.listPriceTag({
					page: 1,
					pageSize: 20,
					keyword: '',
					isPaging: CONFIG_PAGING.IS_PAGING,
					isDescending: CONFIG_DESCENDING.NO_DESCENDING,
					typeFind: CONFIG_TYPE_FIND.TABLE,
					status: null,
					customerUuid: '',
					specUuid: _specId as string,
					productTypeUuid: _productId as string,
					priceTagUuid: _uuid as string
				}),
			}),
		onSuccess(data) {
			setListCustomerChecked(data.items[0].lstCustomer);
			setPriceTag({
				id: data.items[0].priceTagUu.uuid,
				name: data.items[0].priceTagUu.amount
			})
		},
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

	const listSpecifications = useQuery([QUERY_KEY.dropdown_quy_cach], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: wareServices.listSpecification({
					page: 1,
					pageSize: 100,
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

	const listProductType = useQuery([QUERY_KEY.dropdown_loai_hang], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: wareServices.listProductType({
					page: 1,
					pageSize: 100,
					keyword: '',
					isPaging: CONFIG_PAGING.IS_PAGING,
					isDescending: CONFIG_DESCENDING.NO_DESCENDING,
					typeFind: CONFIG_TYPE_FIND.DROPDOWN,
					status: CONFIG_STATUS.HOAT_DONG,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const listPriceTag = useQuery([QUERY_KEY.dropdown_gia_tien_hang], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: priceTagServices.listPriceTagDropDown({
					page: 1,
					pageSize: 100,
					keyword: '',
					isPaging: CONFIG_PAGING.IS_PAGING,
					isDescending: CONFIG_DESCENDING.NO_DESCENDING,
					typeFind: CONFIG_TYPE_FIND.DROPDOWN,
					status: CONFIG_STATUS.HOAT_DONG,
					customerUuid: '',
					specUuidExclude: '',
				}),
			}),
		select(data) {
			return data;
		},
	});

	const handleCheckAll = (e: any) => {
		const { checked } = e?.target;

		if (checked) {
			setListCustomerChecked(listCustomer.data);
		} else {
			setListCustomerChecked([]);
		}
	};

	const fucnAddSpecification = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Chỉnh sửa giá tiền hàng thành công!',
				http: customerServices.addSpecificationToCustomer({
					infoSpec: [
						{
							specUuid: form.specUuid,
							status: CONFIG_STATUS.HOAT_DONG,
							state: CONFIG_STATUS.HOAT_DONG,
							productTypeUuid: form.productTypeUuid,
							priceTagUuid: priceTag.id === '' ? priceTag.name : priceTag.id,
						},
					],
					customerUuid: listCustomerChecked.map((value) => value.uuid),
				}),
			}),
		onSuccess(data) {
			if (data) {
				router.replace(PATH.GiaTien, undefined, {
					scroll: false,
					shallow: false,
				});
			}
		},
		onError(error) {
			console.log({ error });
			return;
		},
	});

	const handleSubmit = async () => {
		if (!form.specUuid) {
			return toastWarn({ msg: 'Vui lòng chọn loại quy cách!' });
		}
		if (!form.productTypeUuid) {
			return toastWarn({ msg: 'Vui lòng chọn loại hàng!' });
		}
		if (priceTag.name === undefined || priceTag.name === '') {
			return toastWarn({ msg: 'Vui lòng chọn giá tiền áp dụng!' });
		}
		if (listCustomerChecked.length === 0) {
			return toastWarn({ msg: 'Vui lòng chọn khách hàng!' });
		}
		// console.log(JSON.stringify({
		// 	infoSpec: [
		// 		{
		// 			specUuid: form.specUuid,
		// 			status: CONFIG_STATUS.HOAT_DONG,
		// 			state: CONFIG_STATUS.HOAT_DONG,
		// 			productTypeUuid: form.productTypeUuid,
		// 			priceTagUuid: priceTag.id === '' ? priceTag.name : priceTag.id,
		// 		},
		// 	],
		// 	customerUuid: listCustomerChecked.map((value) => value.uuid),
		// }))
		return fucnAddSpecification.mutate();
	};

	return (
		<div className={styles.container}>
			<Form form={form} setForm={setForm}>
				<div className={styles.header}>
					<div className={styles.left}>
						<h4>Chỉnh sửa giá tiền</h4>
						<p>Điền đầy đủ các thông tin</p>
					</div>
					<div className={styles.right}>
						<Button href={PATH.GiaTien} p_10_24 rounded_2 grey_outline>
							Hủy bỏ
						</Button>
						<Button p_10_24 rounded_2 primary onClick={handleSubmit}>
							Lưu lại
						</Button>
					</div>
				</div>
				<div className={styles.form}>
					<div className={clsx('mt', 'col_3')}>
						<Select
							isSearch
							name='specUuid'
							placeholder='Lựa chọn quy cách'
							value={form.specUuid}
							onChange={(e: any) =>
								setForm((prev: any) => ({
									...prev,
									specUuid: e.target.value,
								}))
							}
							label={
								<span>
									Quy cách<span style={{ color: 'red' }}>*</span>
								</span>
							}
						>
							{listSpecifications?.data?.map((value: any) => (
								<Option key={value.uuid} title={value?.name} value={value?.uuid} />
							))}
						</Select>
						<div>
							<Select
								isSearch
								name='productTypeUuid'
								value={form.productTypeUuid}
								placeholder='Lựa chọn loại hàng'
								onChange={(e: any) =>
									setForm((prev: any) => ({
										...prev,
										productTypeUuid: e.target.value,
									}))
								}
								label={
									<span>
										Loại hàng<span style={{ color: 'red' }}>*</span>
									</span>
								}
							>
								{listProductType?.data?.map((value: any) => (
									<Option key={value.uuid} title={value.name} value={value.uuid} />
								))}
							</Select>
						</div>
						<SelectSearch
							options={listPriceTag?.data?.map((v: any) => ({
								id: v?.uuid,
								name: String(v?.amount),
							}))}
							data={priceTag}
							setData={setPriceTag}
							label={
								<span>
									Giá tiền áp dụng <span style={{ color: 'red' }}>*</span>
								</span>
							}
							placeholder='Nhập giá tiền'
						/>
					</div>
					<div className={clsx('mt', styles.group)}>
						<div className={styles.btn}>
							<ButtonSelectMany
								showOverlay={false}
								label={
									<span>
										Khách hàng <span style={{ color: 'red' }}>*</span>
									</span>
								}
								placeholder='Chọn khách hàng'
								title='Thêm khách hàng'
								description='Thêm và lựa chọn khách hàng'
								dataList={listCustomer?.data || []}
								dataChecked={listCustomerChecked}
								setDataChecked={setListCustomerChecked}
							/>
						</div>
						<div className={clsx(styles.checkbox_right)}>
							<input
								type='checkbox'
								onChange={handleCheckAll}
								id='checkall'
								checked={listCustomer?.data?.length == listCustomerChecked?.length}
							/>
							<label htmlFor='checkall'>Áp dụng cho tất cả khách hàng </label>
						</div>
					</div>
				</div>
			</Form>
		</div>
	);
}

export default UpdatePriceTag;
