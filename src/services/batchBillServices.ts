import {CONFIG_DESCENDING, CONFIG_PAGING, CONFIG_TYPE_FIND} from '~/constants/config/enum';
import axiosClient from '.';

const batchBillServices = {
	getListBill: (
		data: {
			pageSize: number;
			page: number;
			keyword: string;
			isDescending: CONFIG_DESCENDING;
			typeFind: CONFIG_TYPE_FIND;
			isPaging: CONFIG_PAGING;
			scalesType: number | null;
			isBatch: number | null;
			isCreateBatch: number | null;
			status: number[];
			timeStart: string | null;
			timeEnd: string | null;
			specificationsUuid: string;
			warehouseUuid: string;
			customerUuid: string;
			productTypeUuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/BatchBill/get-list-bill`, data, {
			cancelToken: tokenAxios,
		});
	},
	upsertBatchBill: (
		data: {
			batchUuid: string;
			ship: string;
			isShip: number;
			timeIntend: string;
			weightIntent: number;
			customerName: string;
			billUuid: string;
			name: string;
			isBatch: number;
			isCreateBatch: number;
			scalesStationUuid: string;
			isSift: number;
			scalesType: number;
			specificationsUuid: string;
			productTypeUuid: string;
			pricetagUuid: string;
			documentId: string;
			description: string;
			lstTruckAddUuid: string[];
			lstTruckRemoveUuid: string[];
			customerUuid: string;
			storageUuid: string;
			storageFromUuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/BatchBill/upsert-batchbill`, data, {
			cancelToken: tokenAxios,
		});
	},
	changeStatusBatchBill: (
		data: {
			uuid: string;
			status: number;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/BatchBill/change-status-batchbill`, data, {
			cancelToken: tokenAxios,
		});
	},
	detailBatchbill: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/BatchBill/detail-batchbill`, data, {
			cancelToken: tokenAxios,
		});
	},
	deleteBatchBill: (data: {uuid: string; description: string}, tokenAxios?: any) => {
		return axiosClient.post(`/BatchBill/delete-batchbill`, data, {cancelToken: tokenAxios});
	},
};

export default batchBillServices;
