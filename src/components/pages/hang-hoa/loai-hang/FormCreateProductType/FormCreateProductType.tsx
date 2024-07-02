import React, {useState} from 'react';

import {PropsFormCreateProductType} from './interfaces';
import styles from './FormCreateProductType.module.scss';
import Form, {FormContext, Input} from '~/components/common/Form';
import Button from '~/components/common/Button';
import {IoClose} from 'react-icons/io5';
import TextArea from '~/components/common/Form/components/TextArea';
import clsx from 'clsx';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import wareServices from '~/services/wareServices';
import {QUERY_KEY} from '~/constants/config/enum';
import Loading from '~/components/common/Loading';

function FormCreateProductType({onClose}: PropsFormCreateProductType) {
	const queryClient = useQueryClient();

	const [form, setForm] = useState<{
		name: string;
		description: string;
	}>({name: '', description: ''});

	const fucnCreateProductType = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Thêm mới loại hàng thành công!',
				http: wareServices.upsertProductType({
					uuid: '',
					name: form.name,
					description: form.description,
				}),
			}),
		onSuccess(data) {
			if (data) {
				setForm({
					name: '',
					description: '',
				});
				onClose();
				queryClient.invalidateQueries([QUERY_KEY.table_loai_hang]);
			}
		},
		onError(error) {
			console.log({error});
			return;
		},
	});

	const handleSubmit = () => {
		return fucnCreateProductType.mutate();
	};

	return (
		<div className={styles.container}>
			<Loading loading={fucnCreateProductType.isLoading} />
			<h4>Thêm loại hàng</h4>
			<Form form={form} setForm={setForm} onSubmit={handleSubmit}>
				<Input
					name='name'
					value={form.name || ''}
					isRequired
					min={5}
					max={50}
					type='text'
					blur={true}
					placeholder='Nhập tên loại hàng'
					label={
						<span>
							Loại hàng<span style={{color: 'red'}}> *</span>
						</span>
					}
				/>
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
								<Button disable={!isDone} p_10_24 rounded_2 primary>
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

export default FormCreateProductType;
