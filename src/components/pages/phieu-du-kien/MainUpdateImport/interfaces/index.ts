export interface PropsMainUpdateImport {}

export interface IFormUpdateImport {
	batchUuid: string;
	billUuid: string;
	ship: string;
	isShip: number;
	timeIntend: string | Date;
	weightIntent: number | string;
	customerName: string;
	name: string;
	isBatch: number;
	isCreateBatch: number | null;
	scalesStationUuid: string;
	isSift: number;
	scalesType: number | null;
	specificationsUuid: string;
	warehouseUuid: string;
	productTypeUuid: string;
	pricetagUuid: string;
	documentId: string;
	description: string;
	customerUuid: string;
	storageUuid: string;
	storageFromUuid: string;
}
