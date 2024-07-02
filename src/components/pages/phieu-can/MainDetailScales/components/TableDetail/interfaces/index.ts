export interface PropsTableDetail {}

export interface IWeightSession {
	description: string;
	dryness: number | null;
	lstValueSpec: string | null;
	accountUu: {
		username: string;
		status: number;
		uuid: string;
	};
	updatedTime: string;
	created: string;
	weight1: {
		weight: number;
		timeScales: string;
		scalesMachineUu: {
			status: number;
			name: string;
			uuid: string;
		};
	};
	weight2: {
		weight: number;
		timeScales: string | null;
		scalesMachineUu: {
			status: number;
			name: string;
			uuid: string;
		};
	};
	producTypeUu: {
		code: string;
		name: string;
		status: number;
		uuid: string;
	};
	specificationsUu: {
		name: string;
		status: number;
		uuid: string;
	};
	batch: {
		uuid: string;
		name: string;
		ship: string;
		isShip: number;
		weightIntent: number;
		timeIntend: string;
	};
	bill: {
		uuid: string;
		code: string;
		ship: string;
		isSift: number;
		isBatch: number;
		scalesType: number;
	};
	customerUu: {status: number; name: string; uuid: string} | null;
	storageFromUu: {status: number; name: string; uuid: string} | null;
	storageUu: {status: number; name: string; uuid: string} | null;
	truckUu: {
		code: string;
		licensePalate: string;
		status: number;
		uuid: string;
	};
	weightReal: number;
	status: number;
	code: string;
	uuid: string;
}
