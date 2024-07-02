import clsx from 'clsx';
import {useRouter} from 'next/router';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import TippyHeadless from '@tippyjs/react/headless';

import {PropsMainUpdateMapWarehouse} from './interfaces';
import styles from './MainUpdateMapWarehouse.module.scss';
import Button from '~/components/common/Button';
import Popup from '~/components/common/Popup';
import FormCreateStorage from '../FormCreateStorage';

function MainUpdateMapWarehouse({}: PropsMainUpdateMapWarehouse) {
	const router = useRouter();

	const array = Array.from({length: 100}, (_, index) => index + 1);

	const render = useMemo(() => {
		return '';
	}, []);

	// const [numberId, setNumberId] = useState<number>(0);
	const [open, setOpen] = useState<boolean>(false);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h4 className={styles.title}>Chỉnh sửa sơ đồ kho Ghềnh Táu</h4>
				<div className={styles.right}>
					<Button p_10_24 rounded_2 grey_outline onClick={() => router.back()}>
						Hủy bỏ
					</Button>
					<Button p_10_24 rounded_2 primary>
						Cập nhật
					</Button>
				</div>
			</div>

			<div className={styles.main}>
				<div className={styles.gird}>
					{array?.map((v) => (
						// <TippyHeadless
						// 	maxWidth={'100%'}
						// 	interactive
						// 	visible={numberId == v}
						// 	placement='top'
						// 	render={() => (
						// 		<div className={styles.btn}>
						// 			<Button p_8_24 rounded_2 primary onClick={() => setOpen(true)}>
						// 				Thêm kho hàng
						// 			</Button>
						// 		</div>
						// 	)}
						// >
						<div key={v} className={clsx(styles.gird_item, {[styles.active]: false})}></div>
						// </TippyHeadless>
					))}
				</div>
			</div>

			{/* POPUP */}
			{/* <Popup open={open} onClose={() => setOpen(false)}>
				<FormCreateStorage numberId={numberId} onClose={() => setOpen(false)} />
			</Popup> */}
		</div>
	);
}

export default MainUpdateMapWarehouse;
