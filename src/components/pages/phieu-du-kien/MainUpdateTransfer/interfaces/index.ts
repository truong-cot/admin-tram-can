export interface PropsMainUpdateTransfer {}

export interface IFormUpdateTransfer {
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
	warehouseToUuid: string;
	warehouseFromUuid: string;
	productTypeUuid: string;
	pricetagUuid: string;
	documentId: string;
	description: string;
	customerUuid: string;
	storageUuid: string;
	storageFromUuid: string;
}
