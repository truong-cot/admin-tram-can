import exp from 'constants';

export interface PropsMainPagePrice { }

export interface IPriceTag {
	updatedTime: string
	created: string
	state: number
	priceTagUu: IPriceTagUu | null
	specUu: ISpecUu
	lstCustomer: ILstCustomer[]
	// Xóa sau
	status: number
	uuid: string
}

export interface IPriceTagUu {
	code: string
	amount: number
	status: number
	uuid: string
}

export interface ISpecUu {
	name: string
	status: number
	uuid: string
}

export interface ILstCustomer {
	code: string
	name: string
	uuid: string
}