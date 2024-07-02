import React, {useState} from 'react';

import {IDetailStorage, PropsDetailStorage} from './interfaces';
import styles from './DetailStorage.module.scss';
import Link from 'next/link';
import {PATH} from '~/constants/config';
import {IoArrowBackOutline} from 'react-icons/io5';
import Button from '~/components/common/Button';
import {LuPencil} from 'react-icons/lu';
import {HiOutlineLockClosed, HiOutlineLockOpen} from 'react-icons/hi';
import GridColumn from '~/components/layouts/GridColumn';
import DetailBox from '~/components/common/DetailBox';
import TabNavLink from '~/components/common/TabNavLink';
import {useRouter} from 'next/router';
import TableCustomer from './components/TableCustommer';
import TableHistoryStorage from './components/TableHistoryStorage';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {CONFIG_STATUS, QUERY_KEY} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import storageServices from '~/services/storageServices';
import Moment from 'react-moment';
import Dialog from '~/components/common/Dialog';
import Loading from '~/components/common/Loading';
import Popup from '~/components/common/Popup';
import FormUpdateStorage from './components/FormUpdateStorage';

function DetailStorage({}: PropsDetailStorage) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_id, _type} = router.query;

	const [totalCustomer, setTotalCustomer] = useState<number>(0);
	const [openChangeStatus, setOpenChangeStatus] = useState<boolean>(false);
	const [openUpdateStorage, setOpenUpdateStorage] = useState<boolean>(false);

	const {data: detailStorage} = useQuery<IDetailStorage>([QUERY_KEY.chi_tiet_kho_hang_con, _id], {
		queryFn: () =>
			httpRequest({
				http: storageServices.detailStorage({
					uuid: _id as string,
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!_id,
	});

	const fucnChangeStatusStorage = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: detailStorage?.status == CONFIG_STATUS.HOAT_DONG ? 'Khóa kho hàng thành công!' : 'Mở khóa kho hàng thành công!',
				http: storageServices.changeStatusStorage({
					uuid: detailStorage?.uuid!,
					status: detailStorage?.status! == CONFIG_STATUS.HOAT_DONG ? CONFIG_STATUS.BI_KHOA : CONFIG_STATUS.HOAT_DONG,
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				setOpenChangeStatus(false);
				queryClient.invalidateQueries([QUERY_KEY.chi_tiet_kho_hang_con, _id]);
			}
		},
	});

	return (
		<div className={styles.container}>
			<Loading loading={fucnChangeStatusStorage.isLoading} />
			<div className={styles.header}>
				<Link href={PATH.QuanLyKhoHang} className={styles.header_title}>
					<IoArrowBackOutline fontSize={20} fontWeight={600} />
					<p>Chi tiết kho {detailStorage?.name}</p>
				</Link>

				<div className={styles.list_btn}>
					<Button
						rounded_2
						w_fit
						light_outline
						p_8_16
						bold
						icon={<LuPencil color='#23262F' fontSize={16} fontWeight={600} />}
						onClick={() => setOpenUpdateStorage(true)}
					>
						Chỉnh sửa
					</Button>
					<Button
						rounded_2
						w_fit
						light_outline
						p_8_16
						bold
						icon={
							detailStorage?.status == CONFIG_STATUS.HOAT_DONG ? (
								<HiOutlineLockClosed color='#23262F' fontSize={16} fontWeight={600} />
							) : (
								<HiOutlineLockOpen color='#23262F' fontSize={16} fontWeight={600} />
							)
						}
						onClick={() => setOpenChangeStatus(true)}
					>
						{detailStorage?.status == CONFIG_STATUS.HOAT_DONG ? 'Khóa' : 'Mở khóa'}
					</Button>
				</div>
			</div>
			<div className={'mt'}>
				<GridColumn col_4>
					<DetailBox name={'Tổng lượng hàng'} value={Number(detailStorage?.amountMt) + Number(detailStorage?.amountBdmt)} />
					<DetailBox name={'Khối lượng nhập'} value={Number(detailStorage?.amountIn)} />
					<DetailBox name={'Khối lượng xuất'} value={Number(detailStorage?.amountOut)} />
					<DetailBox
						name={'Khối lượng chuyển kho'}
						value={Number(detailStorage?.amountChangeIn) - Number(detailStorage?.amountChangeOut)}
					/>
				</GridColumn>
			</div>
			<div className={'mt'}>
				<table className={styles.container_table}>
					<colgroup>
						<col style={{width: '50%'}} />
						<col style={{width: '50%'}} />
					</colgroup>
					<tr>
						<td>
							<span>Mã kho hàng: </span>
							<span style={{marginLeft: '6px'}}>{detailStorage?.code || '---'}</span>
						</td>
						<td>
							<span>Người tạo: </span>
							<span style={{marginLeft: '6px'}}>{detailStorage?.code || '---'}</span>
						</td>
					</tr>
					<tr>
						<td>
							<span>Tên kho hàng: </span>
							<span style={{marginLeft: '6px'}}>{detailStorage?.name || '---'}</span>
						</td>
						<td>
							<span>Thời gian tạo:</span>
							<span style={{marginLeft: '6px'}}>
								<Moment date={detailStorage?.created} format='HH:mm, DD/MM/YYYY' />
							</span>
						</td>
					</tr>
					<tr>
						<td>
							<span>Thuộc kho to: </span>
							<span style={{marginLeft: '6px'}}>{detailStorage?.warehouseUu?.name || '---'}</span>
						</td>
						<td>
							<span>Chỉnh sửa gần nhất:</span>
							<span style={{marginLeft: '6px'}}>
								<Moment date={detailStorage?.updatedTime} format='HH:mm, DD/MM/YYYY' />
							</span>
						</td>
					</tr>
					<tr>
						<td>
							<span>Tổng khách hàng:</span>
							<span style={{marginLeft: '6px'}}>{totalCustomer}</span>
						</td>
						<td rowSpan={2} className={styles.description}>
							<span>Mô tả:</span>
							<span style={{marginLeft: '6px'}}>{detailStorage?.description || '---'}</span>
						</td>
					</tr>
				</table>
			</div>
			<div className={'mt'}>
				<TabNavLink
					query='_type'
					listHref={[
						{
							pathname: router.pathname,
							query: null,
							title: 'Danh sách khách hàng',
						},
						{
							pathname: router.pathname,
							query: 'history',
							title: 'Lịch sử kho hàng',
						},
					]}
				/>
			</div>
			<div className={'mt'}>
				{!_type && <TableCustomer setTotalCustomer={setTotalCustomer} />}
				{_type == 'history' && <TableHistoryStorage />}
			</div>

			<Dialog
				danger
				open={openChangeStatus}
				onClose={() => setOpenChangeStatus(false)}
				title={detailStorage?.status == CONFIG_STATUS.HOAT_DONG ? 'Khóa kho hàng' : 'Mở khóa kho hàng'}
				note={
					detailStorage?.status == CONFIG_STATUS.HOAT_DONG
						? 'Bạn có chắc chắn muốn khóa kho hàng này?'
						: 'Bạn có chắc chắn muốn mở khóa kho hàng này?'
				}
				onSubmit={fucnChangeStatusStorage.mutate}
			/>
			<Popup open={openUpdateStorage} onClose={() => setOpenUpdateStorage(false)}>
				<FormUpdateStorage dataUpdate={detailStorage} onClose={() => setOpenUpdateStorage(false)} />
			</Popup>
		</div>
	);
}

export default DetailStorage;
