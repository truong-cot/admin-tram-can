export interface PropsMainSpecifications {}

export interface ISpecifications {
	specOld: string;
	specOldNavigation: string;
	qualityUu: {
		name: string;
		status: number;
		uuid: string;
	};
	countRuler: number;
	description: string;
	ruleItems: {
		titleType: string;
		rule: number;
		value: number;
	}[];
	created: string;
	updateTime: string;
	name: string;
	status: number;
	uuid: string;
}
