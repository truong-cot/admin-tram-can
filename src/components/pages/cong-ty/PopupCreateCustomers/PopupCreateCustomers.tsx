import React, {useState} from 'react';

import {PropsPopupCreateCustomers} from './interfaces';
import styles from './PopupCreateCustomers.module.scss';
import clsx from 'clsx';
import Button from '~/components/common/Button';
import {IoClose} from 'react-icons/io5';
import Form, {Input} from '~/components/common/Form';

import {useQuery} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import customerServices from '~/services/customerServices';
import {CONFIG_DESCENDING, CONFIG_PAGING, CONFIG_TYPE_FIND, QUERY_KEY} from '~/constants/config/enum';
import ButtonSelectMany from '~/components/common/ButtonSelectMany';

function PopupCreateCustomers({onClose}: PropsPopupCreateCustomers) {
	const [listCustomerChecked, setListCustomerChecked] = useState<any[]>([]);
	const [open, setOpen] = useState<boolean>(false);

	const [form, setForm] = useState<any>({
		rangeofvehicle: '',
		Licenseplate: '',
		code: '',
		RFID: '',
		vehiclemass: '',
	});

	// const listCustomer = useQuery([QUERY_KEY.dropdown_khach_hang], {
	// 	queryFn: () =>
	// 		httpRequest({
	// 			isDropdown: true,
	// 			http: customerServices.listCustomer({
	// 				page: 1,
	// 				pageSize: 20,
	// 				keyword: '',
	// 				isPaging: CONFIG_PAGING.NO_PAGING,
	// 				isDescending: CONFIG_DESCENDING.NO_DESCENDING,
	// 				typeFind: CONFIG_TYPE_FIND.DROPDOWN,
	// 				partnerUUid: '',
	// 				userUuid: '',
	// 				status: null,
	// 				typeCus: null,
	// 				provinceId: '',
	// 				specUuid: '',
	// 			}),
	// 		}),
	// 	select(data) {
	// 		return data;
	// 	},
	// });
	return (
		<>
			{!open && (
				<div className={styles.container}>
					<h4 className={styles.title}>Thêm khách hàng</h4>
					<Form form={form} setForm={setForm}>
						<div className={clsx('mt')}>
							<div className={styles.btn}>
								<ButtonSelectMany
									showOverlay={false}
									label={
										<span>
											Khách hàng <span style={{color: 'red'}}>*</span>
										</span>
									}
									placeholder='Chọn khách hàng'
									title='Thêm khách hàng'
									description='Thêm và lựa chọn khách hàng'
									dataList={[]}
									dataChecked={listCustomerChecked}
									setDataChecked={setListCustomerChecked}
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
								Lưu lại
							</Button>
						</div>
					</div>
					<div className={styles.icon_close} onClick={onClose}>
						<IoClose size={24} color='#23262F' />
					</div>
				</div>
			)}
		</>
	);
}

export default PopupCreateCustomers;
