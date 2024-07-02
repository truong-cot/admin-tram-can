import {useQuery} from '@tanstack/react-query';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {useState} from 'react';
import Button from '~/components/common/Button';
import DataWrapper from '~/components/common/DataWrapper';
import Noti from '~/components/common/DataWrapper/components/Noti';
import DateRangerCustom from '~/components/common/DateRangerCustom';
import FilterCustom from '~/components/common/FilterCustom';
import Pagination from '~/components/common/Pagination';
import Search from '~/components/common/Search';
import {CONFIG_DESCENDING, CONFIG_PAGING, CONFIG_STATUS, CONFIG_TYPE_FIND, QUERY_KEY} from '~/constants/config/enum';
import icons from '~/constants/images/icons';
import {httpRequest} from '~/services';
import warehouseServices from '~/services/warehouseServices';
import ItemWarehouse from '../ItemWarehouse';
import styles from './ListWarehouse.module.scss';
import {PropsListWarehouse} from './interfaces';

function ListWarehouse({}: PropsListWarehouse) {
	const router = useRouter();

	const {_page, _pageSize, _keyword, _status, _dateFrom, _dateTo} = router.query;

	const [listWarehouse, setListWarehouse] = useState<any[]>([]);
	const [totalCount, setTotalCount] = useState<number>(0);
	const [loading, setLoading] = useState<boolean>(false);

	useQuery([QUERY_KEY.table_kho_hang_chinh, _page, _pageSize, _keyword, _status, _dateFrom, _dateTo], {
		queryFn: () =>
			httpRequest({
				isList: true,
				setLoading: setLoading,
				http: warehouseServices.listWarehouse({
					page: Number(_page) || 1,
					pageSize: Number(_pageSize) || 20,
					keyword: (_keyword as string) || '',
					isPaging: CONFIG_PAGING.IS_PAGING,
					isDescending: CONFIG_DESCENDING.NO_DESCENDING,
					typeFind: CONFIG_TYPE_FIND.TABLE,
					status: !!_status ? Number(_status) : null,
					customerUuid: '',
					timeEnd: _dateFrom ? (_dateFrom as string) : null,
					timeStart: _dateTo ? (_dateTo as string) : null,
				}),
			}),
		onSuccess(data) {
			const dataConvert = data?.items?.map((item: any) => {
				const totalAmountMt = item?.storage.reduce((sum: number, storageItem: any) => sum + storageItem.amountMt, 0);
				const totalAmountBdmt = item?.storage.reduce((sum: number, storageItem: any) => sum + storageItem.amountBdmt, 0);
				const totalAmountIn = item?.storage.reduce((sum: number, storageItem: any) => sum + storageItem.amountIn, 0);
				const totalAmountOut = item?.storage.reduce((sum: number, storageItem: any) => sum + storageItem.amountOut, 0);

				return {
					...item,
					amountMt: totalAmountMt,
					amountBdmt: totalAmountBdmt,
					amountIn: totalAmountIn,
					amountOut: totalAmountOut,
				};
			});

			setTotalCount(data?.pagination?.totalCount);
			setListWarehouse(dataConvert);
		},
	});

	return (
		<div className={styles.container}>
			<h4>Danh sách kho hàng</h4>
			<div className={styles.head}>
				<div className={styles.main_search}>
					<div className={styles.search}>
						<Search keyName='_keyword' placeholder='Tìm kiếm theo tên kho' />
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
					<div className={styles.filter}>
						<DateRangerCustom titleTime='Thời gian' />
					</div>
				</div>

				<div className={styles.btn}>
					<Button
						p_8_16
						rounded_2
						icon={<Image alt='icon add' src={icons.add} width={20} height={20} />}
						href={'/quan-ly-kho-hang/them-moi'}
					>
						Thêm kho hàng
					</Button>
				</div>
			</div>
			<div className={styles.table}>
				<DataWrapper
					data={listWarehouse || []}
					loading={loading}
					noti={
						<Noti
							titleButton='Thêm kho hàng'
							des='Hiện tại chưa có kho hàng nào, thêm ngay?'
							onClick={() => router.push('/quan-ly-kho-hang/them-moi')}
						/>
					}
				>
					<div className={styles.table_dropdow}>
						<div className={styles.table_head}>
							<div style={{width: '44px', paddingRight: '16px'}}></div>
							<p style={{width: '44px', paddingRight: '16px'}}>STT</p>
							<p style={{width: '120px', paddingRight: '16px'}}>Mã kho</p>
							<p style={{width: '180px', paddingRight: '16px'}}>Tên kho</p>
							<p className={styles.table_head_item}>Số kho con</p>
							<p className={styles.table_head_item}>Sản lượng (MT)</p>
							<p className={styles.table_head_item}>Sản lượng (BDMT)</p>
							<p className={styles.table_head_item}>Nhập</p>
							<p className={styles.table_head_item}>Xuất</p>
							<p style={{width: '120px', paddingRight: '16px'}}>Trạng thái</p>
							<p style={{width: '120px', paddingRight: '16px'}}>Tác vụ</p>
						</div>
						<div className={styles.main_table_dropdow}>
							{listWarehouse?.map((v: any, i: number) => (
								<ItemWarehouse key={v?.uuid} order={i + 1} dataWarehouse={v} isParent={true} uuidParent={v?.uuid} />
							))}
						</div>
					</div>
				</DataWrapper>
				<Pagination
					currentPage={Number(_page) || 1}
					pageSize={Number(_pageSize) || 20}
					total={totalCount}
					dependencies={[_pageSize, _keyword, _status]}
				/>
			</div>
		</div>
	);
}

export default ListWarehouse;
