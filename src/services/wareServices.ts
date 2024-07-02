import {CONFIG_DESCENDING, CONFIG_PAGING, CONFIG_STATUS, CONFIG_TYPE_FIND} from '~/constants/config/enum';
import axiosClient from '.';

const wareServices = {
	listQuality: (
		data: {
			pageSize: number;
			page: number;
			keyword: string;
			status: number | null;
			isDescending: CONFIG_DESCENDING;
			typeFind: CONFIG_TYPE_FIND;
			isPaging: CONFIG_PAGING;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Ware/get-list-qualities`, data, {
			cancelToken: tokenAxios,
		});
	},
	listProductType: (
		data: {
			pageSize: number;
			page: number;
			keyword: string;
			status: number | null;
			isDescending: CONFIG_DESCENDING;
			typeFind: CONFIG_TYPE_FIND;
			isPaging: CONFIG_PAGING;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Ware/get-list-product-type`, data, {
			cancelToken: tokenAxios,
		});
	},
	listSpecification: (
		data: {
			pageSize: number;
			page: number;
			keyword: string;
			status: number | null;
			isDescending: CONFIG_DESCENDING;
			typeFind: CONFIG_TYPE_FIND;
			isPaging: CONFIG_PAGING;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Ware/get-list-specifications`, data, {
			cancelToken: tokenAxios,
		});
	},
	upsertProductType: (
		data: {
			uuid: string;
			name: string;
			description: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Ware/upsert-producttype`, data, {
			cancelToken: tokenAxios,
		});
	},
	changeStatusProductType: (
		data: {
			uuid: string;
			status: number;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Ware/change-status-producttype`, data, {
			cancelToken: tokenAxios,
		});
	},
	changeStatusQualities: (
		data: {
			uuid: string;
			status: number;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Ware/change-status-qualities`, data, {
			cancelToken: tokenAxios,
		});
	},
	upsertQualities: (
		data: {
			uuid: string;
			name: string;
			description: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Ware/upsert-qualities`, data, {
			cancelToken: tokenAxios,
		});
	},
	upsertSpecifications: (
		data: {
			uuid: string;
			name: string;
			qualityUuid: string;
			description: string;
			items: {
				titleType: string;
				rule: number;
				value: number;
			}[];
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Ware/upsert-specifications`, data, {
			cancelToken: tokenAxios,
		});
	},
	changeStatusSpecifications: (
		data: {
			uuid: string;
			status: number;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Ware/change-status-specifications`, data, {
			cancelToken: tokenAxios,
		});
	},
	getDetailSpecifications: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Ware/detail-specifications`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default wareServices;
