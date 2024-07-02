import React from 'react';

import {PropsMainDashboard} from './interfaces';
import styles from './MainDashboard.module.scss';
import GridColumn from '~/components/layouts/GridColumn';
import MainWarehouse from '../MainWarehouse';
import MainDebt from '../MainDebt';
import DataWrapper from '~/components/common/DataWrapper';
import Noti from '~/components/common/DataWrapper/components/Noti';
import Table from '~/components/common/Table';
import {convertCoin} from '~/common/funcs/convertCoin';

function MainDashboard({}: PropsMainDashboard) {
	return (
		<div className={styles.container}>
			<GridColumn col_2>
				<MainWarehouse />
				<MainDebt />
			</GridColumn>
			<div className={styles.main}>
				<h4 className={styles.title}>Danh sách khách hàng</h4>
				<DataWrapper data={[1, 2, 3]} loading={false} noti={<Noti disableButton des='Hiện tại chưa có khách hàng nào!' />}>
					<Table
						data={[1, 2, 3]}
						column={[
							{
								title: 'Mã KH',
								render: (data: any) => <>00023</>,
							},
							{
								title: 'Tên khách hàng',
								render: (data: any) => <>Mai Anh Tới</>,
							},
							{
								title: 'Công ty',
								render: (data: any) => <>Công ty Gỗ Tân Mai</>,
							},
							{
								title: 'Email',
								render: (data: any) => <>maianhbe@gmail.com</>,
							},
							{
								title: 'Số điện thoại',
								render: (data: any) => <>0362250093</>,
							},
							{
								title: 'Loại hàng',
								render: (data: any) => <>Kasimi</>,
							},
							{
								title: 'Giá mua hàng',
								render: (data: any) => <>{convertCoin(1250000)}đ</>,
							},
						]}
					/>
				</DataWrapper>
			</div>
		</div>
	);
}

export default MainDashboard;
