import React, {useState} from 'react';

import {PropsFormCreateQualities} from './interfaces';
import styles from './FormCreateQualities.module.scss';
import Form, {FormContext, Input} from '~/components/common/Form';
import TextArea from '~/components/common/Form/components/TextArea';
import clsx from 'clsx';
import Button from '~/components/common/Button';
import {IoClose} from 'react-icons/io5';
import Loading from '~/components/common/Loading';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import wareServices from '~/services/wareServices';
import {QUERY_KEY} from '~/constants/config/enum';

function FormCreateQualities({onClose}: PropsFormCreateQualities) {
	const queryClient = useQueryClient();

	const [form, setForm] = useState<{
		name: string;
		description: string;
	}>({name: '', description: ''});

	const fucnCreateQualities = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Thêm mới chất lượng thành công!',
				http: wareServices.upsertQualities({
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
				queryClient.invalidateQueries([QUERY_KEY.table_chat_luong]);
			}
		},
		onError(error) {
			console.log({error});
			return;
		},
	});

	const handleSubmit = () => {
		return fucnCreateQualities.mutate();
	};

	return (
		<div className={styles.container}>
			<Loading loading={fucnCreateQualities.isLoading} />
			<h4>Thêm chất lượng</h4>
			<Form form={form} setForm={setForm} onSubmit={handleSubmit}>
				<Input
					name='name'
					value={form.name || ''}
					isRequired
					min={5}
					max={50}
					type='text'
					blur={true}
					placeholder='Nhập tên chất lượng'
					label={
						<span>
							Chất lượng<span style={{color: 'red'}}> *</span>
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

export default FormCreateQualities;
