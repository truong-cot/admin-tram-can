import React, {useState} from 'react';
import styles from './PageDebtHistory.module.scss';
import {PropsPageDebtHistory} from './interface';
import Search from '~/components/common/Search';
import FilterCustom from '~/components/common/FilterCustom';
import {PATH} from '~/constants/config';
import DataWrapper from '~/components/common/DataWrapper';
import {useRouter} from 'next/router';
import Table from '~/components/common/Table';
import clsx from 'clsx';
import Popup from '~/components/common/Popup';
import PopupDetailDebtHistory from '../PopupDetailDebtHistory';
import StatePaymentMode from '../StatePaymentMode';
const PageDebtHistory = ({}: PropsPageDebtHistory) => {
	const router = useRouter();
	const {_keyword, _manager, _dateFrom, _dateTo} = router.query;
	const [open, setOpen] = useState<boolean>(false);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.main_search}>
					<div className={styles.search}>
						<Search keyName='_keyword' placeholder='Tìm kiếm theo mã GD' />
					</div>
					<div className={styles.filter}>
						<FilterCustom
							isSearch
							name='Công ty'
							query='_manager'
							listFilter={[
								{id: 1, name: 'Công ty 1'},
								{id: 2, name: 'Công ty 2'},
							]}
						/>
					</div>
					<div className={styles.filter}>
						<FilterCustom
							isSearch
							name='Hình thức'
							query='_manager'
							listFilter={[
								{id: 1, name: 'Hình thức 1'},
								{id: 2, name: 'Hình thức 2'},
							]}
						/>
					</div>
					<div className={styles.filter}>
						<FilterCustom
							isSearch
							name='Hôm nay'
							query='_manager'
							listFilter={[
								{id: 1, name: 'Người tạo 1'},
								{id: 2, name: 'Người tạo 2'},
							]}
						/>
					</div>
				</div>
			</div>

			<div className={styles.table}>
				<DataWrapper data={[1, 2, 3]} loading={false}>
					<Table
						data={[1, 2, 3]}
						column={[
							{
								title: 'STT',
								render: (data: any, index: number) => <>{index + 1}</>,
							},
							{
								title: 'MÃ GD',
								render: (data: any) => <>TH002</>,
							},
							{
								title: 'THỜI GIAN',
								render: (data: any) => <>15:50 - 24/04/2024</>,
							},
							{
								title: 'CÔNG TY/KHÁCH HÀNG',
								render: (data: any) => <>Gỗ Tân Mai</>,
							},
							{
								title: 'HÌNH THỨC',
								render: (data: any) => <StatePaymentMode state={0} />,
							},
							{
								title: 'PHƯƠNG THỨC',
								render: (data: any) => <>Tiền mặt</>,
							},
							{
								title: 'SỐ TIỀN',
								render: (data: any) => <>800.000.000</>,
							},
							{
								title: 'CHI TIẾT',
								render: (data: any) => (
									<div className={styles.select_customers}>
										<div className={styles.icon_add} onClick={() => setOpen(true)}>
											Xem chi tiết
										</div>
									</div>
								),
							},
						]}
					/>
				</DataWrapper>
				<Popup open={open} onClose={() => setOpen(false)}>
					<PopupDetailDebtHistory onClose={() => setOpen(false)} />
				</Popup>
			</div>
		</div>
	);
};

export default PageDebtHistory;
