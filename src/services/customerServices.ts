import {CONFIG_DESCENDING, CONFIG_PAGING, CONFIG_TYPE_FIND, STATUS_CUSTOMER, TYPE_CUSTOMER} from '~/constants/config/enum';
import axiosClient from '.';

const customerServices = {
	listCustomer: (
		data: {
			page: number;
			pageSize: number;
			keyword: string;
			specUuid: string;
			userUuid: string;
			provinceId: string;
			partnerUUid: string;
			status: STATUS_CUSTOMER | null;
			isDescending: CONFIG_DESCENDING;
			typeFind: CONFIG_TYPE_FIND;
			isPaging: CONFIG_PAGING;
			typeCus: TYPE_CUSTOMER | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Customer/get-list-customer`, data, {
			cancelToken: tokenAxios,
		});
	},
	changeStatus: (
		data: {
			uuid: string;
			status: STATUS_CUSTOMER;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Customer/change-status-customer`, data, {
			cancelToken: tokenAxios,
		});
	},
	getDetail: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Customer/detail-customer`, data, {
			cancelToken: tokenAxios,
		});
	},
	upsertCustomer: (
		data: {
			uuid: string;
			name: string;
			taxCode: string;
			phoneNumber: string;
			email: string;
			director: string;
			isSift: number;
			typeCus: number;
			transportType: number;
			provinceId: string;
			districtId: string;
			townId: string;
			address: string;
			description: string;
			partnerUuid: string;
			userUuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Customer/upsert-customer`, data, {
			cancelToken: tokenAxios,
		});
	},
	addSpecificationToCustomer: (
		data: {
			infoSpec: {
				specUuid: string;
				status: 0 | 1;
				productTypeUuid: string;
				priceTagUuid: string | null;
				state: 0 | 1;
			}[];
			customerUuid: string[];
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Customer/add-specification-to-customer`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default customerServices;
