import React, {useState} from 'react';
import {PropsMainOther} from './interfaces';
import styles from './MainOther.module.scss';
import Search from '~/components/common/Search';
import FilterCustom from '~/components/common/FilterCustom';
import {PATH} from '~/constants/config';
import DataWrapper from '~/components/common/DataWrapper';
import Noti from '~/components/common/DataWrapper/components/Noti';
import {useRouter} from 'next/router';
import Table from '~/components/common/Table';
import Pagination from '~/components/common/Pagination';
import clsx from 'clsx';
import DateRangerCustom from '~/components/common/DateRangerCustom';

function MainOther({}: PropsMainOther) {
	const router = useRouter();

	const {_page, _pageSize, _keyword, _time, _dateFrom, _dateTo} = router.query;
	const [openDelete, setOpenDelete] = useState<boolean>(false);
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.main_search}>
					<div className={styles.search}>
						<Search placeholder='Tìm kiếm theo id, tên' keyName='_keyword' />
					</div>
					<div className={styles.filter}>
						<DateRangerCustom />
					</div>
				</div>

				<div></div>
			</div>

			<div className={styles.table}>
				<DataWrapper
					data={[1, 2, 3]}
					loading={false}
					noti={
						<Noti
							titleButton='Thêm công ty'
							onClick={() => router.push(PATH.ThemMoiCongTy)}
							des='Hiện tại chưa có công ty nào, thêm ngay?'
						/>
					}
				>
					<Table
						data={[1, 2, 3]}
						column={[
							{
								title: 'Người thao tác',
								render: (data: any) => <>Dương Minh Minh</>,
							},
							{
								title: 'Hành động',
								render: (data: any) => (
									<p
										className={clsx(styles.text, {
											[styles.create]: false,
											[styles.lock]: false,
											[styles.delete]: true,
										})}
									>
										Khóa tài khoản
									</p>
								),
							},
							{
								title: 'Ghi chú',
								render: (data: any) => <>Nguyễn Văn Cường vừa tạo phiếu cân Nhập </>,
							},
				
							{
								title: 'Thời gian ',
								render: (data: any) => <>20:48:50 - 08/05/2024</>,
							},
						]}
					/>
					<Pagination
						currentPage={Number(_page) || 1}
						total={400}
						pageSize={Number(_pageSize) || 20}
						dependencies={[_pageSize, _keyword, _time, _dateFrom, _dateTo]}
					/>
				</DataWrapper>
			</div>
		</div>
	);
}

export default MainOther;
