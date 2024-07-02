import {CONFIG_DESCENDING, CONFIG_PAGING, CONFIG_TYPE_FIND} from '~/constants/config/enum';
import axiosClient from '.';

const weightSessionServices = {
	listWeightsession: (
		data: {
			pageSize: number;
			page: number;
			keyword: string;
			status: number[];
			isDescending: CONFIG_DESCENDING;
			typeFind: CONFIG_TYPE_FIND;
			isPaging: CONFIG_PAGING;
			scalesType: number[];
			billUuid: string;
			truckUuid: string;
			storageUuid: string;
			isBatch: number | null;
			timeStart: string | null;
			timeEnd: string | null;
			specUuid: string | null;
			codeStart: number | null;
			codeEnd: number | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/WeightSession/get-list-weightsession`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default weightSessionServices;
