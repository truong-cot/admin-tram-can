import React, {Fragment} from 'react';
import {IWeightSession, PropsTableDetail} from './interfaces';
import styles from './TableDetail.module.scss';
import DataWrapper from '~/components/common/DataWrapper';
import Table from '~/components/common/Table';
import Pagination from '~/components/common/Pagination';
import clsx from 'clsx';
import Search from '~/components/common/Search';
import {useRouter} from 'next/router';
import {CONFIG_DESCENDING, CONFIG_PAGING, CONFIG_TYPE_FIND, QUERY_KEY, STATUS_WEIGHT_SESSION} from '~/constants/config/enum';
import {useQuery} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import weightSessionServices from '~/services/weightSessionServices';
import Noti from '~/components/common/DataWrapper/components/Noti';
import Moment from 'react-moment';
import {convertCoin} from '~/common/funcs/convertCoin';

function TableDetail({}: PropsTableDetail) {
	const router = useRouter();

	const {_id, _keyword, _page, _pageSize, _status} = router.query;

	const listWeightSession = useQuery([QUERY_KEY.table_chi_tiet_don_hang_phieu, _page, _pageSize, _keyword, _status, _id], {
		queryFn: () =>
			httpRequest({
				isList: true,
				http: weightSessionServices.listWeightsession({
					page: Number(_page) || 1,
					pageSize: Number(_pageSize) || 20,
					keyword: (_keyword as string) || '',
					isPaging: CONFIG_PAGING.IS_PAGING,
					isDescending: CONFIG_DESCENDING.NO_DESCENDING,
					typeFind: CONFIG_TYPE_FIND.TABLE,
					billUuid: _id as string,
					codeEnd: null,
					codeStart: null,
					isBatch: null,
					scalesType: [],
					specUuid: '',
					status: !!_status ? [Number(_status)] : [],
					storageUuid: '',
					timeEnd: null,
					timeStart: null,
					truckUuid: '',
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!_id,
	});

	const handleChangeCheckBox = (e: any) => {
		const {checked} = e.target;
		const {_status, ...rest} = router.query;

		if (checked) {
			return router.replace(
				{
					query: {
						...router.query,
						_status: STATUS_WEIGHT_SESSION.CAN_LAN_1,
					},
				},
				undefined,
				{
					scroll: false,
				}
			);
		} else {
			return router.replace(
				{
					query: {
						...rest,
					},
				},
				undefined,
				{
					scroll: false,
				}
			);
		}
	};

	return (
		<Fragment>
			<div className={clsx('mt')}>
				<div className={styles.header}>
					<div className={styles.main_search}>
						<div className={styles.search}>
							<Search keyName='_keyword' placeholder='Tìm kiếm theo số phiếu' />
						</div>
						<div className={clsx(styles.checkbox_right)}>
							<input type='checkbox' id='can-lan-1' onChange={handleChangeCheckBox} />
							<label htmlFor='can-lan-1'>Chỉ hiển thị cân lần 1 </label>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.table}>
				<DataWrapper
					data={listWeightSession?.data?.items || []}
					loading={listWeightSession?.isLoading}
					noti={<Noti des='Dữ liệu trống?' disableButton />}
				>
					<Table
						data={listWeightSession?.data?.items || []}
						column={[
							{
								title: 'STT',
								render: (data: IWeightSession, index: number) => <>{index + 1}</>,
							},
							{
								title: 'Số phiếu',
								render: (data: IWeightSession) => <>{data?.code}</>,
							},
							{
								title: 'Số xe',
								render: (data: IWeightSession) => <>{data?.truckUu?.licensePalate}</>,
							},
							{
								title: 'Khách hàng',
								render: (data: IWeightSession) => <>{data?.customerUu?.name || '---'}</>,
							},
							{
								title: 'Loại hàng',
								render: (data: IWeightSession) => <>{data?.producTypeUu?.name || '---'}</>,
							},
							{
								title: 'Chất lượng',
								render: (data: IWeightSession) => <>{'---'}</>,
							},
							{
								title: 'TL lần 1',
								render: (data: IWeightSession) => <>{convertCoin(data?.weight1?.weight)}</>,
							},
							{
								title: 'TL lần 2',
								render: (data: IWeightSession) => <>{convertCoin(data?.weight2?.weight || 0)}</>,
							},
							{
								title: 'TL hàng',
								render: (data: IWeightSession) => <>{data?.weightReal || 0}</>,
							},
							{
								title: 'Đến kho hàng',
								render: (data: IWeightSession) => <>{data?.storageUu?.name || '---'}</>,
							},
							{
								title: 'Cân lần 1',
								render: (data: IWeightSession) => (
									<>
										{data?.weight1?.scalesMachineUu?.name}
										<p>
											<Moment date={data?.weight1?.timeScales} format='HH:mm, DD/MM/YYYY' />
										</p>
									</>
								),
							},
							{
								title: 'Cân lần 2',
								render: (data: IWeightSession) => (
									<>
										{data?.weight2?.timeScales ? (
											<>
												{data?.weight2?.scalesMachineUu?.name}
												<p>
													<Moment date={data?.weight2?.timeScales} format='HH:mm, DD/MM/YYYY' />
												</p>
											</>
										) : (
											'---'
										)}
									</>
								),
							},
							{
								title: 'Ghi chú',
								render: (data: IWeightSession) => <>{data?.description}</>,
							},
						]}
					/>
				</DataWrapper>
				<Pagination
					currentPage={Number(_page) || 1}
					pageSize={Number(_pageSize) || 20}
					total={listWeightSession?.data?.pagination?.totalCount}
					dependencies={[_id, _keyword, _pageSize, _status]}
				/>
			</div>
		</Fragment>
	);
}

export default TableDetail;
