import React, {useState} from 'react';
import {IFormDeleteBill, PropsPopupDeleteBill} from './interfaces';
import styles from './PopupDeleteBill.module.scss';
import clsx from 'clsx';
import Button from '~/components/common/Button';
import Form, {FormContext} from '~/components/common/Form';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import TextArea from '~/components/common/Form/components/TextArea';
import batchBillServices from '~/services/batchBillServices';
import {QUERY_KEY} from '~/constants/config/enum';
import Loading from '~/components/common/Loading';
import {IoHelpCircleOutline} from 'react-icons/io5';

function PopupDeleteBill({uuid, onClose}: PropsPopupDeleteBill) {
	const queryClient = useQueryClient();

	const [form, setForm] = useState<IFormDeleteBill>({
		description: '',
	});

	const fucnDeleteBatchBill = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Hủy phiếu hàng dự kiến thành công!',
				http: batchBillServices.deleteBatchBill({
					uuid: uuid as string,
					description: form.description,
				}),
			}),
		onSuccess(data) {
			if (data) {
				queryClient.invalidateQueries([QUERY_KEY.table_phieu_hang_du_kien]);
				queryClient.invalidateQueries([QUERY_KEY.chi_tiet_phieu_du_kien]);
				onClose();
			}
		},
		onError(error) {
			console.log({error});
		},
	});

	const handleSubmit = () => {
		return fucnDeleteBatchBill.mutate();
	};

	return (
		<div className={clsx('effectZoom', styles.popup)}>
			<Loading loading={fucnDeleteBatchBill.isLoading} />
			<div className={styles.iconWarn}>
				<IoHelpCircleOutline />
			</div>

			<p className={styles.note}>{'Bạn chắc chắn muốn hủy phiếu cân hiện tại?'}</p>
			<div className={clsx('mt')}>
				<Form form={form} setForm={setForm} onSubmit={handleSubmit}>
					<TextArea isRequired name='description' placeholder='Nhập lý do hủy phiếu' />
					<div className={styles.groupBtnPopup}>
						<Button p_10_24 className='click' grey_2 rounded_8 bold onClick={onClose} maxContent>
							Đóng
						</Button>
						<FormContext.Consumer>
							{({isDone}) => (
								<Button
									disable={!isDone}
									p_10_24
									className='click'
									primary
									bold
									rounded_8
									onClick={handleSubmit}
									maxContent
								>
									Xác nhận
								</Button>
							)}
						</FormContext.Consumer>
					</div>
				</Form>
			</div>
		</div>
	);
}

export default PopupDeleteBill;
