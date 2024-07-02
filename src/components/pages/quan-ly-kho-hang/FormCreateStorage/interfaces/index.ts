export interface PropsFormCreateStorage {
	numberId: number;
	onClose: () => void;
}

export interface IFormCreateStorage {
	name: string;
	productUuid: string;
	qualityUuid: string;
	specificationsUuid: string;
	locationMap: string;
	description: string;
	weight: string;
}
