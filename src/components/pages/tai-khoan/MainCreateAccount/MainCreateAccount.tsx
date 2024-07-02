import React, {useState} from 'react';
import {IoMdAddCircle} from 'react-icons/io';

import {PropsMainCreateAccount} from './interfaces';
import styles from './MainCreateAccount.module.scss';
import Button from '~/components/common/Button';
import Form, {Input} from '~/components/common/Form';
import AvatarChange from '~/components/common/AvatarChange';
import clsx from 'clsx';
import DatePicker from '~/components/common/DatePicker';
import Select, {Option} from '~/components/common/Select';
import {PATH} from '~/constants/config';
import {GENDER} from '~/constants/config/enum';
import Popup from '~/components/common/Popup';
import PopupPersonnel from '../PopupPersonnel';
import {IoClose} from 'react-icons/io5';
import ButtonSelectMany from '~/components/common/ButtonSelectMany';

function MainCreateAccount({}: PropsMainCreateAccount) {
	const [open, setOpen] = useState<boolean>(false);
	const [date, setDate] = useState<string>('');
	const [form, setForm] = useState<any>({
		avatar: '',
		name: '',
		email: '',
		phone: '',
		province: '',
		district: '',
		ward: '',
		address: '',
		username: '',
		role: '',
		gender: null,
	});

	const [listAccountChecked, setListAccountChecked] = useState<any[]>([]);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.left}>
					<h4>Thêm người dùng</h4>
					<p>Điền đầy đủ các thông tin người dùng</p>
				</div>
				<div className={styles.right}>
					<Button href={PATH.TaiKhoan} p_10_24 rounded_2 grey_outline>
						Hủy bỏ
					</Button>
					<Button p_10_24 rounded_2 primary>
						Lưu lại
					</Button>
				</div>
			</div>

			<div className={styles.form}>
				<Form form={form} setForm={setForm}>
					<div className={'mb'}>
						<AvatarChange path={form?.avatar} name='avatar' />
					</div>
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

					<div className={clsx('mt', 'col_3')}>
						<Select
							isSearch
							name='province'
							value={form.province}
							placeholder='Chọn tỉnh, thành phố'
							onChange={(province) =>
								setForm((prev: any) => ({
									...prev,
									province: province,
								}))
							}
							label={
								<span>
									Tỉnh/Thành phố<span style={{color: 'red'}}>*</span>
								</span>
							}
						>
							<Option title='Hà Nôi' value={1} />
							<Option title='Hà Tĩnh' value={2} />
						</Select>
						<div>
							<Select
								isSearch
								name='district'
								value={form.district}
								placeholder='Chọn quận/huyện'
								onChange={(district) =>
									setForm((prev: any) => ({
										...prev,
										district: district,
									}))
								}
								label={
									<span>
										Quận/Huyện<span style={{color: 'red'}}>*</span>
									</span>
								}
							>
								<Option title='Ba Đình' value={1} />
								<Option title='Đống Đa' value={2} />
							</Select>
						</div>
						<Select
							isSearch
							name='ward'
							value={form.ward}
							placeholder='Chọn xã, phường'
							onChange={(ward) =>
								setForm((prev: any) => ({
									...prev,
									ward: ward,
								}))
							}
							label={
								<span>
									Xã/phường<span style={{color: 'red'}}>*</span>
								</span>
							}
						>
							<Option title='Trâu Quỳ' value={1} />
							<Option title='Đặng Xá' value={2} />
						</Select>
					</div>
					<div className={clsx('mt')}>
						<Input
							name='address'
							value={form.address || ''}
							label={<span>Địa chỉ chi tiết</span>}
							placeholder='Nhập địa chỉ chi tiết'
						/>
					</div>
					<div className={clsx('col_2', 'mt')}>
						<Input
							name='username'
							value={form.username || ''}
							label={
								<span>
									Tên đăng nhập <span style={{color: 'red'}}>*</span>
								</span>
							}
							placeholder='Nhập tên đăng nhập'
						/>
						<Select
							isSearch
							name='role'
							value={form.role}
							placeholder='Vai trò'
							onChange={(role) =>
								setForm((prev: any) => ({
									...prev,
									role: role,
								}))
							}
							label={<span>Vai trò</span>}
						>
							<Option title='Vai trò 1' value={1} />
							<Option title='Vai trò 2' value={2} />
						</Select>
					</div>
					<div className={clsx('mt')}>
						<ButtonSelectMany
							label='Nhân viên trị trường trực thuộc'
							placeholder='Tìm và thêm nhân viên'
							title='Thêm nhân viên trị trường'
							description='Thêm và lựa chọn  nhân viên'
							dataList={[]}
							dataChecked={listAccountChecked}
							setDataChecked={setListAccountChecked}
						/>
					</div>
				</Form>
			</div>

			{/* POPUP */}
			<Popup open={open} onClose={() => setOpen(false)}>
				<PopupPersonnel onClose={() => setOpen(false)} />
			</Popup>
		</div>
	);
}

export default MainCreateAccount;
