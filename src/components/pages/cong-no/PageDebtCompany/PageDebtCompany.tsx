import React from 'react';
import styles from './PageDebtCompany.module.scss';
import {PropsPageDebtCompany} from './interface';
import Search from '~/components/common/Search';
import DataWrapper from '~/components/common/DataWrapper';
import Table from '~/components/common/Table';
import {useRouter} from 'next/router';
import MoneyDebt from '../MoneyDebt';
const PageDebtCompany = ({}: PropsPageDebtCompany) => {
	const router = useRouter();
	const {_keyword, _manager, _dateFrom, _dateTo} = router.query;

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.main_search}>
					<div className={styles.search}>
						<Search keyName='_keyword' placeholder='Tìm kiếm công ty' />
					</div>
				</div>
			</div>

			<div className={styles.table}>
				<DataWrapper data={[1, 2, 3]} loading={false}>
					<Table
						data={[1, 2, 3]}
						column={[
							{
								title: 'MÃ CTY',
								render: (data: any) => <>CT01</>,
							},
							{
								title: 'Công ty',
								render: (data: any) => <>Gỗ Tân Mai</>,
							},
							{
								title: 'Số KH',
								render: (data: any) => <>2</>,
							},
							{
								title: 'Công nợ tạm tính',
								render: (data: any) => <>24.000</>,
							},
							{
								title: 'Công nợ chuẩn',
								render: (data: any) => <>600.000.000</>,
							},
							{
								title: 'tổng công nợ',
								render: (data: any) => <>0</>,
							},
							{
								title: 'tồn tạm ứng',
								render: (data: any) => <>400.000.000</>,
							},
							{
								title: 'Công nợ phải trả',
								render: (data: any) => <MoneyDebt value={-1200000000} />,
							},
							{
								title: 'Thanh toán gần nhất',
								render: (data: any) => (
									<p style={{display: 'flex', flexDirection: 'column'}}>
										<span>10:50 - 24/03/2024</span>
										<MoneyDebt value={200000000} />
									</p>
								),
							},
						]}
					/>
				</DataWrapper>
			</div>
		</div>
	);
};

export default PageDebtCompany;
