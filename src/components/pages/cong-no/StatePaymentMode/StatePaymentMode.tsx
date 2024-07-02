import {PropsStatePaymentMode} from './interfaces';
import styles from './StatePaymentMode.module.scss';
import {STATUS_DEBT} from '~/constants/config/enum';
import icons from '~/constants/images/icons';
import Image from 'next/image';

function StatePaymentMode({state = STATUS_DEBT.THANH_TOAN}: PropsStatePaymentMode) {
	const textColor = state == STATUS_DEBT.THANH_TOAN ? styles.greenText : styles.orangeText;
	const Icon =
		state == STATUS_DEBT.THANH_TOAN
			? () => <Image src={icons.dollarCircle} alt='Dollar Circle' />
			: () => <Image src={icons.moneyRecive} alt='Money Recive' />;

	return (
		<div className={`${styles.statusContainer} ${textColor}`}>
			<Icon />
			{state == STATUS_DEBT.THANH_TOAN ? 'Thanh toán' : 'Tạm ứng'}
		</div>
	);
}

export default StatePaymentMode;
