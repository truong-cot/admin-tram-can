import React from 'react';

import {PropsMainWarehouse} from './interfaces';
import styles from './MainWarehouse.module.scss';
import ItemDashboard from '../ItemDashboard';

function MainWarehouse({}: PropsMainWarehouse) {
	return (
		<div className={styles.container}>
			<h5>Kho hàng</h5>
			<p className={styles.text}>Thống kê tổng số lượng hàng hóa trong kho</p>
			<div className={styles.main}>
				<ItemDashboard text='Tổng số hàng tươi (MT)' value={10000000} color='#2DA2BC' />
				<ItemDashboard text='Tống số hàng khô (BDMT)' value={20000000} color='#2CAE39' />
				<ItemDashboard text='Hàng khô tạm tính (BDMT)' value={10000000} color='#2CAE39' />
				<ItemDashboard text='Hàng khô chuẩn (BDMT)' value={20000000} color='#2CAE39' />
			</div>
		</div>
	);
}

export default MainWarehouse;
