import {CONFIG_DESCENDING, CONFIG_PAGING, CONFIG_STATUS, CONFIG_TYPE_FIND} from '~/constants/config/enum';
import axiosClient from '.';

const storageServices = {
	listStorage: (
		data: {
			pageSize: number;
			page: number;
			keyword: string;
			status: number | null;
			isDescending: CONFIG_DESCENDING;
			typeFind: CONFIG_TYPE_FIND;
			isPaging: CONFIG_PAGING;
			warehouseUuid: string;
			productUuid: string;
			qualityUuid: string;
			specificationsUuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Storage/get-list-storage`, data, {
			cancelToken: tokenAxios,
		});
	},
	changeStatusStorage: (
		data: {
			uuid: string;
			status: CONFIG_STATUS;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Storage/change-status-storage`, data, {
			cancelToken: tokenAxios,
		});
	},
	detailStorage: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Storage/detail-storage`, data, {
			cancelToken: tokenAxios,
		});
	},
	historyStorageCustomer: (
		data: {
			pageSize: number;
			page: number;
			keyword: string;
			status: number | null;
			isDescending: CONFIG_DESCENDING;
			typeFind: CONFIG_TYPE_FIND;
			isPaging: CONFIG_PAGING;
			storageUuid: string;
			timeStart: string | null;
			timeEnd: string | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Storage/history-storage-customer`, data, {
			cancelToken: tokenAxios,
		});
	},
	historyStorageInOut: (
		data: {
			pageSize: number;
			page: number;
			keyword: string;
			status: number | null;
			isDescending: CONFIG_DESCENDING;
			typeFind: CONFIG_TYPE_FIND;
			isPaging: CONFIG_PAGING;
			storageUuid: string;
			timeStart: string | null;
			timeEnd: string | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Storage/history-storage-in-out`, data, {
			cancelToken: tokenAxios,
		});
	},
	upsertStorage: (
		data: {
			uuid: string;
			name: string;
			warehouseUuid: string;
			productUuid: string;
			qualityUuid: string;
			specificationsUuid: string;
			locationMap: string;
			description: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Storage/upsert-storage`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default storageServices;
