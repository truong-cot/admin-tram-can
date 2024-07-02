import {PropsMainDetailCustomer} from './interfaces';
import styles from './MainDetailCustomer.module.scss';
import React, {useState} from 'react';
import {useRouter} from 'next/router';
import {IoArrowBackOutline} from 'react-icons/io5';
import {PATH} from '~/constants/config';
import {LuPencil} from 'react-icons/lu';
import {HiDotsHorizontal, HiOutlineLockClosed} from 'react-icons/hi';
import Link from 'next/link';
import GridColumn from '~/components/layouts/GridColumn';
import clsx from 'clsx';
import DetailBox from '~/components/common/DetailBox';
import DataWrapper from '~/components/common/DataWrapper';
import Table from '~/components/common/Table';
import Noti from '~/components/common/DataWrapper/components/Noti';
import Button from '~/components/common/Button';
import {convertCoin} from '~/common/funcs/convertCoin';
import Dialog from '~/components/common/Dialog';
import Popup from '~/components/common/Popup';
import Image from 'next/image';
import icons from '~/constants/images/icons';
import PopupAddPrice from '../PopupAddPrice/PopupAddPrice';
const MainDetailCustomer = ({}: PropsMainDetailCustomer) => {
	const router = useRouter();
	const [openLock, setOpenLock] = useState<boolean>(false);
	const [openCreate, setOpenCreate] = useState<boolean>(false);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<Link href={PATH.KhachHang} className={styles.header_title}>
					<IoArrowBackOutline fontSize={20} fontWeight={600} />
					<p>Vũ Đức Minh</p>
				</Link>

				<div className={styles.list_btn}>
					<Button rounded_2 w_fit green p_8_16 bold>
						Hoạt động
					</Button>
					<Button
						rounded_2
						w_fit
						light_outline
						p_8_16
						bold
						href={`/cong-ty/chinh-sua?_id=${123}`}
						icon={<LuPencil color='#23262F' fontSize={16} fontWeight={600} />}
					>
						Chỉnh sửa
					</Button>
					<Button
						rounded_2
						w_fit
						light_outline
						p_8_16
						bold
						icon={<HiOutlineLockClosed color='#23262F' fontSize={16} fontWeight={600} />}
						onClick={() => {
							setOpenLock(true);
						}}
					>
						Khóa
					</Button>
				</div>
			</div>
			<div>
				<div className={clsx('mt')}>
					<GridColumn col_5>
						<DetailBox name={'Công nợ tạm tính'} value={200000000} />
						<DetailBox name={'Công nợ chuẩn'} value={200000000} />
						<DetailBox name={'Tổng công nợ'} value={200000000} />
						<DetailBox name={'Tồn tạm ứng'} value={200000000} />
						<DetailBox name={'Công nợ phải trả'} value={-200000000} />
					</GridColumn>
				</div>
				<div className={clsx('mt')}>
					<GridColumn col_4>
						<DetailBox name={'Phiếu chưa KCS'} isConvert={false} value={24} link='/chi-tiet-ho-tro' />
						<DetailBox name={'Phiếu đã KCS'} isConvert={false} value={32} link='/chi-tiet-ho-tro' />
						<DetailBox name={'Số lần tạm ứng'} isConvert={false} value={4} link='/chi-tiet-ho-tro' />
						<DetailBox name={'Số lần thanh toán'} isConvert={false} value={5} link='/chi-tiet-ho-tro' />
					</GridColumn>
				</div>
			</div>
			<div className={clsx('mt')}>
				<table className={styles.container_table}>
					<colgroup>
						<col style={{width: '50%'}} />
						<col style={{width: '50%'}} />
					</colgroup>
					<tr>
						<td>
							<span>Mã khách hàng: </span>KH01
						</td>
						<td>
							<span>Thuộc công ty: </span> Gỗ Tân Mai
						</td>
					</tr>
					<tr>
						<td>
							<span>Mã số thuế: </span>053535189
						</td>
						<td>
							<span>Người quản lý:</span> Trần Việt Hiếu
						</td>
					</tr>
					<tr>
						<td>
							<span>Số điện thoại: </span>0978456789
						</td>
						<td>
							<span>Địa chỉ:</span> SN 37, Xã Dân Quyền huyện Triệu Sơn, Thanh Hóa,Việt Nam
						</td>
					</tr>
					<tr>
						<td>
							<span>Email:</span> <span style={{color: 'var(--primary)'}}> Lymacsau23@gmail.com</span>
						</td>
						<td rowSpan={3} className={styles.description}>
							<span>Mô tả:</span>
							Đây là đối tác uy tín và chất lượng mang lại số lượng lớn sản phẩm
						</td>
					</tr>
					<tr>
						<td>
							{' '}
							<span>Ngân hàng:</span> Vietcombank
						</td>
					</tr>
					<tr>
						<td>
							<span>Số tài khoản : </span>0293992412
						</td>
					</tr>
				</table>
			</div>
			<div className={clsx('mt')}>
				<div className={styles.main_table}>
					<h1 className={styles.list_title}>Danh sách hàng hóa</h1>
					<div>
						<Button
							p_8_16
							icon={<Image alt='icon add' src={icons.add} width={20} height={20} />}
							rounded_2
							onClick={() => setOpenCreate(true)}
						>
							Thêm giá tiền
						</Button>
					</div>
				</div>
			</div>

			<div className={clsx('mt')}>
				<div className={styles.table}>
					<DataWrapper
						data={[1, 2, 3]}
						loading={false}
						noti={
							<Noti
								titleButton='Thêm giá tiền'
								onClick={() => setOpenCreate(true)}
								des='Hiện tại chưa có giá tiền nào, thêm ngay?'
							/>
						}
					>
						<Table
							data={[-1, 1, 2, 3]}
							column={[
								{
									title: 'Chất lượng',
									render: (data: any) => <>Kani</>,
								},
								{
									title: 'Phân loại',
									render: (data: any) => <>Chưa sàng</>,
								},
								{
									title: 'Giá tiền',
									render: (data: any) => <p style={{color: '#3772FF'}}>{convertCoin(59000)}</p>,
								},
								{
									title: 'Thời gian tạo',
									render: (data: any) => <>10:50 - 24/03/2024</>,
								},
								{
									title: 'Giá tiền Gần nhất',
									render: (data: any) => (
										<>
											<span style={{color: '#3772FF'}}>{convertCoin(59000)}</span>-10:50 - 24/03/2024{' '}
										</>
									),
								},
							]}
						/>
					</DataWrapper>
				</div>
			</div>
			<Dialog
				danger
				open={openLock}
				onClose={() => setOpenLock(false)}
				title='Khóa người dùng'
				note='Bạn có chắc chắn muốn khóa người dùng này?'
				onSubmit={() => setOpenLock(false)}
			/>
			<Popup open={openCreate} onClose={() => setOpenCreate(false)}>
				<PopupAddPrice onClose={() => setOpenCreate(false)} />
			</Popup>
		</div>
	);
};

export default MainDetailCustomer;
