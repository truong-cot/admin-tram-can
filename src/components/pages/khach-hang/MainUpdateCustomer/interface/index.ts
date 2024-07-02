import {TYPE_CUSTOMER, TYPE_SIFT, TYPE_TRANSPORT} from '~/constants/config/enum';

export interface PropsMainUpdateCustomer {}

export interface IFormUpdateCustomer {
	name: string;
	userUuid: string;
	taxCode: string;
	director: string;
	partnerUuid: string;
	email: string;
	phoneNumber: string;
	provinceId: string;
	districtId: string;
	townId: string;
	address: string;
	description: string;
	typeCus: TYPE_CUSTOMER | null;
	transportType: TYPE_TRANSPORT | null;
	isSift: TYPE_SIFT | null;
}
