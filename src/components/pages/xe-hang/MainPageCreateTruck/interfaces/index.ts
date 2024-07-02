import {OWNEW_TYPE_TRUCK} from '~/constants/config/enum';

export interface PropsMainPageCreateTruck {}

export interface IFormCreateTruck {
	code: string;
	licensePalate: string;
	minWeight: number;
	maxWeight: number;
	// weight: number;
	ownerType: OWNEW_TYPE_TRUCK;
	trucktype: string;
	managerUuid: string;
	description: string;
}
