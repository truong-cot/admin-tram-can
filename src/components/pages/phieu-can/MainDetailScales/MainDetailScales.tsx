import React from 'react';
import {PropsMainDetailScales} from './interfaces';
import styles from './MainDetailScales.module.scss';
import TabNavLink from '~/components/common/TabNavLink';
import {PATH} from '~/constants/config';
import {useRouter} from 'next/router';
import TableDetail from './components/TableDetail';
import Link from 'next/link';
import {IoArrowBackOutline} from 'react-icons/io5';
import clsx from 'clsx';
import TableHistory from './components/TableHistory';

function MainDetailScales({}: PropsMainDetailScales) {
	const router = useRouter();
	const {_type} = router.query;

	return (
		<div className={styles.container}>
			<Link href={PATH.PhieuAllDaCan} className={styles.header_title}>
				<IoArrowBackOutline fontSize={20} fontWeight={600} />
				<p>Chi tiết phiếu hàng cân</p>
			</Link>
			<div className={clsx('mt')}>
				<TabNavLink
					outline
					query='_type'
					listHref={[
						{
							pathname: router.pathname,
							query: null,
							title: 'Chi tiết đơn hàng',
						},
						{
							pathname: router.pathname,
							query: 'lich-su',
							title: 'Lịch sử đơn hàng',
						},
					]}
				/>
			</div>

			<div className='mt'>
				{!_type && <TableDetail />}
				{_type == 'lich-su' && <TableHistory />}
			</div>
		</div>
	);
}

export default MainDetailScales;
