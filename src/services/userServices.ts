import {CONFIG_DESCENDING, CONFIG_PAGING, CONFIG_TYPE_FIND, CONFIG_STATUS, GENDER} from '~/constants/config/enum';
import axiosClient from '.';

const userServices = {
	listUser: (
		data: {
			pageSize: number;
			page: number;
			keyword: string;
			status: CONFIG_STATUS | null;
			isDescending: CONFIG_DESCENDING;
			typeFind: CONFIG_TYPE_FIND;
			isPaging: CONFIG_PAGING;
			regencyUuid: string;
			regencyUuidExclude: string;
			provinceIDOwer: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/User/get-list-user`, data, {
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
		return axiosClient.post(`/User/change-status-user`, data, {
			cancelToken: tokenAxios,
		});
	},
	upsertUser: (
		data: {
			uuid: string;
			fullName: string;
			phoneNumber: string;
			email: string;
			birthDay: string;
			address: string;
			description: string;
			accountUsername: string;
			regencyUuid: string;
			sex: GENDER;
			linkImage: string;
			arrayOwnerUuid: string[];
			arrayPartnerUuid: string[];
			provinceId: string;
			districtId: string;
			townId: string;
			provinceOwnerId: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/User/upsert-user`, data, {
			cancelToken: tokenAxios,
		});
	},
	detailUser: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/User/detail-user`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default userServices;
