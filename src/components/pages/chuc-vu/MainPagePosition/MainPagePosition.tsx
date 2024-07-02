import React, {useState} from 'react';
import {IPosition, PropsMainPagePosition} from './interfaces';
import styles from './MainPagePosition.module.scss';
import Search from '~/components/common/Search';
import Button from '~/components/common/Button';
import DataWrapper from '~/components/common/DataWrapper';
import Noti from '~/components/common/DataWrapper/components/Noti';
import Table from '~/components/common/Table';
import Moment from 'react-moment';
import IconCustom from '~/components/common/IconCustom';
import {LuPencil} from 'react-icons/lu';
import Pagination from '~/components/common/Pagination';
import {useRouter} from 'next/router';
import Dialog from '~/components/common/Dialog';
import Popup from '~/components/common/Popup';
import FormCreatePosition from '../FormCreatePosition';
import Image from 'next/image';
import icons from '~/constants/images/icons';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import {CONFIG_DESCENDING, CONFIG_PAGING, CONFIG_STATUS, CONFIG_TYPE_FIND, QUERY_KEY} from '~/constants/config/enum';
import regencyServices from '~/services/regencyServices';
import {HiOutlineLockClosed} from 'react-icons/hi';
import FilterCustom from '~/components/common/FilterCustom';
import TagStatus from '~/components/common/TagStatus';
import Loading from '~/components/common/Loading';
import FormUpdatePosition from '../FormUpdatePosition';
function MainPagePosition({}: PropsMainPagePosition) {
	const router = useRouter();

	const queryClient = useQueryClient();

	const {_page, _pageSize, _keyword, _status} = router.query;
	const [dataStatus, setDataStatus] = useState<IPosition | null>(null);

	const [openCreate, setOpenCreate] = useState<boolean>(false);
	const [dataUpdate, setDataUpdate] = useState<IPosition | null>(null);

	const listRegency = useQuery([QUERY_KEY.Table_chuc_vu, _page, _pageSize, _keyword, _status], {
		queryFn: () =>
			httpRequest({
				isList: true,
				http: regencyServices.listRegency({
					page: Number(_page) || 1,
					pageSize: Number(_pageSize) || 20,
					keyword: (_keyword as string) || '',
					isPaging: CONFIG_PAGING.IS_PAGING,
					isDescending: CONFIG_DESCENDING.NO_DESCENDING,
					typeFind: CONFIG_TYPE_FIND.TABLE,
					status: !!_status ? Number(_status) : null,
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
				msgSuccess: dataStatus?.status == CONFIG_STATUS.HOAT_DONG ? 'Dừng hoạt động thành công' : 'Mở khóa thành công',
				http: regencyServices.changeStatus({
					uuid: dataStatus?.uuid!,
					status: dataStatus?.status! == CONFIG_STATUS.HOAT_DONG ? CONFIG_STATUS.BI_KHOA : CONFIG_STATUS.HOAT_DONG,
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				setDataStatus(null);
				queryClient.invalidateQueries([]);
			}
		},
	});

	return (
		<div className={styles.container}>
			<Loading loading={fucnChangeStatus.isLoading} />
			<div className={styles.filter}>
				<div className={styles.header}>
					<div className={styles.main_search}>
						<div className={styles.search}>
							<Search keyName='_keyword' placeholder='Tìm kiếm theo id, tên' />
						</div>
						<div className={styles.filter}>
							<FilterCustom
								isSearch
								name='Trạng thái'
								query='_status'
								listFilter={[
									{
										id: CONFIG_STATUS.HOAT_DONG,
										name: 'Đang hoạt động',
									},
									{
										id: CONFIG_STATUS.BI_KHOA,
										name: 'Bị khóa',
									},
								]}
							/>
						</div>
					</div>
					<div className={styles.btn} onClick={() => setOpenCreate(true)}>
						<Button p_8_16 rounded_2 icon={<Image alt='icon add' src={icons.add} width={20} height={20} />}>
							Thêm chức vụ
						</Button>
					</div>
				</div>
			</div>
			<div className={styles.table}>
				<DataWrapper
					data={listRegency?.data?.items || []}
					loading={listRegency.isLoading}
					noti={
						<Noti
							titleButton='Thêm chức vụ'
							onClick={() => setOpenCreate(true)}
							des='Hiện tại chưa có chức vụ nào, thêm ngay?'
						/>
					}
				>
					<Table
						data={listRegency?.data?.items || []}
						column={[
							{
								title: 'STT',
								render: (data: IPosition, index: number) => <>{index + 1}</>,
							},
							{
								title: 'Tên chức vụ',
								render: (data: IPosition) => <>{data?.name}</>,
							},
							{
								title: 'Ghi chú',
								render: (data: IPosition) => <>{data?.description || '---'}</>,
							},
							{
								title: 'Số lượng',
								render: (data: IPosition) => <>{data?.user.length}</>,
							},
							{
								title: 'Thời gian tạo',
								render: (data: IPosition) =>
									data?.created ? <Moment date={data.created} format='HH:mm - DD/MM/YYYY' /> : '---',
							},

							{
								title: 'Trạng thái',
								render: (data: IPosition) => <TagStatus status={data.status} />,
							},
							{
								title: 'Tác vụ',
								render: (data: IPosition) => (
									<div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
										<IconCustom
											edit
											icon={<LuPencil fontSize={20} fontWeight={600} />}
											tooltip='Chỉnh sửa'
											color='#777E90'
											onClick={() => setDataUpdate(data)}
										/>

										<IconCustom
											lock
											icon={<HiOutlineLockClosed size='22' />}
											tooltip={data.status == CONFIG_STATUS.HOAT_DONG ? 'Khóa' : 'Mở khóa'}
											color='#777E90'
											onClick={() => {
												setDataStatus(data);
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
					total={listRegency?.data?.pagination?.totalCount}
					pageSize={Number(_pageSize) || 20}
					dependencies={[_pageSize, _keyword]}
				/>
			</div>

			<Popup open={openCreate} onClose={() => setOpenCreate(false)}>
				<FormCreatePosition onClose={() => setOpenCreate(false)} />
			</Popup>
			<Popup open={!!dataUpdate} onClose={() => setDataUpdate(null)}>
				<FormUpdatePosition dataUpdate={dataUpdate} onClose={() => setDataUpdate(null)} />
			</Popup>

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

export default MainPagePosition;
