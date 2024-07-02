import {CONFIG_DESCENDING, CONFIG_PAGING, CONFIG_STATUS, CONFIG_TYPE_FIND} from '~/constants/config/enum';
import axiosClient from '.';

const warehouseServices = {
	listWarehouse: (
		data: {
			pageSize: number;
			page: number;
			keyword: string;
			status: number | null;
			isDescending: CONFIG_DESCENDING;
			typeFind: CONFIG_TYPE_FIND;
			isPaging: CONFIG_PAGING;
			customerUuid: string;
			timeStart: string | null;
			timeEnd: string | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Warehouse/get-list-warehouse`, data, {
			cancelToken: tokenAxios,
		});
	},
	changeStatusWarehouse: (
		data: {
			uuid: string;
			status: CONFIG_STATUS;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Warehouse/change-status-warehouse`, data, {
			cancelToken: tokenAxios,
		});
	},
	overviewStorage: (data: {}, tokenAxios?: any) => {
		return axiosClient.post(`/Warehouse/overview-storage`, data, {
			cancelToken: tokenAxios,
		});
	},
	upsertWarehouse: (
		data: {
			uuid: string;
			name: string;
			address: string;
			scaleStationUuid: string | null;
			provinceId: string;
			dictrictId: string;
			townId: string;
			description: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Warehouse/upsert-warehouse`, data, {
			cancelToken: tokenAxios,
		});
	},
	detailWarehouse: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Warehouse/detail-warehouse`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default warehouseServices;
