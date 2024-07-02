import React from 'react';

import {PropsMainPageWarehouse} from './interfaces';
import styles from './MainPageWarehouse.module.scss';

import ChartWarehouse from '../ChartWarehouse';
import ListWarehouse from '../ListWarehouse';

function MainPageWarehouse({}: PropsMainPageWarehouse) {
	return (
		<div className={styles.container}>
			<ChartWarehouse />
			<ListWarehouse />
		</div>
	);
}

export default MainPageWarehouse;
