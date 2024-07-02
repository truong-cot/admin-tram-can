import React, {useState} from 'react';
import {PropsMainPageAccount} from './interfaces';
import styles from './MainPageAccount.module.scss';
import Search from '~/components/common/Search';
// import FilterCustom from '~/components/common/FilterCustom';
import {PATH} from '~/constants/config';
import Button from '~/components/common/Button';
import DataWrapper from '~/components/common/DataWrapper';
import Noti from '~/components/common/DataWrapper/components/Noti';
import {useRouter} from 'next/router';
import Table from '~/components/common/Table';
import IconCustom from '~/components/common/IconCustom';
import {LuPencil} from 'react-icons/lu';
import Pagination from '~/components/common/Pagination';
import Dialog from '~/components/common/Dialog';
import {Trash} from 'iconsax-react';
import {HiOutlineLockClosed} from 'react-icons/hi';
import Image from 'next/image';
import icons from '~/constants/images/icons';
function MainPageAccount({}: PropsMainPageAccount) {
	const router = useRouter();

	const {_page, _pageSize, _keyword, _manager, _company} = router.query;

	const [openDelete, setOpenDelete] = useState<boolean>(false);
	const [openLock, setOpenLock] = useState<boolean>(false);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.main_search}>
					<div className={styles.search}>
						<Search keyName='_keyword' placeholder='Tìm kiếm theo id, tên' />
					</div>
				</div>

				<div>
					<Button
						href={PATH.ThemMoiTaiKhoan}
						p_8_16
						rounded_2
						icon={<Image alt='icon add' src={icons.add} width={20} height={20} />}
					>
						Thêm người dùng
					</Button>
				</div>
			</div>

			<div className={styles.table}>
				<DataWrapper
					data={[1, 2, 3]}
					loading={false}
					noti={
						<Noti
							titleButton='Thêm người dùng'
							onClick={() => router.push(PATH.ThemMoiCongTy)}
							des='Hiện tại chưa có người dùng nào, thêm ngay?'
						/>
					}
				>
					<Table
						data={[1, 2, 3]}
						column={[
							{
								title: 'STT',
								render: (data: any, index: number) => <>{index + 1}</>,
							},
							{
								title: 'Mã người dùng',
								render: (data: any) => <>42932992</>,
							},
							{
								title: 'Tên người dùng',
								render: (data: any) => <>Công ty gỗ Tân Mai</>,
							},
							{
								title: 'Email',
								render: (data: any) => <>Gotanmai24@gmail.com</>,
							},
							{
								title: 'Số điện thoại',
								render: (data: any) => <>0362250093</>,
							},

							{
								title: 'Chức vụ',
								render: (data: any) => <>Admin</>,
							},
							{
								title: 'Trạng thái',
								render: (data: any) => <span style={{color: data === 'Hoạt động' ? 'blue' : 'red'}}>Đang khóa</span>,
							},
							{
								title: 'Tác vụ',
								render: (data: any) => (
									<div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
										<IconCustom
											lock
											icon={<HiOutlineLockClosed fontSize={20} fontWeight={600} />}
											tooltip='Khóa'
											color='#777E90'
											onClick={() => {
												setOpenLock(true);
											}}
										/>
										<IconCustom
											edit
											icon={<LuPencil fontSize={20} fontWeight={600} />}
											tooltip='Chỉnh sửa'
											color='#777E90'
											href={`/tai-khoan/chinh-sua?_id=${123}`}
										/>

										<IconCustom
											delete
											icon={<Trash size='22' />}
											tooltip='Xóa'
											color='#777E90'
											onClick={() => {
												setOpenDelete(true);
											}}
										/>
									</div>
								),
							},
						]}
					/>
				</DataWrapper>
				<Pagination
					currentPage={Number(_page) || 1}
					total={400}
					pageSize={Number(_pageSize) || 20}
					dependencies={[_pageSize, _keyword, _manager, _company]}
				/>
			</div>
			<Dialog
				warn
				open={openLock}
				onClose={() => setOpenLock(false)}
				title='Khóa tài khoản'
				note='Bạn chắc chắn muốn khóa tài khoản này không?'
				onSubmit={() => setOpenLock(false)}
			/>

			<Dialog
				danger
				open={openDelete}
				onClose={() => setOpenDelete(false)}
				title='Xóa người dùng'
				note='Bạn có chắc chắn muốn xóa người dùng này?'
				onSubmit={() => setOpenDelete(false)}
			/>
		</div>
	);
}

export default MainPageAccount;
