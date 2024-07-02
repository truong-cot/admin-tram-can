import React from 'react';
import {PropsMainPageAll} from './interfaces';
import styles from './MainPageAll.module.scss';
import Search from '~/components/common/Search';
import FilterCustom from '~/components/common/FilterCustom';
import DataWrapper from '~/components/common/DataWrapper';
import {useRouter} from 'next/router';
import Table from '~/components/common/Table';
import Pagination from '~/components/common/Pagination';
import DateRangerCustom from '~/components/common/DateRangerCustom';
import clsx from 'clsx';
import Link from 'next/link';
import {PATH} from '~/constants/config';

function MainPageAll({}: PropsMainPageAll) {
	const router = useRouter();

	const {_page, _pageSize, _keyword, _manager, _company, _type} = router.query;

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.main_search}>
					<div className={styles.search}>
						<Search keyName='_keyword' placeholder='Tìm kiếm theo mã lô hàng' />
					</div>
					<div className={styles.filter}>
						<FilterCustom
							isSearch
							name='Khách hàng'
							query='_customer'
							listFilter={[
								{id: 1, name: 'Khách hàng 1'},
								{id: 2, name: 'Khách hàng 2'},
							]}
						/>
					</div>

					<div className={styles.filter}>
						<FilterCustom
							isSearch
							name='Khu vực'
							query='_area'
							listFilter={[
								{id: 1, name: 'Khu vực 1'},
								{id: 2, name: 'Khu vực 2'},
							]}
						/>
					</div>
					<div className={styles.filter}>
						<FilterCustom
							isSearch
							name='NV thị trường '
							query='_market'
							listFilter={[
								{id: 1, name: 'NV thị trường 1'},
								{id: 2, name: 'NV thị trường 2'},
							]}
						/>
					</div>

					<div className={styles.filter}>
						<FilterCustom
							isSearch
							name='Trạng thái '
							query='_status'
							listFilter={[
								{id: 1, name: 'Trạng thái 1'},
								{id: 2, name: 'Trạng thái 2'},
							]}
						/>
					</div>

					<div className={styles.filter}>
						<DateRangerCustom />
					</div>
				</div>
			</div>
			<div className={clsx('mt')}>
				<div className={styles.parameter}>
					<div>
						TỔNG LÔ HÀNG: <span style={{color: '#2D74FF'}}>90</span>
					</div>
					<div>
						TỔNG CÔNG TẠM TÍNH: <span>11.400.000.000</span>
					</div>
					<div>
						TỔNG CÔNG CHUẨN: <span>16.000.000.000</span>
					</div>
				</div>
			</div>

			<div className={styles.table}>
				<DataWrapper data={[1, 2, 3]} loading={false}>
					<Table
						data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
						column={[
							{
								title: 'Mã lô',
								render: (data: any) => <>CT001</>,
							},
							{
								title: 'Trạng thái',
								render: (data: any) => <span style={{color: data === 'Đã KCS' ? 'blue' : 'red'}}>Chưa KCS</span>,
							},

							{
								title: 'Khách hàng',
								render: (data: any) => <>Dương Minh Anh</>,
							},
							{
								title: 'Khu vực',
								render: (data: any) => <>Thái Nguyên</>,
							},
							{
								title: 'NV thị trường',
								render: (data: any) => <>Vũ Ngọc Anh</>,
							},
							{
								title: 'KL hàng(kg)',
								render: (data: any) => <>1.000.000</>,
							},
							{
								title: 'Kho hàng',
								render: (data: any) => <>Kani</>,
							},
							{
								title: 'Giá tiền',
								render: (data: any) => <>50.000</>,
							},
							{
								title: 'Công nợ tạm tính',
								render: (data: any) => <>-</>,
							},
							{
								title: 'Công nợ chuẩn',
								render: (data: any) => <>-</>,
							},
							{
								title: 'Ngày nhập',
								render: (data: any) => <>-</>,
							},
							{
								title: 'Tác vụ',
								render: (data: any) => (
									<Link href={`/cong-no-phieu/${123}`} className={styles.linkdetail}>
										Chi tiết
									</Link>
								),
							},
						]}
					/>
					<Pagination
						currentPage={Number(_page) || 1}
						total={400}
						pageSize={Number(_pageSize) || 20}
						dependencies={[_pageSize, _keyword, _manager, _company]}
					/>
				</DataWrapper>
			</div>
		</div>
	);
}

export default MainPageAll;
