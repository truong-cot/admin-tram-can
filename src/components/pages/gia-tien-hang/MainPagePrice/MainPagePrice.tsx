import React, { useState } from 'react';
import Image from 'next/image';
import icons from '~/constants/images/icons';
import { IPriceTag, PropsMainPagePrice } from './interfaces';
import styles from './MainPagePrice.module.scss';
import Search from '~/components/common/Search';
import FilterCustom from '~/components/common/FilterCustom';
import Button from '~/components/common/Button';
import { PATH } from '~/constants/config';
import DataWrapper from '~/components/common/DataWrapper';
import Noti from '~/components/common/DataWrapper/components/Noti';
import Table from '~/components/common/Table';
import { AddCircle, Eye } from 'iconsax-react';
import { LuPencil } from 'react-icons/lu';
import IconCustom from '~/components/common/IconCustom';
import { convertCoin } from '~/common/funcs/convertCoin';
import Popup from '~/components/common/Popup';
import PopupCreatePrice from '../PopupCreatePrice';
import PopupDetailPrice from '../PopupDetailPrice';
import { CONFIG_DESCENDING, CONFIG_PAGING, CONFIG_STATUS, CONFIG_TYPE_FIND, QUERY_KEY, STATUS_CUSTOMER } from '~/constants/config/enum';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import priceTagServices from '~/services/priceTagServices';
import { httpRequest } from '~/services';
import customerServices from '~/services/customerServices';
import wareServices from '~/services/wareServices';
import Loading from '~/components/common/Loading';
import TagStatus from '~/components/common/TagStatus';
import Moment from 'react-moment';
import { HiOutlineLockClosed } from 'react-icons/hi';
import Dialog from '~/components/common/Dialog';

