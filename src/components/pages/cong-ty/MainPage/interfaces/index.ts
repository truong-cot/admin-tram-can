import {IAddress} from '~/constants/config/interfaces';

export interface PropsMainPage {}


export interface ICompany {
	taxCode: string;
	email: string;
	director: string;
	description: string;
	address: string;
	created: string;
	updated: string;
	phoneNumber: string;
	isSift: number;
	detailAddress: IAddress;
	userOwnerUu: {
		code: string;
		fullName: string;
		uuid: string;
	};
	code: string;
	name: string;
	status:number;
	uuid: string;
}
