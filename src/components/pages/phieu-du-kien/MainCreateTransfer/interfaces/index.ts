export interface PropsMainCreateTransfer {}

export interface IFormCreateTransfer {
	ship: string;
	isShip: number;
	timeIntend: string;
	weightIntent: number;
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
