import React, {useState} from 'react';

import {PropsPopupAddPrice} from './interfaces';
import styles from './PopupAddPrice.module.scss';
import clsx from 'clsx';
import Button from '~/components/common/Button';
import {IoClose} from 'react-icons/io5';
import Form, {Input} from '~/components/common/Form';
import Select, {Option} from '~/components/common/Select';

function PopupAddPrice({
	// idx, data, 
	onClose
	// , handleChangeValue
}: PropsPopupAddPrice) {
	const [form, setForm] = useState<any>({
		rangeofvehicle: '',
		Licenseplate: '',
		code: '',
		RFID: '',
		vehiclemass: '',
		isSift: '',
	});
	return (
		<div className={styles.container}>
			<h4 className={styles.title}>Thêm giá tiền</h4>
			<Form form={form} setForm={setForm}>
				<div className={clsx('mt')}>
				<Select
						isSearch
						name='personnel'
						placeholder='Chọn loại hàng'
						value={form?.personnel}
						onChange={(e: any) =>
							setForm((prev: any) => ({
								...prev,
								personnel: e.target.value,
							}))
						}
						label={
							<span>
								Loại hàng<span style={{color: 'red'}}>*</span>
							</span>
						}
					>
						<Option title='Loại hàng 1' value={1} />
						<Option title='Loại hàng 2' value={2} />
						<Option title='Loại hàng 3' value={3} />
					</Select>
					<div className={clsx('mt')}><Select
						isSearch
						name='personnel'
						placeholder='Chọn quy cách'
						value={form?.personnel}
						onChange={(e: any) =>
							setForm((prev: any) => ({
								...prev,
								personnel: e.target.value,
							}))
						}
						label={
							<span>
								Quy cách<span style={{color: 'red'}}>*</span>
							</span>
						}
					>
						<Option title='Quy cách 1' value={1} />
						<Option title='Quy cách 2' value={2} />
						<Option title='Quy cách 3' value={3} />
					</Select></div>
					
					{/* <div className={clsx('mt')}>
						<div className={styles.classify}>
							<label>
								Phân loại <span style={{color: 'red'}}>*</span>
							</label>
							{qualitys?.map((v, idx) => (
							<ItemQuantily
								key={idx}
								data={v}
								idx={idx}
								showBtnDelete={idx != 0}
								handleDeleteRow={handleDeleteRow}
								handleChangeValue={handleChangeValue}
							/>
						))}
						</div>
					</div> */}
					{/* <div className={styles.group_radio}>
						<div className={styles.item_radio}>
							<input
								value={form.isSift}
								type='radio'
								id={`category_is_sift_${idx}`}
								name={`category_is_sift_${idx}`}
								checked={data?.isSift == true}
								onChange={() => handleChangeValue(idx, 'isSift', true)}
							/>
							<label htmlFor={`category_is_sift_${idx}`}>Đã sàng</label>
						</div>
						<div className={styles.item_radio}>
							<input
								value={form.isSift}
								type='radio'
								id={`category_not_sift_${idx}`}
								name={`category_not_sift_${idx}`}
								checked={data?.isSift == false}
								onChange={() => handleChangeValue(idx, 'isSift', false)}
							/>
							<label htmlFor={`category_not_sift_${idx}`}>Chưa sàng</label>
						</div>
					</div> */}
					<div className={clsx('mt')}>
						<Input
							name='rangeofvehicle'
							value={form.rangeofvehicle || ''}
							label={
								<span>
									Giá tiền áp dụng <span style={{color: 'red'}}>*</span>
								</span>
							}
							placeholder='Nhập giá tiền'
						/>
					</div>
				</div>
			</Form>
			<div className={styles.control}>
				<div>
					<Button p_8_24 rounded_2 grey_outline onClick={onClose}>
						Hủy bỏ
					</Button>
				</div>
				<div>
					<Button p_8_24 rounded_2 primary>
						Xác nhận
					</Button>
				</div>
			</div>
			<div className={styles.icon_close} onClick={onClose}>
				<IoClose size={24} color='#23262F' />
			</div>
		</div>
	);
}

export default PopupAddPrice;
