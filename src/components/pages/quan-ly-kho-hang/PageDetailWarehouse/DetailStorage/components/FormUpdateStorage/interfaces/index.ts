export interface PropsFormUpdateStorage {
	onClose: () => void;
	dataUpdate: any;
}

export interface IFormUpdateStorage {
	uuid: string;
	name: string;
	productUuid: string;
	qualityUuid: string;
	specificationsUuid: string;
	warehouseUuid: string;
	locationMap: string;
	description: string;
}
