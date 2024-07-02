import React, {useState} from 'react';

import {PropsMainCreate} from './interfaces';
import styles from './MainCreate.module.scss';
import Button from '~/components/common/Button';
import {PATH} from '~/constants/config';
import Form, {Input} from '~/components/common/Form';
import clsx from 'clsx';
import Select, {Option} from '~/components/common/Select';
import DatePicker from '~/components/common/DatePicker';
import {CONFIG_DESCENDING, CONFIG_PAGING, CONFIG_STATUS, CONFIG_TYPE_FIND, GENDER, QUERY_KEY, REGENCY_NAME} from '~/constants/config/enum';
import TextArea from '~/components/common/Form/components/TextArea';
import {useQuery} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import regencyServices from '~/services/regencyServices';
import userServices from '~/services/userServices';
import commonServices from '~/services/commonServices';

function MainCreate({}: PropsMainCreate) {
	const [date, setDate] = useState<string>('');
	const [form, setForm] = useState<any>({
		fullName: '',
		phoneNumber: '',
		email: '',
		birthDay: '',
		address: '',
		description: '',
		accountUsername: '',
		regencyUuid: '',
		sex: GENDER.NAM,
		linkImage: '',
		arrayOwnerUuid: '',
		arrayPartnerUuid: '',
		provinceId: '',
		districtId: '',
		townId: '',
		provinceOwnerId: '',
	});

	const listRegency = useQuery([QUERY_KEY.dropdown_chuc_vu], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: regencyServices.listRegency({
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

	const listProvince = useQuery([QUERY_KEY.dropdown_tinh_thanh_pho], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: commonServices.listProvince({
					keyword: '',
					status: CONFIG_STATUS.HOAT_DONG,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const listUserManager = useQuery([QUERY_KEY.dropdown_nguoi_quan_ly_nhan_vien], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: userServices.listUser({
					page: 1,
					pageSize: 20,
					keyword: '',
					regencyUuid: listRegency?.data?.find((v: any) => v?.id == REGENCY_NAME['Quản lý nhập hàng'])
						? listRegency?.data?.find((v: any) => v?.id == REGENCY_NAME['Quản lý nhập hàng'])?.uuid
						: null,
					isPaging: CONFIG_PAGING.NO_PAGING,
					isDescending: CONFIG_DESCENDING.NO_DESCENDING,
					typeFind: CONFIG_TYPE_FIND.DROPDOWN,
					status: CONFIG_STATUS.HOAT_DONG,
					provinceIDOwer: '',
					regencyUuidExclude: '',
				}),
			}),
		select(data) {
			return data;
		},
		enabled: listRegency.isSuccess,
	});

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.left}>
					<h4>Thêm Nhân viên</h4>
					<p>Điền đầy đủ các thông tin Nhân viên</p>
				</div>
				<div className={styles.right}>
					<Button href={PATH.NhanVien} p_10_24 rounded_2 grey_outline>
						Hủy bỏ
					</Button>
					<Button p_10_24 rounded_2 primary>
						Lưu lại
					</Button>
				</div>
			</div>

			<div className={styles.form}>
				<Form form={form} setForm={setForm}>
					<div className={clsx('col_2')}>
						<Input
							name='fullName'
							value={form.fullName || ''}
							label={
								<span>
									Họ và tên <span style={{color: 'red'}}>*</span>
								</span>
							}
							placeholder='Nhập tên nhân viên'
						/>
						<Select
							isSearch
							name='managerUuid'
							placeholder='Chọn người quản lý'
							value={form?.managerUuid}
							onChange={(e: any) =>
								setForm((prev: any) => ({
									...prev,
									managerUuid: e.target.value,
								}))
							}
							label={<span>Người quản lý</span>}
						>
							{listUserManager?.data?.map((v: any) => (
								<Option key={v?.uuid} value={v?.uuid} title={v?.fullName} />
							))}
						</Select>
					</div>
					<div className={clsx('mt', 'col_2')}>
						<DatePicker
							icon={true}
							label={'Ngày sinh'}
							placeholder='Chọn ngày sinh'
							value={form.birthDay || ''}
							onSetValue={(date) =>
								setForm((prev: any) => ({
									...prev,
									birthDay: date,
								}))
							}
							name='birthDay'
							onClean={true}
						/>
						<div className={styles.gennder}>
							<label>
								Giới tính<span style={{color: 'red'}}>*</span>
							</label>
							<div className={styles.group_radio}>
								<div className={styles.item_radio}>
									<input
										id='male'
										className={styles.input_radio}
										type='radio'
										name='sex'
										value={form.sex}
										checked={form.sex == GENDER.NAM}
										onChange={(e) =>
											setForm((prev: any) => ({
												...prev,
												sex: GENDER.NAM,
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
										name='sex'
										value={form.sex}
										checked={form.sex == GENDER.NU}
										onChange={(e) =>
											setForm((prev: any) => ({
												...prev,
												sex: GENDER.NU,
											}))
										}
									/>
									<label className={styles.input_lable} htmlFor='female'>
										Nữ
									</label>
								</div>
							</div>
						</div>
					</div>

					<div className={clsx('mt', 'col_2')}>
						<div>
							<Input
								name='email'
								value={form.email || ''}
								label={
									<span>
										Email<span style={{color: 'red'}}>*</span>
									</span>
								}
								placeholder='Nhập Email'
							/>
						</div>
						<div>
							<Input
								name='phoneNumber'
								value={form.phoneNumber || ''}
								label={
									<span>
										Số điện thoại<span style={{color: 'red'}}>*</span>
									</span>
								}
								placeholder='Nhập số điện thoại'
							/>
						</div>
					</div>

					<div className={clsx('mt', 'col_2')}>
						<div>
							<Select
								isSearch
								name='regencyUuid'
								placeholder='Chọn chức vụ'
								value={form?.regencyUuid}
								onChange={(e: any) =>
									setForm((prev: any) => ({
										...prev,
										regencyUuid: e.target.value,
									}))
								}
								label={<span>Chức vụ</span>}
							>
								{listRegency?.data?.map((v: any) => (
									<Option key={v?.uuid} value={v?.uuid} title={v?.name} />
								))}
							</Select>
						</div>
						<Select
							isSearch
							name='provinceId'
							value={form.provinceId}
							placeholder='Chọn tỉnh/thành phố'
							label={
								<span>
									Tỉnh/Thành phố<span style={{color: 'red'}}>*</span>
								</span>
							}
						>
							{listProvince?.data?.map((v: any) => (
								<Option
									key={v?.matp}
									value={v?.matp}
									title={v?.name}
									onClick={() =>
										setForm((prev: any) => ({
											...prev,
											provinceId: v?.matp,
											districtId: '',
											townId: '',
										}))
									}
								/>
							))}
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

export default MainCreate;