function MainPagePrice({ }: PropsMainPagePrice) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const limitDropdown = 100;

	const { _page, _pageSize, _keyword, _status, _customerUuid, _productId, _specUuidExclude } = router.query;

	const [dataStatus, setDataStatus] = useState<IPriceTag | null>(null);
	const [openCreate, setOpenCreate] = useState<boolean>(false);
	const [openDetail, setOpenDetail] = useState<boolean>(false);
	const [detailPriceData, setDetailPriceData] = useState<IPriceTag | null>(null);

	const listCustomer = useQuery([QUERY_KEY.dropdown_khach_hang], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: customerServices.listCustomer({
					page: 1,
					pageSize: limitDropdown,
					keyword: '',
					isPaging: CONFIG_PAGING.NO_PAGING,
					isDescending: CONFIG_DESCENDING.NO_DESCENDING,
					typeFind: CONFIG_TYPE_FIND.DROPDOWN,
					partnerUUid: '',
					userUuid: '',
					status: STATUS_CUSTOMER.HOP_TAC,
					typeCus: null,
					provinceId: '',
					specUuid: '',
				}),
			}),
		select(data) {
			return data;
		},
	});

	const listSpecifications = useQuery([QUERY_KEY.dropdown_quy_cach], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: wareServices.listSpecification({
					page: 1,
					pageSize: 100,
					keyword: '',
					isPaging: CONFIG_PAGING.NO_PAGING,
					isDescending: CONFIG_DESCENDING.NO_DESCENDING,
					typeFind: CONFIG_TYPE_FIND.DROPDOWN,
					status: CONFIG_STATUS.HOAT_DONG,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const listProductType = useQuery([QUERY_KEY.dropdown_loai_hang], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: wareServices.listProductType({
					page: 1,
					pageSize: 100,
					keyword: '',
					isPaging: CONFIG_PAGING.IS_PAGING,
					isDescending: CONFIG_DESCENDING.NO_DESCENDING,
					typeFind: CONFIG_TYPE_FIND.DROPDOWN,
					status: CONFIG_STATUS.HOAT_DONG,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const listPriceTag = useQuery([QUERY_KEY.table_gia_tien_hang, _page, _pageSize, _productId, _specUuidExclude, _customerUuid, _keyword, _status], {
		queryFn: () =>
			httpRequest({
				isList: true,
				http: priceTagServices.listPriceTag({
					page: Number(_page) || 1,
					pageSize: Number(_pageSize) || 20,
					keyword: (_keyword as string) || '',
					isPaging: CONFIG_PAGING.IS_PAGING,
					isDescending: CONFIG_DESCENDING.NO_DESCENDING,
					typeFind: CONFIG_TYPE_FIND.TABLE,
					status: !!_status ? Number(_status) : null,
					customerUuid: (_customerUuid as string) || '',
					specUuid: (_specUuidExclude as string) || '',
					productTypeUuid: (_productId as string) || '',
					priceTagUuid: ''
				}),
			}),
		select(data) {
			return data;
		},
	});

	const fucnChangeStatus = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: dataStatus?.state == CONFIG_STATUS.HOAT_DONG ? 'Khóa thành công' : 'Mở khóa thành công',
				http: priceTagServices.changeStatus({
					uuid: dataStatus?.uuid!,
					status: dataStatus?.state! == CONFIG_STATUS.HOAT_DONG ? CONFIG_STATUS.BI_KHOA : CONFIG_STATUS.HOAT_DONG,
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				setDataStatus(null);
				queryClient.invalidateQueries([QUERY_KEY.table_xe_hang, _page, _pageSize, _keyword, _status]);
			}
		},
	});

	return (
		<div className={styles.container}>
			{/* <Loading loading={listPriceTag.isLoading} /> */}
			<div className={styles.header}>
				<div className={styles.main_search}>
					<div className={styles.search}>
						<Search keyName='_keyword' placeholder='Tìm kiếm theo loại hàng' />
					</div>
					<div className={styles.filter}>
						<FilterCustom
							isSearch
							name='Khách hàng'
							query='_customerUuid'
							listFilter={listCustomer?.data?.map((v: any) => ({
								id: v?.uuid,
								name: v?.name,
							}))}
						/>
					</div>
					<div className={styles.filter}>
						<FilterCustom
							isSearch
							name='Quy cách'
							query='_specUuidExclude'
							listFilter={listSpecifications?.data?.map((v: any) => ({ id: v?.uuid, name: v?.name }))}
						/>
					</div>
					<div className={styles.filter}>
						<FilterCustom
							isSearch
							name='Loại hàng'
							query='_productId'
							listFilter={listProductType?.data?.map((v: any) => ({ id: v?.uuid, name: v?.name }))}
						/>
					</div>
					<div className={styles.filter}>
						<FilterCustom
							isSearch
							name='Trạng thái'
							query='_status'
							listFilter={[
								{
									id: CONFIG_STATUS.BI_KHOA,
									name: 'Bị khóa',
								},
								{
									id: CONFIG_STATUS.HOAT_DONG,
									name: 'Hoạt động',
								},
							]}
						/>
					</div>
				</div>

				<div>
					<Button p_8_16 rounded_2 href={PATH.ThemGiaTien} icon={<Image alt='icon add' src={icons.add} width={20} height={20} />}>
						Thêm giá tiền
					</Button>
				</div>
			</div>

			<div className={styles.table}>
				<DataWrapper
					data={listPriceTag?.data?.items || []}
					loading={listPriceTag?.isLoading}
					noti={<Noti titleButton='Thêm giá tiền' onClick={() => { }} des='Hiện tại chưa có giá tiền nào, thêm ngay?' />}
				>
					<Table
						data={listPriceTag?.data?.items || []}
						column={[
							{
								title: 'STT',
								render: (data: IPriceTag, index: number) => <>{index + 1}</>,
							},
							{
								title: 'Quy cách',
								render: (data: IPriceTag) => <>{data.specUu.name}</>,
							},
							{
								title: 'Giá tiền',
								render: (data: IPriceTag) => (
									<>{data.priceTagUu === null ? '---' : convertCoin(data.priceTagUu.amount)} đ</>
								),
							},
							{
								title: 'Khách hàng áp dụng',
								render: (data: IPriceTag) => <span style={{ color: '#2A85FF' }}>{data.lstCustomer.length}</span>,
							},
							{
								title: 'Trạng thái',
								render: (data: IPriceTag) => <TagStatus status={data.state} />,
							},
							{
								title: 'Ngày tạo',
								render: (data: IPriceTag) =>
									data.created ? <Moment date={data.created} format='HH:mm - DD/MM/YYYY' /> : '---',
							},
							{
								title: 'Tác vụ',
								render: (data: IPriceTag) => (
									<div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
										<IconCustom
											icon={<Eye fontSize={20} fontWeight={600} />}
											tooltip='Xem chi tiết '
											color='#777E90'
											onClick={() => {
												setDetailPriceData(data);
												setOpenDetail(true);
											}}
										/>

										<IconCustom
											icon={<AddCircle size='22' />}
											tooltip='Thêm khách hàng'
											color='#777E90'
											onClick={() => {
												setDetailPriceData(data);
												setOpenCreate(true);
											}}
										/>
										{/* <IconCustom
											lock
											icon={<HiOutlineLockClosed size='22' />}
											tooltip={data.state === CONFIG_STATUS.HOAT_DONG ? 'Khóa' : ' Mở khóa'}
											color='#777E90'
											onClick={() => setDataStatus(data)}
										/> */}
									</div>
								),
							},
						]}
					/>
				</DataWrapper>
			</div>
			<Dialog
				danger
				open={!!dataStatus}
				onClose={() => setDataStatus(null)}
				title={dataStatus?.status == CONFIG_STATUS.BI_KHOA ? 'Mở khóa giá tiền hàng' : 'Khóa giá tiền hàng'}
				note={
					dataStatus?.status == CONFIG_STATUS.BI_KHOA
						? 'Bạn có chắc chắn muốn mở khóa giá tiền hàng này?'
						: 'Bạn có chắc chắn muốn khóa giá tiền hàng này?'
				}
				onSubmit={fucnChangeStatus.mutate}
			/>

			<Popup open={openDetail} onClose={() => setOpenDetail(false)}>
				{detailPriceData && <PopupDetailPrice data={detailPriceData} onClose={() => setOpenDetail(false)} />}
			</Popup>

			<Popup open={openCreate} onClose={() => setOpenCreate(false)}>
				{detailPriceData && <PopupCreatePrice data={detailPriceData} onClose={() => setOpenCreate(false)} />}
			</Popup>
		</div>
	);
}

export default MainPagePrice;
