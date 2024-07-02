import clsx from 'clsx';
import {PropsItemProductType} from './interfaces';

import styles from './ItemProductType.module.scss';
import Select, {Option} from '~/components/common/Select';
import {useQuery} from '@tanstack/react-query';
import {CONFIG_DESCENDING, CONFIG_PAGING, CONFIG_STATUS, CONFIG_TYPE_FIND, QUERY_KEY} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import wareServices from '~/services/wareServices';
import {Trash} from 'iconsax-react';
import {memo} from 'react';

function ItemProductType({data, idx, showBtnDelete, handleDeleteRow, handleChangeValue}: PropsItemProductType) {
	const listProductType = useQuery([QUERY_KEY.dropdown_loai_hang], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: wareServices.listProductType({
					page: 1,
					pageSize: 20,
					keyword: '',
					status: CONFIG_STATUS.HOAT_DONG,
					isPaging: CONFIG_PAGING.NO_PAGING,
					isDescending: CONFIG_DESCENDING.NO_DESCENDING,
					typeFind: CONFIG_TYPE_FIND.DROPDOWN,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const listSpecification = useQuery([QUERY_KEY.dropdown_quy_cach], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: wareServices.listSpecification({
					page: 1,
					pageSize: 20,
					keyword: '',
					status: CONFIG_STATUS.HOAT_DONG,
					isPaging: CONFIG_PAGING.NO_PAGING,
					isDescending: CONFIG_DESCENDING.NO_DESCENDING,
					typeFind: CONFIG_TYPE_FIND.DROPDOWN,
				}),
			}),
		select(data) {
			return data;
		},
	});

	return (
		<div className={clsx(styles.quality)}>
			<Select isSearch name='productTypeUuid' value={data?.productTypeUuid} placeholder='Lựa chọn'>
				{listProductType?.data?.map((x: any) => (
					<Option
						key={x?.uuid}
						value={x?.uuid}
						title={x?.name}
						onClick={() => handleChangeValue(idx, 'productTypeUuid', x?.uuid)}
					/>
				))}
			</Select>
			<div>
				<Select isSearch name='specUuid' value={data?.specUuid} placeholder='Lựa chọn'>
					{listSpecification?.data?.map((x: any) => (
						<Option key={x?.uuid} value={x?.uuid} title={x?.name} onClick={() => handleChangeValue(idx, 'specUuid', x?.uuid)} />
					))}
				</Select>
			</div>
			<div className={styles.box_control}>
				<div className={styles.input_price}>
					<input
						id={`status_product_type_${idx}`}
						name='status'
						value={data.status}
						type='checkbox'
						className={styles.input}
						checked={data?.status == 1}
						onChange={() => handleChangeValue(idx, 'status', data?.status == 1 ? 0 : 1)}
					/>
					<label className={styles.label_check_box} htmlFor={`status_product_type_${idx}`}>
						Đang cung cấp
					</label>
				</div>
				{showBtnDelete && (
					<div className={styles.btn_delete} onClick={() => handleDeleteRow(idx)}>
						<Trash />
					</div>
				)}
			</div>
		</div>
	);
}

export default memo(ItemProductType);
