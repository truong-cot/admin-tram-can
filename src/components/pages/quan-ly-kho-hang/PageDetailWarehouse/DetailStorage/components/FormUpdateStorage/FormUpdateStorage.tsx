import React, {useEffect, useState} from 'react';

import {IFormUpdateStorage, PropsFormUpdateStorage} from './interfaces';
import styles from './FormUpdateStorage.module.scss';
import Form, {FormContext, Input} from '~/components/common/Form';
import TextArea from '~/components/common/Form/components/TextArea';
import clsx from 'clsx';
import Button from '~/components/common/Button';
import {IoClose} from 'react-icons/io5';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {CONFIG_DESCENDING, CONFIG_PAGING, CONFIG_TYPE_FIND, QUERY_KEY} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import wareServices from '~/services/wareServices';
import Select, {Option} from '~/components/common/Select';
import storageServices from '~/services/storageServices';
import Loading from '~/components/common/Loading';

function FormUpdateStorage({dataUpdate, onClose}: PropsFormUpdateStorage) {
	const queryClient = useQueryClient();

	const [form, setForm] = useState<IFormUpdateStorage>({
		uuid: '',
		name: '',
		productUuid: '',
		qualityUuid: '',
		specificationsUuid: '',
		warehouseUuid: '',
		locationMap: '',
		description: '',
	});

	useEffect(() => {
		setForm({
			uuid: dataUpdate?.uuid || '',
			name: dataUpdate?.name || '',
			productUuid: dataUpdate?.productUu?.uuid || '',
			qualityUuid: dataUpdate?.qualityUu?.uuid || '',
			specificationsUuid: dataUpdate?.specificationsUu?.uuid || '',
			warehouseUuid: dataUpdate?.warehouseUu?.uuid || '',
			locationMap: dataUpdate?.locationMap || '',
			description: dataUpdate?.description || '',
		});
	}, [dataUpdate]);

	const listProduct = useQuery([QUERY_KEY.dropdown_loai_hang], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: wareServices.listProductType({
					page: 1,
					pageSize: 20,
					keyword: '',
					isPaging: CONFIG_PAGING.NO_PAGING,
					isDescending: CONFIG_DESCENDING.NO_DESCENDING,
					typeFind: CONFIG_TYPE_FIND.DROPDOWN,
					status: null,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const listQuality = useQuery([QUERY_KEY.dropdown_chat_luong], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: wareServices.listQuality({
					page: 1,
					pageSize: 20,
					keyword: '',
					isPaging: CONFIG_PAGING.NO_PAGING,
					isDescending: CONFIG_DESCENDING.NO_DESCENDING,
					typeFind: CONFIG_TYPE_FIND.DROPDOWN,
					status: null,
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
					status: null,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const fucnUpdateStorage = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Chỉnh sửa kho hàng thành công!',
				http: storageServices.upsertStorage({
					uuid: form.uuid,
					name: form.name,
					productUuid: form.productUuid,
					qualityUuid: form.qualityUuid,
					specificationsUuid: form.specificationsUuid,
					warehouseUuid: form.warehouseUuid,
					locationMap: form?.locationMap,
					description: form.description,
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				onClose();
				queryClient.invalidateQueries([QUERY_KEY.chi_tiet_kho_hang_con]);
			}
		},
	});

	const handleSubmit = async () => {
		fucnUpdateStorage.mutate();
	};

	return (
		<div className={styles.container}>
			<Loading loading={fucnUpdateStorage.isLoading} />
			<h4>Chỉnh sửa kho hàng</h4>
			<Form form={form} setForm={setForm} onSubmit={handleSubmit}>
				<Input
					name='name'
					value={form.name || ''}
					isRequired
					max={50}
					type='text'
					blur={true}
					placeholder='Nhập tên kho hàng'
					label={
						<span>
							Kho hàng <span style={{color: 'red'}}> *</span>
						</span>
					}
				/>

				<div className={clsx('mt')}>
					<Select
						isSearch
						name='productUuid'
						placeholder='Chọn loại hàng'
						value={form?.productUuid}
						readOnly={true}
						onChange={(e: any) =>
							setForm((prev: any) => ({
								...prev,
								productUuid: e.target.value,
							}))
						}
						label={
							<span>
								Thuộc loại hàng <span style={{color: 'red'}}>*</span>
							</span>
						}
					>
						{listProduct?.data?.map((v: any) => (
							<Option key={v?.uuid} value={v?.uuid} title={v?.name} />
						))}
					</Select>
					<Select
						isSearch
						name='qualityUuid'
						placeholder='Chọn chất lượng'
						value={form?.qualityUuid}
						readOnly={true}
						onChange={(e: any) =>
							setForm((prev: any) => ({
								...prev,
								qualityUuid: e.target.value,
							}))
						}
						label={
							<span>
								Thuộc chất lượng <span style={{color: 'red'}}>*</span>
							</span>
						}
					>
						{listQuality?.data?.map((v: any) => (
							<Option key={v?.uuid} value={v?.uuid} title={v?.name} />
						))}
					</Select>
					<Select
						isSearch
						name='specificationsUuid'
						placeholder='Chọn quy cách'
						value={form?.specificationsUuid}
						readOnly={true}
						onChange={(e: any) =>
							setForm((prev: any) => ({
								...prev,
								specificationsUuid: e.target.value,
							}))
						}
						label={
							<span>
								Thuộc quy cách <span style={{color: 'red'}}>*</span>
							</span>
						}
					>
						{listSpecification?.data?.map((v: any) => (
							<Option key={v?.uuid} value={v?.uuid} title={v?.name} />
						))}
					</Select>
				</div>

				<div className={clsx('mt')}>
					<TextArea placeholder='Thêm mô tả' name='description' label={<span>Mô tả</span>} blur />
				</div>

				<div className={styles.btn}>
					<div>
						<Button p_10_24 rounded_2 grey_outline onClick={onClose}>
							Hủy bỏ
						</Button>
					</div>
					<div>
						<FormContext.Consumer>
							{({isDone}) => (
								<Button
									disable={!isDone || !form.productUuid || !form.qualityUuid || !form.specificationsUuid}
									p_10_24
									rounded_2
									primary
								>
									Cập nhật
								</Button>
							)}
						</FormContext.Consumer>
					</div>
				</div>

				<div className={styles.close} onClick={onClose}>
					<IoClose />
				</div>
			</Form>
		</div>
	);
}

export default FormUpdateStorage;
