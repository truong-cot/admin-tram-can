export interface PropsDetailStorage {}

export interface IDetailStorage {
	description: string;
	created: string;
	updatedTime: string;
	warehouseUu: {
		code: string;
		name: string;
		status: number;
		uuid: string;
	};
	productUu: {
		code: string;
		name: string;
		status: number;
		uuid: string;
	};
	qualityUu: {
		name: string;
		status: number;
		uuid: string;
	};
	specificationsUu: {
		name: string;
		status: number;
		uuid: string;
	};
	code: string;
	name: string;
	status: number;
	amountMt: number;
	amountBdmt: number;
	amountIn: number;
	amountOut: number;
	amountChangeIn: number;
	amountChangeOut: number;
	locationMap: string;
	uuid: string;
}
