import React, {Fragment, useState} from 'react';
import {IUserDetail, PropsDetailMainPage} from './interfaces';
import styles from './DetailMainPage.module.scss';
import Link from 'next/link';
import {IoArrowBackOutline} from 'react-icons/io5';
import {LuPencil} from 'react-icons/lu';
import {PATH} from '~/constants/config';
import {HiOutlineLockClosed} from 'react-icons/hi';
import clsx from 'clsx';
import Table from '~/components/common/Table';
import Button from '~/components/common/Button';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useRouter} from 'next/router';
import {httpRequest} from '~/services';
import userServices from '~/services/userServices';
import {CONFIG_STATUS, GENDER, QUERY_KEY} from '~/constants/config/enum';
import Loading from '~/components/common/Loading';
import Moment from 'react-moment';
import Dialog from '~/components/common/Dialog';
function DetailMainPage({}: PropsDetailMainPage) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_id} = router.query;
	const [dataStatus, setDataStatus] = useState<IUserDetail | null>(null);
	const [data, setData] = useState<IUserDetail>();

	useQuery([QUERY_KEY.chi_tiet_nhan_vien, _id], {
		queryFn: () =>
			httpRequest({
				http: userServices.detailUser({
					uuid: _id as string,
				}),
			}),
		onSuccess(data) {
			setData(data);
		},
		enabled: !!_id,
	});
	const fucnChangeStatus = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: dataStatus?.status == CONFIG_STATUS.HOAT_DONG ? 'Dừng hoạt động thành công' : 'Mở khóa thành công',
				http: userServices.changeStatus({
					uuid: dataStatus?.uuid!,
					status: dataStatus?.status! == CONFIG_STATUS.HOAT_DONG ? CONFIG_STATUS.BI_KHOA : CONFIG_STATUS.HOAT_DONG,
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				setDataStatus(null);
				queryClient.invalidateQueries([QUERY_KEY.chi_tiet_nhan_vien, _id]);
			}
		},
	});
	return (
		<div>
			<Fragment>
				<Loading loading={fucnChangeStatus.isLoading} />
				<div>
					<div className={styles.header}>
						<Link href={PATH.NhanVien} className={styles.header_title}>
							<IoArrowBackOutline fontSize={20} fontWeight={600} />
							<p>{data?.fullName}</p>
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
								icon={<LuPencil color='#23262F' fontSize={16} fontWeight={600} />}
							>
								Chỉnh sửa
							</Button>

							{data?.status == CONFIG_STATUS.HOAT_DONG && (
								<Button
									rounded_2
									w_fit
									p_8_16
									light_outline
									bold
									icon={<HiOutlineLockClosed color='#23262F' fontSize={16} fontWeight={600} />}
									onClick={() => setDataStatus(data)}
								>
									khóa
								</Button>
							)}

							{data?.status == CONFIG_STATUS.BI_KHOA && (
								<Button
									rounded_2
									w_fit
									p_8_16
									light_outline
									bold
									icon={<HiOutlineLockClosed color='#23262F' fontSize={16} fontWeight={600} />}
									onClick={() => setDataStatus(data)}
								>
									Mở khóa
								</Button>
							)}
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
									<span>Mã nhân viên: </span>
									{data?.code}
								</td>
								<td>
									<span>Vai trò: </span> dddd
								</td>
							</tr>
							<tr>
								<td>
									<span>Chức vụ: </span>
									{data?.regencyUuName}
								</td>
								<td>
									<span>Người quản lý: </span>
									{data?.userOwnerUu}
								</td>
							</tr>

							<tr>
								<td>
									<span>Email: </span> <span style={{color: 'var(--primary)'}}>{data?.email}</span>
								</td>
								<td>
									<span>Người tạo:</span> dddd
								</td>
							</tr>
							<tr>
								<td>
									<span>Giới tính: </span> {data?.sex == GENDER.NAM ? 'Nam' : 'Nữ' || '---'}
								</td>
								<td>
									<span>Trạng thái: </span>
									<span style={{color: data?.status == CONFIG_STATUS.HOAT_DONG ? '#2CAE39' : '#EB2E2E'}}>
										{data?.status == CONFIG_STATUS.HOAT_DONG ? 'Hoạt động' : 'Khóa'}
									</span>
								</td>
							</tr>
							<tr>
								<td>
									<span>Số điện thoại: </span>
									{data?.phoneNumber}
								</td>
								<td>
									<span>Tạo lúc:</span> 23/03/2022, 11:15:29
								</td>
							</tr>
							<tr>
								<td>
									<span>Ngày sinh: </span>
									<Moment date={data?.birthDay || '---'} format='DD/MM/YYYY' />
								</td>
								<td>
									<span>Cập nhật cuối:</span>
									23/03/2022, 11:15:29
								</td>
							</tr>
							<tr>
								<td>
									<span>Tỉnh thành quản lý: </span>Hà Nội
								</td>
								<td>
									<span>Ghi chú: </span>
									{data?.description}
								</td>
							</tr>
						</table>
					</div>
					<div>
						<h2 className={clsx('mt', 'mb')}> Danh sách khách hàng quản lý</h2>
						<Table
							data={[1, 2, 3]}
							column={[
								{
									title: 'MÃ KH',
									render: (data: any) => <>KH01</>,
								},
								{
									title: 'Tên khách hàng',
									render: (data: any) => (
										<Link href={`/nhan-vien/123`} className={styles.link}>
											Vũ Đức Minh
										</Link>
									),
								},
								{
									title: 'Thuộc công ty',
									render: (data: any) => <>Công ty Gỗ Tân Mai</>,
								},
								{
									title: 'Khu vực',
									render: (data: any) => <>Hà nội</>,
								},
								{
									title: 'Số điện thoại',
									render: (data: any) => <>0362250093</>,
								},
								{
									title: 'Email',
									render: (data: any) => <>Gotanmai24@gmail.com</>,
								},
								{
									title: 'Ghi chú',
									render: (data: any) => <>Ghi chú</>,
								},
							]}
						/>
					</div>{' '}
				</div>
			</Fragment>
			<Dialog
				danger
				open={!!dataStatus}
				onClose={() => setDataStatus(null)}
				title={dataStatus?.status == CONFIG_STATUS.HOAT_DONG ? 'Khóa hoạt động' : 'Mở khóa hoạt động'}
				note={
					dataStatus?.status == CONFIG_STATUS.HOAT_DONG
						? 'Bạn có chắc chắn muốn khóa hoạt động chức vụ này?'
						: 'Bạn có chắc chắn muốn mở khóa hoạt động chức vụ này?'
				}
				onSubmit={fucnChangeStatus.mutate}
			/>
		</div>
	);
}

export default DetailMainPage;
function setData(data: any) {
	throw new Error('Function not implemented.');
}
