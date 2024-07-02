export interface PropsItemRuler {
	data: any;
	idx: number;
	showBtnDelete: boolean;
	handleDeleteRow: (index: number) => void;
	handleChangeValue: (index: number, name: string, value: any) => void;
}
