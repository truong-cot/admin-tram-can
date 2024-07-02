import {CONFIG_DESCENDING, CONFIG_PAGING, CONFIG_TYPE_FIND, CONFIG_STATUS} from '~/constants/config/enum';
import axiosClient from '.';

const companyServices = {
	listCompany: (
		data: {
			pageSize: number;
			page: number;
			keyword: string;
			status: CONFIG_STATUS | null;
			isDescending: CONFIG_DESCENDING;
			typeFind: CONFIG_TYPE_FIND;
			isPaging: CONFIG_PAGING;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Companies/get-list-company`, data, {
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
		return axiosClient.post(`/Companies/change-status-company`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default companyServices;
