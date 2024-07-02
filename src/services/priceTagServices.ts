import {CONFIG_DESCENDING, CONFIG_PAGING, CONFIG_STATUS, CONFIG_TYPE_FIND} from '~/constants/config/enum';
import axiosClient from '.';

const priceTagServices = {
	listPriceTag: (
		data: {
			pageSize: number;
			page: number;
			keyword: string;
			status: CONFIG_STATUS | null;
			isDescending: CONFIG_DESCENDING;
			typeFind: CONFIG_TYPE_FIND;
			isPaging: CONFIG_PAGING;
			customerUuid: string | null;
			specUuid: string | null;
			productTypeUuid: string | null;
			priceTagUuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/PriceTag/get-list-price-tag-info`, data, {
			cancelToken: tokenAxios,
		});
	},
	listPriceTagDropDown: (
		data: {
			pageSize: number;
			page: number;
			keyword: string;
			status: CONFIG_STATUS | null;
			isDescending: CONFIG_DESCENDING;
			typeFind: CONFIG_TYPE_FIND;
			isPaging: CONFIG_PAGING;
			customerUuid: string | null;
			specUuidExclude: string | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/PriceTag/get-list-pricetag`, data, {
			cancelToken: tokenAxios,
		});
	},
	changeStatus: (
		data: {
			uuid: string;
			status: CONFIG_STATUS;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(``, data, {
			cancelToken: tokenAxios,
		});
	},
	detailPriceTag: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/PriceTag/detail-pricetag`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default priceTagServices;
