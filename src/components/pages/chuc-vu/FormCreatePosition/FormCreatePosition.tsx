import React, {useState} from 'react';
import {IFormCreatePosition, PropsFormCreatePosition} from './interfaces';
import styles from './FormCreatePosition.module.scss';
import Form, {FormContext, Input} from '~/components/common/Form';
import TextArea from '~/components/common/Form/components/TextArea';
import Button from '~/components/common/Button';
import {IoClose} from 'react-icons/io5';
import clsx from 'clsx';
import {toastWarn} from '~/common/funcs/toast';
import regencyServices from '~/services/regencyServices';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import {useRouter} from 'next/router';
import {QUERY_KEY} from '~/constants/config/enum';
import Loading from '~/components/common/Loading';

function FormCreatePosition({onClose}: PropsFormCreatePosition) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_page, _pageSize, _keyword, _status} = router.query;
	const [form, setForm] = useState<IFormCreatePosition>({name: '', description: ''});

	const fucnCreatePosition = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Thêm chức vụ thành công!',
				http: regencyServices.upsertRegency({
					uuid: '',
					time: '',
					name: form.name,
					description: form.description,
				}),
			}),
		onSuccess(data) {
			if (data) {
				queryClient.invalidateQueries([QUERY_KEY.Table_chuc_vu, _page, _pageSize, _keyword, _status]);
				onClose();
				setForm({
					name: '',
					description: '',
				});
			}
		},
	});

	const handleSubmit = () => {
		if (!form.name == null) {
			return toastWarn({msg: 'Vui lòng nhập tên chức vụ!'});
		}

		return fucnCreatePosition.mutate();
	};

	return (
		<div className={styles.container}>
			<h4>Thêm chức vụ</h4>
			<Loading loading={fucnCreatePosition.isLoading} />
			<Form form={form} setForm={setForm}>
				<Input
					type='text'
					placeholder='Tên chức vụ'
					name='name'
					isRequired
					label={
						<span>
							Tên chức vụ <span style={{color: 'red'}}>*</span>
						</span>
					}
				/>
				<div className={clsx('mt')}>
					<TextArea placeholder='Thêm mô tả' name='description' label={<span>Mô tả</span>} blur />
				</div>

				<div className={styles.btn}>
					<div className={styles.groupBtnPopup}>
						<Button p_10_24 rounded_2 grey_outline onClick={onClose}>
							Hủy bỏ
						</Button>
						<FormContext.Consumer>
							{({isDone}) => (
								<Button disable={!isDone} p_10_24 rounded_2 primary onClick={handleSubmit} maxContent>
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

export default FormCreatePosition;
