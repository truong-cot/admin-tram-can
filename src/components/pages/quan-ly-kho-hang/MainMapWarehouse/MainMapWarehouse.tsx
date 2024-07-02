import React from 'react';

import {PropsMainMapWarehouse} from './interfaces';

import styles from './MainMapWarehouse.module.scss';
import Button from '~/components/common/Button';
import {PATH} from '~/constants/config';
import {useRouter} from 'next/router';

function MainMapWarehouse({}: PropsMainMapWarehouse) {
	const router = useRouter();

	const {_id} = router.query;

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h4 className={styles.title}>Chi tiết sơ đồ kho Ghềnh Táu</h4>
				<div className={styles.right}>
					<Button href={PATH.QuanLyKhoHang} p_10_24 rounded_2 grey_outline>
						Quay lại
					</Button>
					<Button p_10_24 rounded_2 primary href={`/quan-ly-kho-hang/so-do/chinh-sua?_id=${_id}`}>
						Chỉnh sửa sơ đồ
					</Button>
				</div>
			</div>
		</div>
	);
}

export default MainMapWarehouse;
