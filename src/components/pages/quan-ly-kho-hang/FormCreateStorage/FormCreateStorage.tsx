import React, {useState} from 'react';

import {IFormCreateStorage, PropsFormCreateStorage} from './interfaces';
import styles from './FormCreateStorage.module.scss';
import Loading from '~/components/common/Loading';
import Form, {FormContext, Input} from '~/components/common/Form';
import TextArea from '~/components/common/Form/components/TextArea';
import clsx from 'clsx';
import Button from '~/components/common/Button';
import {IoClose} from 'react-icons/io5';
import {useRouter} from 'next/router';
import {useQuery} from '@tanstack/react-query';
import {CONFIG_DESCENDING, CONFIG_PAGING, CONFIG_TYPE_FIND, QUERY_KEY} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import wareServices from '~/services/wareServices';
import Select, {Option} from '~/components/common/Select';
import {WEIGHT_WAREHOUSE} from '~/constants/config';
import {toastWarn} from '~/common/funcs/toast';
import convertPositonStorage from '~/common/funcs/convertPositonStorage';
import {price} from '~/common/funcs/convertCoin';

function FormCreateStorage({numberId, onClose}: PropsFormCreateStorage) {
	const router = useRouter();

	const {_id} = router.query;

	const [form, setForm] = useState<IFormCreateStorage>({
		name: '',
		productUuid: '',
		qualityUuid: '',
		specificationsUuid: '',
		locationMap: '',
		description: '',
		weight: '',
	});

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

	const handleSubmit = async () => {
		if (price(form.weight) > WEIGHT_WAREHOUSE * 100) {
			return toastWarn({msg: 'Khối lượng kho con vượt qua sức chứa!'});
		}

		console.log(convertPositonStorage(numberId, price(form.weight)));
	};

	return (
		<div className={styles.container}>
			{/* <Loading loading={fucnCreateProductType.isLoading} /> */}
			<h4>Thêm kho hàng</h4>
			<Form form={form} setForm={setForm} onSubmit={handleSubmit}>
				<Input
					name='name'
					value={form.name || ''}
					isRequired
					min={5}
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
					<Input
						name='weight'
						value={form.weight || ''}
						isRequired
						type='text'
						blur={true}
						isMoney
						unit='KG'
						label={
							<span>
								Khối lượng xe <span style={{color: 'red'}}>*</span>
							</span>
						}
						placeholder='VD: 30.000'
					/>
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
									Lưu lại
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

export default FormCreateStorage;
