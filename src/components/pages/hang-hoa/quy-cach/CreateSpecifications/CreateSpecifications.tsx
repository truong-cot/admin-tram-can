import React, {useState} from 'react';
import {IFormCreateSpecifications, PropsCreateSpecifications} from './interfaces';
import styles from './CreateSpecifications.module.scss';
import Button from '~/components/common/Button';
import {PATH} from '~/constants/config';
import Form, {FormContext, Input} from '~/components/common/Form';
import clsx from 'clsx';
import Select, {Option} from '~/components/common/Select';
import {specification} from '~/common/funcs/convertCoin';
import ItemRuler from '../ItemRuler';
import {CONFIG_DESCENDING, CONFIG_PAGING, CONFIG_STATUS, CONFIG_TYPE_FIND, QUERY_KEY, TYPE_RULER} from '~/constants/config/enum';
import TextArea from '~/components/common/Form/components/TextArea';
import {useMutation, useQuery} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import wareServices from '~/services/wareServices';
import {useRouter} from 'next/router';
import {toastWarn} from '~/common/funcs/toast';
import Loading from '~/components/common/Loading';

function CreateSpecifications({}: PropsCreateSpecifications) {
	const router = useRouter();

	const [form, setForm] = useState<IFormCreateSpecifications>({
		name: '',
		qualityUuid: '',
		description: '',
	});

	const [dataRuler, setDataRuler] = useState<
		{
			titleType: string;
			rule: TYPE_RULER;
			value: number | null;
		}[]
	>([
		{
			titleType: '',
			rule: TYPE_RULER.NHO_HON,
			value: null,
		},
	]);

	const listQualities = useQuery([QUERY_KEY.dropdown_chat_luong], {
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
					status: CONFIG_STATUS.HOAT_DONG,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const handleAddRow = () => {
		setDataRuler((prev) => [
			...prev,
			{
				titleType: '',
				rule: TYPE_RULER.NHO_HON,
				value: null,
			},
		]);
	};

	const handleDeleteRow = (index: number) => {
		if (dataRuler.length > 1) {
			const updateData = [...dataRuler];
			updateData.splice(index, 1);
			setDataRuler([...updateData]);
		} else {
			setDataRuler([
				{
					titleType: '',
					rule: TYPE_RULER.NHO_HON,
					value: null,
				},
			]);
		}
	};

	const handleChangeValue = (index: number, name: string, value: any) => {
		const newData = [...dataRuler];

		newData[index] = {
			...newData[index],
			[name]: name == 'value' ? specification(value) : value,
		};

		setDataRuler(newData);
	};

	const fucnCreateSpecifications = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Thêm mới quy cách thành công!',
				http: wareServices.upsertSpecifications({
					uuid: '',
					name: form.name,
					description: form.description,
					qualityUuid: form.qualityUuid,
					items: dataRuler?.map((v) => ({
						titleType: v?.titleType!,
						rule: v?.rule!,
						value: v?.value!,
					})),
				}),
			}),
		onSuccess(data) {
			if (data) {
				setForm({
					name: '',
					description: '',
					qualityUuid: '',
				});
				setDataRuler([
					{
						titleType: '',
						rule: TYPE_RULER.NHO_HON,
						value: null,
					},
				]);
				router.replace(PATH.HangHoaQuyCach, undefined, {
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
		if (!form?.qualityUuid) {
			return toastWarn({
				msg: 'Vui lòng chọn chất lượng!',
			});
		}

		if (dataRuler?.some((v) => v.titleType == '')) {
			return toastWarn({
				msg: 'Vui lòng nhập tiêu chí!',
			});
		}

		if (dataRuler?.some((v) => !v.value)) {
			return toastWarn({
				msg: 'Vui lòng nhập thông số!',
			});
		}

		return fucnCreateSpecifications.mutate();
	};

	return (
		<div className={styles.container}>
			<Loading loading={fucnCreateSpecifications.isLoading} />
			<Form form={form} setForm={setForm} onSubmit={handleSubmit}>
				<div className={styles.header}>
					<div className={styles.left}>
						<h4>Thêm quy cách</h4>
						<p>Điền đầy đủ các thông tin quy cách</p>
					</div>
					<div className={styles.right}>
						<Button href={PATH.HangHoaQuyCach} p_10_24 rounded_2 grey_outline>
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
					<div className={clsx('mt', 'col_2')}>
						<div>
							<Input
								name='name'
								value={form.name || ''}
								isRequired
								min={5}
								max={50}
								type='text'
								blur={true}
								placeholder='Nhập tên'
								label={
									<span>
										Tên quy cách<span style={{color: 'red'}}>*</span>
									</span>
								}
							/>
						</div>
						<Select
							isSearch
							name='qualityUuid'
							value={form.qualityUuid}
							placeholder='Lựa chọn'
							onChange={(e) =>
								setForm((prev: any) => ({
									...prev,
									qualityUuid: e.target.value,
								}))
							}
							label={
								<span>
									Chất lượng <span style={{color: 'red'}}>*</span>
								</span>
							}
						>
							{listQualities?.data?.map((v: any) => (
								<Option key={v?.uuid} value={v?.uuid} title={v?.name} />
							))}
						</Select>
					</div>

					<div className={clsx('mt')}>
						<TextArea placeholder='Thêm mô tả' name='description' label={<span>Mô tả</span>} blur />
					</div>

					<div className={clsx('mt')}>
						<div className={styles.header_quantily}>
							<p>
								Tiêu chí <span style={{color: 'red'}}>*</span>
							</p>
							<p>
								Điều kiện <span style={{color: 'red'}}>*</span>
							</p>
							<p>
								Thông số <span style={{color: 'red'}}>*</span>
							</p>
						</div>
						{dataRuler?.map((v, idx) => (
							<ItemRuler
								key={idx}
								data={v}
								idx={idx}
								showBtnDelete={idx != 0}
								handleDeleteRow={handleDeleteRow}
								handleChangeValue={handleChangeValue}
							/>
						))}
					</div>

					<div className={clsx('mt')}>
						<p className={styles.btn_add} onClick={handleAddRow}>
							+ Thêm tiêu chí
						</p>
					</div>
				</div>
			</Form>
		</div>
	);
}

export default CreateSpecifications;
