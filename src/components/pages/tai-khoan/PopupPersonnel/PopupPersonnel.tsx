import React, {useState} from 'react';

import {PropsPopupPersonnel} from './interfaces';
import styles from './PopupPersonnel.module.scss';
import {GrSearch} from 'react-icons/gr';
import clsx from 'clsx';
import Button from '~/components/common/Button';
import {IoClose} from 'react-icons/io5';

function PopupPersonnel({onClose}: PropsPopupPersonnel) {
	const [keyword, setKeyword] = useState<string>('');

	return (
		<div className={styles.container}>
			<h4 className={styles.title}>Thêm nhân viên trị trường</h4>
			<p className={styles.des}>Thêm và lựa chọn khácThêm và lựa chọn nhân viên</p>
			<div className={clsx(styles.input)}>
				<div className={styles.icon}>
					<GrSearch color='#3f4752' size={16} />
				</div>
				<input
					type='text'
					name='keyword'
					value={keyword}
					onChange={(e) => setKeyword(e.target.value)}
					placeholder='Tìm kiếm tên nhân viên, mã nhân viên'
				/>
			</div>
			<div className={styles.select_all}>
				<div className={clsx(styles.option, styles.notBorder)}>
					<input id='check_all' type='checkbox' className={styles.checkbox} />
					<label htmlFor='check_all' className={styles.label_check_all}>
						Chọn tất cả
					</label>
				</div>
				<p className={styles.selected}>
					Đã chọn: <span>10</span>
				</p>
			</div>
			<div className={styles.list}>
				{Array(40)
					.fill(40)
					.map((v, i) => (
						<div key={i} className={styles.option}>
							<input id={`check_item_${i}`} type='checkbox' className={styles.checkbox} />
							<label htmlFor={`check_item_${i}`} className={styles.label_check_item}>
								Dương Minh Anh - <span>KH001</span>
							</label>
						</div>
					))}
			</div>
			<div className={styles.control}>
				<div>
					<Button p_8_24 rounded_2 grey_outline onClick={onClose}>
						Hủy bỏ
					</Button>
				</div>
				<div>
					<Button p_8_24 rounded_2 primary>
						Đồng ý
					</Button>
				</div>
			</div>
			<div className={styles.icon_close} onClick={onClose}>
				<IoClose size={24} color='#23262F' />
			</div>
		</div>
	);
}

export default PopupPersonnel;
