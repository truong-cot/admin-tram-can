export interface PropsCreateCompany {}
export interface IFormCreateCompany {
	// customersUuid: string[];
	description: string;
	name: string;
	taxCode: string;
	contact: string;
	email: string;
	address: string;
	phoneNumber: string;
	provinceId: string;
	districtId: string;
	townId: string;
    userOwenerUuid:string;
    director:string;
}