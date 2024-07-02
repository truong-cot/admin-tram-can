export interface PropsMainPageScalesAll {}

export interface ITableBillScale {
	scalesStationUu: {
		code: string;
		name: string;
		status: number;
		uuid: string;
	};
	lstTruck: string[];
	isSift: number;
	timeStart: string | null;
	timeEnd: string | null;
	updatedTime: string;
	created: string;
	documentId: string;
	accountUu: {
		username: string;
		status: number;
		uuid: string;
	};
	description: string;
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
	warehouseUu: string | null;
	pricetagUu: string | null;
	isBatch: number;
	customerUu: {
		code: string;
		name: string;
		customerSpecUu: any;
		uuid: string;
	} | null;
	storageUu: {
		code: string;
		name: string;
		status: number;
		amountMt: number;
		amountBdmt: number;
		amountIn: number;
		amountOut: number;
		amountChangeIn: number;
		amountChangeOut: number;
		locationMap: string | null;
		uuid: string;
	};
	storageFromUu: {
		code: string;
		name: string;
		status: number;
		amountMt: number;
		amountBdmt: number;
		amountIn: number;
		amountOut: number;
		amountChangeIn: number;
		amountChangeOut: number;
		locationMap: string | null;
		uuid: string;
	};
	moneyTotal: number;
	status: number;
	code: string;
	uuid: string;
}
