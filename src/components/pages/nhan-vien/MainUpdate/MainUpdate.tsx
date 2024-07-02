import React, {useState} from 'react';

import {PropsMainUpdate} from './interfaces';
import styles from './MainUpdate.module.scss';
import Button from '~/components/common/Button';
import {PATH} from '~/constants/config';
import Form, {Input} from '~/components/common/Form';
import clsx from 'clsx';
import Select, {Option} from '~/components/common/Select';
import DatePicker from '~/components/common/DatePicker';
import {GENDER} from '~/constants/config/enum';
import TextArea from '~/components/common/Form/components/TextArea';

function MainUpdate({}: PropsMainUpdate) {
	const [date, setDate] = useState<string>('');
	const [form, setForm] = useState<any>({
		name: '',
		manager: '',
		gender: null,
		email: '',
		phone: '',
		provinceManager: '',
		description: '',
	});

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.left}>
					<h4>Chỉnh sửa Nhân viên</h4>
					<p>Điền đầy đủ các thông tin Nhân viên</p>
				</div>
				<div className={styles.right}>
					<Button href={PATH.NhanVien} p_10_24 rounded_2 grey_outline>
						Hủy bỏ
					</Button>
					<Button p_10_24 rounded_2 primary>
						Chỉnh sửa
					</Button>
				</div>
			</div>

			<div className={styles.form}>
				<Form form={form} setForm={setForm}>
					<div className={clsx('col_2')}>
						<Input
							name='name'
							value={form.name || ''}
							label={
								<span>
									Họ và tên <span style={{color: 'red'}}>*</span>
								</span>
							}
							placeholder='Nhập tên khách hàng'
						/>
						<Select
							isSearch
							name='manager'
							value={form.manager}
							placeholder='Người quản lý'
							onChange={(manager) =>
								setForm((prev: any) => ({
									...prev,
									manager: manager,
								}))
							}
							label={
								<span>
									Chọn người quản lý<span style={{color: 'red'}}>*</span>
								</span>
							}
						>
							<Option title='Người quản lý 1' value={1} />
							<Option title='Người quản lý 2' value={2} />
						</Select>
					</div>
					<div className={clsx('mt', 'col_2')}>
						<DatePicker
							icon={true}
							label={'Ngày sinh'}
							placeholder='Chọn ngày sinh'
							value={date}
							onSetValue={setDate}
							name='dateOfBirth'
							onClean={true}
						/>
						<div className={styles.gennder}>
							<label>Giới tính</label>
							<div className={styles.group_radio}>
								<div className={styles.item_radio}>
									<input
										id='male'
										className={styles.input_radio}
										type='radio'
										name='gender'
										value={form.gender}
										checked={form.gender == GENDER.NAM}
										onChange={(e) =>
											setForm((prev: any) => ({
												...prev,
												gender: GENDER.NAM,
											}))
										}
									/>
									<label className={styles.input_lable} htmlFor='male'>
										Nam
									</label>
								</div>

								<div className={styles.item_radio}>
									<input
										id='female'
										className={styles.input_radio}
										type='radio'
										name='gender'
										value={form.gender}
										checked={form.gender == GENDER.NU}
										onChange={(e) =>
											setForm((prev: any) => ({
												...prev,
												gender: GENDER.NU,
											}))
										}
									/>
									<label className={styles.input_lable} htmlFor='female'>
										Nữ
									</label>
								</div>

								{/* <div className={styles.item_radio}>
									<input
										id='other'
										className={styles.input_radio}
										type='radio'
										name='gender'
										value={form.gender}
										checked={form.gender == GENDER.KHAC}
										onChange={(e) =>
											setForm((prev: any) => ({
												...prev,
												gender: GENDER.KHAC,
											}))
										}
									/>
									<label className={styles.input_lable} htmlFor='other'>
										Khác
									</label>
								</div> */}
							</div>
						</div>
					</div>

					<div className={clsx('mt', 'col_2')}>
						<Input
							name='email'
							value={form.email || ''}
							label={
								<span>
									Email <span style={{color: 'red'}}>*</span>
								</span>
							}
							placeholder='Nhập email'
						/>
						<div>
							<Input
								name='phone'
								value={form.phone || ''}
								label={
									<span>
										Số điện thoại<span style={{color: 'red'}}>*</span>
									</span>
								}
								placeholder='Nhập số điện thoại'
							/>
						</div>
					</div>

					<div className={clsx('mt')}>
						<Select
							isSearch
							name='provinceManager'
							value={form.provinceManager}
							placeholder='Chọn thành phố quản lý'
							onChange={(province) =>
								setForm((prev: any) => ({
									...prev,
									provinceManager: province,
								}))
							}
							label={
								<span>
									Thành phố quản lý<span style={{color: 'red'}}>*</span>
								</span>
							}
						>
							<Option title='Hà Nôi' value={1} />
							<Option title='Hà Tĩnh' value={2} />
						</Select>
					</div>

					<div className={clsx('mt')}>
						<TextArea placeholder='Nhập ghi chú' name='description' label={<span>Ghi chú</span>} blur />
					</div>
				</Form>
			</div>
		</div>
	);
}

export default MainUpdate;
