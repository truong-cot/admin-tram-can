import React from 'react';
import {PropsChartWarehouse} from './interfaces';
import styles from './ChartWarehouse.module.scss';
import GridColumn from '~/components/layouts/GridColumn';
import ItemDashboard from '../../dashboard/ItemDashboard';
import {convertCoin} from '~/common/funcs/convertCoin';
import {Doughnut} from 'react-chartjs-2';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {useQuery} from '@tanstack/react-query';
import {QUERY_KEY} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import warehouseServices from '~/services/warehouseServices';

ChartJS.register(ArcElement, Tooltip, Legend);

function ChartWarehouse({}: PropsChartWarehouse) {
	const data = {
		labels: ['Kani', 'Sunpaper', 'Mishima', 'Liansheng'],
		datasets: [
			{
				label: 'Value',
				data: [12, 19, 3, 5],
				backgroundColor: ['#16DBCC', '#FFBB55', '#4C78FF', '#FF6838'],
				borderColor: '#fff',
				borderWidth: 1,
			},
		],
	};

	const options = {
		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				enabled: true,
			},
			centerText: {
				display: true,
				text: 'Total: ' + data.datasets[0].data.reduce((acc, val) => acc + val),
				font: {
					weight: 'bold',
					size: 16,
				},
				color: '#000',
			},
		},
	};

	const overviewStorage = useQuery([QUERY_KEY.thong_so_kho_hang], {
		queryFn: () =>
			httpRequest({
				http: warehouseServices.overviewStorage({}),
			}),
		select(data) {
			return data;
		},
	});

	return (
		<div className={styles.container}>
			<GridColumn col_2>
				<div className={styles.box}>
					<h5>Tổng quan kho</h5>
					<div className={styles.main}>
						<ItemDashboard
							text='Tổng lượng hàng trong kho'
							isLoading={overviewStorage.isLoading}
							value={overviewStorage?.data?.totalProduction || 0}
							color='#2A85FF'
						/>
						<div className={styles.col_2}>
							<ItemDashboard
								text='KL hàng nhập hôm nay'
								isLoading={overviewStorage.isLoading}
								value={overviewStorage?.data?.sumTotalInToday}
								color='#2CAE39'
							/>
							<ItemDashboard
								text='KL hàng xuất hôm nay'
								isLoading={overviewStorage.isLoading}
								value={overviewStorage?.data?.sumTotalOutToday}
								color='#9757D7'
							/>
						</div>
					</div>
				</div>
				<div className={styles.box_2}>
					<h5>Thống kê chất lượng hàng trong kho</h5>
					<div className={styles.main_chart}>
						<div className={styles.chart}>
							<div style={{height: 190}}>
								<Doughnut data={data} options={options} />
							</div>
							<div className={styles.total_data}>
								<p className={styles.text_total}>Tổng kho</p>
								<p className={styles.value_total}>{convertCoin(100000000)}</p>
							</div>
						</div>
						<div className={styles.data}>
							<div className={styles.item}>
								<div className={styles.left}>
									<div style={{backgroundColor: '#16dbcc'}} className={styles.dot}></div>
									<p>Kani</p>
								</div>
								<p>{convertCoin(125000000)}</p>
							</div>
							<div className={styles.item}>
								<div className={styles.left}>
									<div style={{backgroundColor: '#FFBB55'}} className={styles.dot}></div>
									<p>Sunpaper</p>
								</div>
								<p>{convertCoin(1200000)}</p>
							</div>
							<div className={styles.item}>
								<div className={styles.left}>
									<div style={{backgroundColor: '#4C78FF'}} className={styles.dot}></div>
									<p>Mishima</p>
								</div>
								<p>{convertCoin(0)}</p>
							</div>
							<div className={styles.item}>
								<div className={styles.left}>
									<div style={{backgroundColor: '#FF6838'}} className={styles.dot}></div>
									<p>Liansheng</p>
								</div>
								<p>{convertCoin(300000)}</p>
							</div>
						</div>
					</div>
				</div>
			</GridColumn>
		</div>
	);
}

export default ChartWarehouse;
