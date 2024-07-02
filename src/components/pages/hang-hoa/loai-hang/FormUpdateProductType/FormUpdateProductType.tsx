import React, {useEffect, useState} from 'react';

import {PropsFormUpdateProductType} from './interfaces';
import styles from './FormUpdateProductType.module.scss';
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
import {toastWarn} from '~/common/funcs/toast';

function FormUpdateProductType({dataUpdateProductType, onClose}: PropsFormUpdateProductType) {
	const queryClient = useQueryClient();

	const [form, setForm] = useState<{
		uuid: string;
		name: string;
		description: string;
	}>({uuid: '', name: '', description: ''});

	useEffect(() => {
		setForm({
			uuid: dataUpdateProductType?.uuid || '',
			name: dataUpdateProductType?.name || '',
			description: dataUpdateProductType?.description || '',
		});
	}, [dataUpdateProductType]);

	const fucnUpdateProductType = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Chỉnh sửa loại hàng thành công!',
				http: wareServices.upsertProductType({
					uuid: form.uuid,
					name: form.name,
					description: form.description,
				}),
			}),
		onSuccess(data) {
			if (data) {
				setForm({
					uuid: '',
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
		if (!form.uuid) {
			return toastWarn({
				msg: 'Không tìm thấy loại hàng!',
			});
		}

		return fucnUpdateProductType.mutate();
	};

	return (
		<div className={styles.container}>
			<Loading loading={fucnUpdateProductType.isLoading} />
			<h4>Chỉnh sửa loại hàng</h4>
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

export default FormUpdateProductType;
