import React, {useState} from 'react';
import Image from 'next/image';
import icons from '~/constants/images/icons';
import {IDetailCompany, PropsDetailCompany} from './interfaces';
import styles from './DetailCompany.module.scss';
import {PATH} from '~/constants/config';
import DataWrapper from '~/components/common/DataWrapper';
import Noti from '~/components/common/DataWrapper/components/Noti';
import {useRouter} from 'next/router';
import Table from '~/components/common/Table';
import {LuPencil} from 'react-icons/lu';
import DetailBox from '~/components/common/DetailBox';
import Link from 'next/link';
import GridColumn from './../../../layouts/GridColumn/GridColumn';
import {IoArrowBackOutline} from 'react-icons/io5';
import clsx from 'clsx';
import {HiOutlineLockClosed} from 'react-icons/hi';
import Button from '~/components/common/Button';
import Dialog from '~/components/common/Dialog';
import Popup from '~/components/common/Popup';
import PopupCreateCustomers from '../PopupCreateCustomers';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import partnerServices from '~/services/partnerServices';
import { httpRequest } from '~/services';
import { QUERY_KEY } from '~/constants/config/enum';

function DeatailCompany({}: PropsDetailCompany) {
	const router = useRouter();
	const queryClient=useQueryClient();
	const {_id,_type}=router.query;
	const [openDelete, setOpenDelete] = useState<boolean>(false);
	const [openCreate, setOpenCreate] = useState<boolean>(false);

	const {data: detailPartner} = useQuery<IDetailCompany>([QUERY_KEY.chi_tiet_cong_ty,_id], {
		queryFn: () =>
			httpRequest({
				http: partnerServices.detailPartner({
					uuid: _id as string,
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!_id,
	});
	return (
		<div>
			<div className={styles.header}>
				<Link href={PATH.CongTy} className={styles.header_title}>
					<IoArrowBackOutline fontSize={20} fontWeight={600} />
					<p>Chi tiết công ty</p>
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
						href={`/cong-ty/chinh-sua?_id=${_id}`}
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
							setOpenDelete(true);
						}}
					>
						Khóa
					</Button>
				</div>
			</div>
			<div>
				<div className={clsx('mt')}>
					<GridColumn col_5>
						<DetailBox name='Công nợ tạm tính' value={200000000} />
						<DetailBox name='Công nợ chuẩn' value={600000000} />
						<DetailBox name='Tổng công nợ' value={80000000} />
						<DetailBox name='Tổn tậm ứng' value={400000} />
						<DetailBox name='Công nợ phải trả' value={-1000000000} />
					</GridColumn>
				</div>

				<div className={clsx('mt')}>
					<GridColumn col_5>
						<DetailBox name='Khách hàng' value={2} link='/chi-tiet-ho-tro' />
						<DetailBox name='Phiếu chưa KCS' value={24} link='/chi-tiet-ho-tro' />
						<DetailBox name='Phiếu đã KCS' value={32} link='/chi-tiet-ho-tro' />
						<DetailBox name='SL tạm ứng' value={4} link='/chi-tiet-ho-tro' />
						<DetailBox name='SLthanh toán' value={5} link='/chi-tiet-ho-tro' />
					</GridColumn>
				</div>
			</div>
			<div className={clsx('mt')}>
				<table className={styles.container}>
					<colgroup>
						<col style={{width: '50%'}} />
						<col style={{width: '50%'}} />
					</colgroup>
					<tr>
						<td>
							<span>Mã công ty: </span>CT01
						</td>
						<td>
							<span>Người quản lý:</span> Trần Việt Hiếu
						</td>
					</tr>
					<tr>
						<td>
							<span>Mã số thuế:</span> 053535189
						</td>
						<td>
							<span>Địa chỉ:</span> SN 37, Xã Dân Quyền huyện Triệu Sơn, Thanh Hóa,Việt Nam{' '}
						</td>
					</tr>
					<tr>
						<td>
							<span>Số điện thoại: </span>0978456789
						</td>
						<td rowSpan={4} className={styles.description}>
							<span>Mô tả:</span>
							Đây là đối tác uy tín và chất lượng mang lại số lượng lớn sản phẩm
						</td>
					</tr>
					{/* <tr>
						<td>
							<span>Email:</span> Gotanmai34@gmail.com
						</td>
					</tr> */}
					<tr>
						<td>
							{' '}
							<span>Ngân hàng:</span> Vietcombank
						</td>
					</tr>
					<tr>
						<td>
							<span>Số tài khoản : </span>09230103001
						</td>
					</tr>
				</table>
			</div>
			<div className={clsx('mt')}>
				<div className={styles.main_table}>
					<h1 className={styles.list_title}>Danh sách khách hàng (02)</h1>
					<div>
						<Button
							onClick={() => setOpenCreate(true)}
							p_8_16
							icon={<Image alt='icon add' src={icons.add} width={20} height={20} />}
							rounded_2
						>
							Thêm khách hàng
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
								titleButton='Thêm khách hàng'
								onClick={() => setOpenCreate(true)}
								des='Hiện tại chưa có khách hàng nào, thêm ngay?'
							/>
						}
					>
						<Table
							data={[-1, 1, 2, 3]}
							column={[
								{
									title: 'Mã KH',
									render: (data: any) => <>KH01</>,
								},
								{
									title: 'Khách hàng',
									render: (data: any) => <>Lý Mạc Sầu</>,
								},
								{
									title: 'Công nợ tạm tính',
									render: (data: any) => <>100.000.000</>,
								},
								{
									title: 'Công nợ chuẩn',
									render: (data: any) => <>300.000.000</>,
								},
								{
									title: 'Tổng công nợ',
									render: (data: any) => <>400.000.000</>,
								},
								{
									title: 'Tồn tạm ứng',
									render: (data: any) => <>200.000.000</>,
								},
								{
									title: 'Tổng công nợ phải trả',
									render: (data: any) => {
										let number = parseInt(data); // Chuyển đổi sang số nguyên
										let color = number < 0 ? 'red' : 'green'; // Chọn màu dựa trên dấu của số

										return <span style={{color}}>{data}</span>;
									},
								},
								{
									title: 'Trạng thái',
									render: (data: any) => <span style={{color: data === 'Hoạt động' ? 'blue' : 'red'}}>Đang khóa</span>,
								},
							]}
						/>
					</DataWrapper>
				</div>
			</div>
			<Dialog
				danger
				open={openDelete}
				onClose={() => setOpenDelete(false)}
				title='Khóa người dùng'
				note='Bạn có chắc chắn muốn khóa người dùng này?'
				onSubmit={() => setOpenDelete(false)}
			/>
			<Popup open={openCreate} onClose={() => setOpenCreate(false)}>
				<PopupCreateCustomers onClose={() => setOpenCreate(false)} />
			</Popup>
		</div>
	);
}

export default DeatailCompany;
