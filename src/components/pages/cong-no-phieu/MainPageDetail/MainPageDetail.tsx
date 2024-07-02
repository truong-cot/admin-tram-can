import React from 'react';
import {PropsMainPageDetail} from './interfaces';
import styles from './MainPageDetail.module.scss';
import Search from '~/components/common/Search';
import {PATH} from '~/constants/config';
import DataWrapper from '~/components/common/DataWrapper';
import {useRouter} from 'next/router';
import Table from '~/components/common/Table';
import Pagination from '~/components/common/Pagination';
import DateRangerCustom from '~/components/common/DateRangerCustom';
import clsx from 'clsx';
import Link from 'next/link';
import {IoArrowBackOutline} from 'react-icons/io5';
import Button from '~/components/common/Button';
import Image from 'next/image';
import icons from '~/constants/images/icons';

function MainPageDetail({}: PropsMainPageDetail) {
	const router = useRouter();

	const {_page, _pageSize, _keyword, _manager, _company, _type} = router.query;

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.headerbutton}>
					<Link href={PATH.CongNoPhieu} className={styles.header_title}>
						<IoArrowBackOutline fontSize={20} fontWeight={600} />
						<p>Chi tiết lô hàng #LH2031</p>
					</Link>
					<div className={styles.list_btn}>
						<Button
							rounded_2
							w_fit
							print
							p_8_16
							bold
							icon={<Image alt='icon print' src={icons.print} width={20} height={20} />}
						>
							in file
						</Button>
						<Button
							rounded_2
							w_fit
							green
							p_8_16
							bold
							icon={<Image alt='icon export' src={icons.export_excel} width={20} height={20} />}
						>
							Xuất excel
						</Button>
					</div>
				</div>
				<div className={styles.main_search}>
					<div className={styles.search}>
						<Search keyName='_keyword' placeholder='Tìm kiếm theo phiếu hàng' />
					</div>

					<div className={styles.filter}>
						<DateRangerCustom />
					</div>
				</div>
			</div>
			<div className={clsx('mt')}>
				<div className={styles.parameter}>
					<div>
						TỔNG CÔNG CHUẨN: <span>1.200.000.000</span>
					</div>
					<div>
						TỔNG CÔNG TẠM TÍNH: <span>0</span>
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

							// {
							// 	title: 'NV thị trường',
							// 	render: (data: any) => <>Vũ Ngọc Anh</>,
							// },
							{
								title: 'KL  hàng(kg)',
								render: (data: any) => <>1.000.000</>,
							},
							{
								title: 'Kho hàng',
								render: (data: any) => <>Kani</>,
							},
							{
								title: 'ĐK tạm tính',
								render: (data: any) => <>-</>,
							},
							{
								title: 'Công nợ tạm tính',
								render: (data: any) => <>-</>,
							},
							{
								title: 'Giá tiền',
								render: (data: any) => <>50.000</>,
							},
							{
								title: 'Đk chuẩn',
								render: (data: any) => <>60%</>,
							},
							{
								title: 'Công nợ chuẩn',
								render: (data: any) => <>80.000.000</>,
							},
							{
								title: 'Ngày nhập',
								render: (data: any) => <>26/03/2024</>,
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

export default MainPageDetail;
