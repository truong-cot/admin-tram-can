export interface PropsButtonSelectMany {
	label?: string | React.ReactNode;
	placeholder: string;
	title: string;
	description: string;
	showOverlay?: boolean;
	isShowCode?: boolean;

	// Data list
	dataList: {
		uuid: string;
		name: string;
		code?: string;
	}[];
	dataChecked: {
		uuid: string;
		name: string;
		code?: string;
	}[];
	setDataChecked: (
		data: {
			uuid: string;
			name: string;
			code?: string;
		}[]
	) => void;
}
