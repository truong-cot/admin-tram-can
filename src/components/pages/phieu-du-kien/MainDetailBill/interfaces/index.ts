export interface PropsMainDetailBill {}

export interface IDetailBatchBill {
	scalesStationUu: {code: string; name: string; status: number; uuid: string};
	lstTruck: {
		code: string;
		licensePalate: string;
		status: number;
		uuid: string;
	}[];
	isSift: number;
	timeStart: string | null;
	timeEnd: string;
	updatedTime: string;
	created: string;
	documentId: string;
	accountUu: {username: string; status: number; uuid: string} | null;
	accountUpdateUu: {username: string; status: number; uuid: string} | null;
	description: string;
	qualityUu: {
		name: string;
		status: number;
		uuid: string;
	};
	weightTotal: number;
	customnerName: string | null;
	scalesType: number;
	specificationsUu: {
		name: string;
		status: number;
		uuid: string;
	};
	batchInfo: {
		uuid: string;
		name: string;
		ship: string;
		isShip: number;
		weightIntent: number;
		timeIntend: string;
	};
	productTypeUu: {
		code: string;
		name: string;
		status: number;
		uuid: string;
	};
	isBatch: number;
	customerUu: {code: string; name: string; customerSpecUu: any; uuid: string} | null;
	storageUu: {
		warehouseUu: {code: string; name: string; status: number; uuid: string} | null;
		code: string;
		name: string;
		status: number;
		uuid: string;
	};
	storageFromUu: {
		warehouseUu: {code: string; name: string; status: number; uuid: string} | null;
		code: string;
		name: string;
		status: number;
		uuid: string;
	};
	moneyTotal: number;
	status: number;
	code: string;
	uuid: string;
}
