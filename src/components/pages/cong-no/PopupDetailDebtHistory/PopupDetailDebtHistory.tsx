import React, {useState} from 'react';
import {PropsPopupDetailDebtHistory} from './interfaces';
import styles from './PopupDetailDebtHistory.module.scss';
import {IoClose} from 'react-icons/io5';
import Image from 'next/image';
import config from '~/constants/images/config';

function PopupDetailDebtHistory({onClose}: PropsPopupDetailDebtHistory) {
	const [keyword, setKeyword] = useState<string>('');

	return (
		<div className={styles.container}>
			<h2 className={styles.title}>Chi tiết thanh toán</h2>
			<table>
				<thead>
					<tr>
						<th className={styles.table_header_left}>
							{/* <p className={styles.text_row1}></p> */}
							Thông tin phiếu
						</th>
						<th className={styles.table_header_right}>
							{/* <p className={styles.text_row2}></p> */}
							Tệp đính kèm
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className={styles.left}>
							<ul className={styles.list_detail}>
								<li>
									<p>Mã phiếu :</p>
									<p>TU06</p>
								</li>
								<li>
									<p>Thanh toán cho :</p>
									<p>Gỗ Tân Mai</p>
								</li>
								<li>
									<p>Phương thức thanh toán :</p>
									<p>Chuyển khoản và tiền mặt</p>
								</li>
								<li>
									<p>Thời gian thanh toán :</p>
									<p>15:48 - 24/03/2024</p>
								</li>
								<li>
									<p>Số người nhận tiền :</p>
									<p>2</p>
								</li>
								<li>
									<p>Dương Minh Anh - KH02:</p>
									<p>200.000.000 </p>
								</li>
								<li>
									<p>Phạm Thị Hương - KH03:</p>
									<p>100.000.000 </p>
								</li>
								<li>
									<p>Tổng số tiền tạm ứng :</p>
									<p style={{color: 'var(--blue)'}}>300.000.000</p>
								</li>
								<li>
									<p>Công nợ phải trả sau thanh toán :</p>
									<p style={{color: 'var(--danger)'}}>-300.000.000</p>
								</li>
							</ul>
						</td>
						<td className={styles.right}>
							<div className={styles.main_slider}>
								<Image
									className={styles.image}
									alt='icon print'
									src={config.image_attach}
									layout='fill'
									objectFit='cover'
								/>
							</div>
						</td>
					</tr>
				</tbody>
			</table>

			{/* <div className={styles.text_corlum}>
				<div className={styles.text_corlum_row_one}>
					<p className={styles.text_row1}>Thông tin phiếu</p>
					<ul className={styles.trst_detail}>
						<tr>
							<td>Mã phiếu :</td>
							<td>TU06</td>
						</tr>
						<tr>
							<td>Thanh toán cho :</td>
							<td>Gỗ Tân Mai</td>
						</tr>
						<tr>
							<td>Phương thức thanh toán :</td>
							<td>Chuyển khoản và tiền mặt</td>
						</tr>
						<tr>
							<td>Thời gian thanh toán :</td>
							<td>15:48 - 24/03/2024</td>
						</tr>
						<tr>
							<td>Số người nhận tiền :</td>
							<td>2</td>
						</tr>
						<tr>
							<td>Dương Minh Anh - KH02:</td>
							<td>200.000.000 </td>
						</tr>
						<tr>
							<td>Phạm Thị Hương - KH03:</td>
							<td>100.000.000 </td>
						</tr>
						<tr>
							<td>Tổng số tiền tạm ứng :</td>
							<td style={{color: 'var(--blue)'}}>300.000.000</td>
						</tr>
						<tr>
							<td>Công nợ phải trả sau thanh toán :</td>
							<td style={{color: 'var(--danger)'}}>-300.000.000</td>
						</tr>
					</ul>
					<table></table>
				</div>
				<div className={styles.text_corlum_row_two}>
					<p className={styles.text_row2}>Tệp đính kèm</p>
				</div>
			</div> */}

			<div className={styles.icon_close} onClick={onClose}>
				<IoClose size={24} color='#23262F' />
			</div>
		</div>
	);
}

export default PopupDetailDebtHistory;
