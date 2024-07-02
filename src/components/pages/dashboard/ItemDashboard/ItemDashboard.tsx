import React from 'react';

import {PropsItemDashboard} from './interfaces';
import styles from './ItemDashboard.module.scss';
import {convertCoin} from '~/common/funcs/convertCoin';
import Image from 'next/image';
import {BiLoader} from 'react-icons/bi';

function ItemDashboard({text, color, value, icon, isLoading}: PropsItemDashboard) {
	return (
		<div className={styles.container}>
			<p className={styles.title}>{text}</p>
			{isLoading ? (
				<div className={styles.loading}>
					<BiLoader />
				</div>
			) : (
				<p style={{color: color}} className={styles.value}>
					{convertCoin(value)}
				</p>
			)}
			{icon && (
				<div className={styles.icon}>
					<Image src={icon} alt='Anh icon' />
				</div>
			)}
		</div>
	);
}

export default ItemDashboard;
