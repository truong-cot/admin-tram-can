import React, {useState} from 'react';
import icons from '~/constants/images/icons';
import Image from 'next/image';
import {IQualities, PropsMainQualities} from './interfaces';
import styles from './MainQualities.module.scss';
import Search from '~/components/common/Search';
import Button from '~/components/common/Button';
import DataWrapper from '~/components/common/DataWrapper';
import Noti from '~/components/common/DataWrapper/components/Noti';
import Table from '~/components/common/Table';
import Moment from 'react-moment';
import Pagination from '~/components/common/Pagination';
import {useRouter} from 'next/router';
import Popup from '~/components/common/Popup';
import FormCreateQualities from '../FormCreateQualities';
import IconCustom from '~/components/common/IconCustom';
import {LuPencil} from 'react-icons/lu';
import Dialog from '~/components/common/Dialog';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {CONFIG_DESCENDING, CONFIG_PAGING, CONFIG_STATUS, CONFIG_TYPE_FIND, QUERY_KEY} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import wareServices from '~/services/wareServices';
import FilterCustom from '~/components/common/FilterCustom';
import {HiOutlineLockClosed} from 'react-icons/hi';
import TagStatus from '~/components/common/TagStatus';
import Loading from '~/components/common/Loading';
import FormUpdateQualities from '../FormUpdateQualities';

function MainQualities({}: PropsMainQualities) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_page, _pageSize, _keyword, _status} = router.query;

	const [openCreate, setOpenCreate] = useState<boolean>(false);
	const [dataStatus, setDataStatus] = useState<IQualities | null>(null);
	const [dataUpdate, setDataUpdate] = useState<IQualities | null>(null);

	const listQualities = useQuery([QUERY_KEY.table_chat_luong, _page, _pageSize, _keyword, _status], {
		queryFn: () =>
			httpRequest({
				isList: true,
				http: wareServices.listQuality({
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
				msgSuccess:
					dataStatus?.status == CONFIG_STATUS.HOAT_DONG ? 'Khóa chất lượng thành công!' : 'Mở khóa chất lượng thành công!',
				http: wareServices.changeStatusQualities({
					uuid: dataStatus?.uuid!,
					status: dataStatus?.status! == CONFIG_STATUS.HOAT_DONG ? CONFIG_STATUS.BI_KHOA : CONFIG_STATUS.HOAT_DONG,
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				setDataStatus(null);
				queryClient.invalidateQueries([QUERY_KEY.table_chat_luong, _page, _pageSize, _keyword, _status]);
			}
		},
	});

	return (
		<div className={styles.container}>
			<Loading loading={fucnChangeStatus.isLoading} />
			<div className={styles.filter}>
				<div className={styles.main_search}>
					<div className={styles.search}>
						<Search keyName='_keyword' placeholder='Tìm kiếm ' />
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
					<Button
						p_8_16
						w_fit
						rounded_2
						icon={<Image alt='icon add' src={icons.add} width={20} height={20} />}
						onClick={() => setOpenCreate(true)}
					>
						Thêm chất lượng
					</Button>
				</div>
			</div>
			<div className={styles.table}>
				<DataWrapper
					data={listQualities?.data?.items || []}
					loading={listQualities?.isLoading}
					noti={
						<Noti
							titleButton='Thêm chất lượng'
							onClick={() => setOpenCreate(true)}
							des='Hiện tại chưa có chất lượng nào, thêm ngay?'
						/>
					}
				>
					<Table
						data={listQualities?.data?.items || []}
						column={[
							{
								title: 'STT',
								render: (data: IQualities, index: number) => <>{index + 1}</>,
							},
							{
								title: 'Chất lượng',
								render: (data: IQualities) => <>{data?.name || '---'}</>,
							},
							{
								title: 'Mô tả',
								render: (data: IQualities) => <>{data?.description || '---'}</>,
							},
							{
								title: 'Thời gian tạo',
								render: (data: IQualities) => <Moment date={data?.created} format='HH:mm - DD/MM/YYYY'></Moment>,
							},
							{
								title: 'Trạng thái',
								render: (data: IQualities) => <TagStatus status={data.status} />,
							},
							{
								title: 'Tác vụ',
								render: (data: IQualities) => (
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
											tooltip={data.status == CONFIG_STATUS.HOAT_DONG ? 'Khóa chất lượng' : 'Dùng chất lượng'}
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
					total={listQualities?.data?.pagination?.totalCount}
					pageSize={Number(_pageSize) || 20}
					dependencies={[_pageSize, _keyword, _status]}
				/>
			</div>

			<Popup open={openCreate} onClose={() => setOpenCreate(false)}>
				<FormCreateQualities onClose={() => setOpenCreate(false)} />
			</Popup>
			<Popup open={!!dataUpdate} onClose={() => setDataUpdate(null)}>
				<FormUpdateQualities dataUpdateQualities={dataUpdate} onClose={() => setDataUpdate(null)} />
			</Popup>
			<Dialog
				danger
				open={!!dataStatus}
				onClose={() => setDataStatus(null)}
				title={dataStatus?.status == CONFIG_STATUS.HOAT_DONG ? 'Khóa chất lượng' : 'Mở khóa chất lượng'}
				note={
					dataStatus?.status == CONFIG_STATUS.HOAT_DONG
						? 'Bạn có chắc chắn muốn khóa chất lượng này?'
						: 'Bạn có chắc chắn muốn mở khóa chất lượng này?'
				}
				onSubmit={fucnChangeStatus.mutate}
			/>
		</div>
	);
}

export default MainQualities;
