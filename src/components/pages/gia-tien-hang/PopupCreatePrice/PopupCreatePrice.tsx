import React, { useState } from 'react';

import { PropsPopupCreatePrice } from './interfaces';
import styles from './PopupCreatePrice.module.scss';
import clsx from 'clsx';
import Button from '~/components/common/Button';
import { IoClose } from 'react-icons/io5';
import Form, { Input } from '~/components/common/Form';

import { useMutation, useQuery } from '@tanstack/react-query';
import { httpRequest } from '~/services';
import customerServices from '~/services/customerServices';
import { CONFIG_DESCENDING, CONFIG_PAGING, CONFIG_STATUS, CONFIG_TYPE_FIND, QUERY_KEY } from '~/constants/config/enum';
import ButtonSelectMany from '~/components/common/ButtonSelectMany';
import { convertCoin } from '~/common/funcs/convertCoin';
import { toastWarn } from '~/common/funcs/toast';
import { useRouter } from 'next/router';
import { PATH } from '~/constants/config';

function PopupCreatePrice({ onClose, data }: PropsPopupCreatePrice) {
	const router = useRouter();
	
	const [listCustomerChecked, setListCustomerChecked] = useState<any[]>(data.lstCustomer);

	const [form, setForm] = useState<any>({
		specUu: data.specUu.name,
		amount: data.priceTagUu === null ? '---' : convertCoin(data.priceTagUu.amount) + " đ",
		product: data.productTypeUu.name,
	});

	const listCustomer = useQuery([QUERY_KEY.dropdown_khach_hang], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: customerServices.listCustomer({
					page: 1,
					pageSize: 20,
					keyword: '',
					isPaging: CONFIG_PAGING.NO_PAGING,
					isDescending: CONFIG_DESCENDING.NO_DESCENDING,
					typeFind: CONFIG_TYPE_FIND.DROPDOWN,
					partnerUUid: '',
					userUuid: '',
					status: null,
					typeCus: null,
					provinceId: '',
					specUuid: '',
				}),
			}),
		select(data) {
			return data;
		},
	});

	const fucnAddSpecification = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Thêm khách hàng vào giá tiền hàng thành công!',
				http: customerServices.addSpecificationToCustomer({
					infoSpec: [
						{
							specUuid: data.specUu.uuid,
							status: CONFIG_STATUS.HOAT_DONG,
							state: CONFIG_STATUS.HOAT_DONG,
							productTypeUuid: data.productTypeUu.uuid,
							priceTagUuid: data.priceTagUu.uuid,
						},
					],
					customerUuid: listCustomerChecked.map((value) => value.uuid),
				}),
			}),
		onSuccess(data) {
			if (data) {
				onClose()
			}
		},
		onError(error) {
			console.log({error});
			return;
		},
	});

	const handleOnSubmit = () => {
		if (listCustomerChecked.length === 0) {
			return toastWarn({msg: 'Vui lòng chọn khách hàng!'});
		}
		return fucnAddSpecification.mutate();
	}

	return (
		<div className={styles.container}>
			<h4 className={styles.title}>Thêm khách hàng</h4>
			<Form form={form} setForm={setForm} onSubmit={handleOnSubmit}>
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
				</div>
				<div className={clsx('mt')}>
					<div className={styles.btn}>
						<ButtonSelectMany
							showOverlay={false}
							label={
								<span>
									Khách hàng áp dụng <span style={{ color: 'red' }}>*</span>
								</span>
							}
							placeholder='Chọn khách hàng'
							title='Thêm khách hàng'
							description='Thêm và lựa chọn khách hàng'
							dataList={listCustomer.data || []}
							dataChecked={listCustomerChecked}
							setDataChecked={setListCustomerChecked}
						/>
					</div>
				</div>
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
			</Form>
		</div>
	);
}

export default PopupCreatePrice;
