import React, { useState } from 'react';

import { PropsPopupDetailPrice } from './interfaces';
import styles from './PopupDetailPrice.module.scss';
import clsx from 'clsx';
import Button from '~/components/common/Button';
import { IoClose } from 'react-icons/io5';
import Form, { Input } from '~/components/common/Form';
import { PATH } from '~/constants/config';
import { convertCoin } from '~/common/funcs/convertCoin';

function PopupDetailPrice({ onClose, data }: PropsPopupDetailPrice) {
	const [form, setForm] = useState<any>({
		specUu: data.specUu.name,
		amount: data.priceTagUu === null ? '---' : convertCoin(data.priceTagUu.amount) + " đ",
		product: data.productTypeUu.name,
		totalCustomer: data.lstCustomer.length
	});
	return (
		<div className={styles.container}>
			<h4 className={styles.title}>Chi tiết giá tiền</h4>
			<Form form={form} setForm={setForm}>
				<div className={clsx('mt')}>
					<Input
						name='specUu'
						readOnly
						value={form.specUu || '---'}
						label={
							<span>
								Quy cách <span style={{ color: 'red' }}>*</span>
							</span>
						}
						placeholder='Nhập quy cách'
					/>
					<Input
						name='product'
						readOnly
						value={form.product || '---'}
						label={
							<span>
								Loại hàng <span style={{ color: 'red' }}>*</span>
							</span>
						}
						placeholder='Nhập loại hàng'
					/>
					<Input
						name='amount'
						readOnly
						value={form.amount || '---'}
						label={
							<span>
								Giá tiền áp dụng <span style={{ color: 'red' }}>*</span>
							</span>
						}
						placeholder='VD: 14,969đ'
					/>
					<Input
						name='totalCustomer'
						readOnly
						value={form.totalCustomer || '---'}
						label={
							<span>
								Khách hàng áp dụng <span style={{ color: 'red' }}>*</span>
							</span>
						}
						placeholder='1'
					/>
				</div>
			</Form>
			<div className={styles.control}>
				<div>
					<Button p_8_24 rounded_2 grey_outline onClick={onClose}>
						Đóng
					</Button>
				</div>
				<div>
					<Button href={PATH.ChinhSuaGiaTien + `?_uuid=${data.priceTagUu.uuid}&_specId=${data.specUu.uuid}&_productId=${data.productTypeUu.uuid}`} p_8_24 rounded_2 primary>
						Chỉnh sửa
					</Button>
				</div>
			</div>
			<div className={styles.icon_close} onClick={onClose}>
				<IoClose size={24} color='#23262F' />
			</div>
		</div>
	);
}

export default PopupDetailPrice;
