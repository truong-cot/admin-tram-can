export enum QUERY_KEY {
	dropdown_nguoi_quan_ly,
	dropdown_nhan_vien_thi_truong,
	dropdown_cong_ty,
	dropdown_tinh_thanh_pho,
	dropdown_quan_huyen,
	dropdown_xa_phuong,
	dropdown_chat_luong,
	dropdown_loai_hang,
	dropdown_quy_cach,
	dropdown_khach_hang,
	dropdown_tram_can,
	dropdown_ban_can,
	dropdown_chuc_vu,
	dropdown_nguoi_quan_ly_xe,
	dropdown_RFID,
	dropdown_xe_hang,
	dropdown_kho_hang_chinh,
	dropdown_kho_hang_con,
	dropdown_kho_hang_con_dich,
	dropdown_gia_tien_hang,
	dropdown_nguoi_quan_ly_nhan_vien,

	table_khach_hang,
	table_xe_hang,
	table_tram_can,
	table_gia_tien_hang,
	table_ban_can,
	table_RFID,
	table_cong_ty,
	table_loai_hang,
	table_chat_luong,
	table_quy_cach,
	table_kho_hang_chinh,
	table_kho_hang_con,
	table_khach_hang_kho_con,
	table_lich_su_kho_con,
	table_phieu_hang_du_kien,
	table_phieu_can,
	table_chi_tiet_don_hang_phieu,
	table_nhan_vien,
	Table_chuc_vu,

	thong_so_kho_hang,
	chi_tiet_cong_ty,
	chi_tiet_khach_hang,
	chi_tiet_tram_can,
	chi_tiet_xe_hang,
	chi_tiet_quy_cach,
	chi_tiet_kho_hang_chinh,
	chi_tiet_kho_hang_con,
	chi_tiet_kho_hang_con_den,
	chi_tiet_phieu_du_kien,
	chi_tiet_kho_hang_con_dich,
	chi_tiet_nhan_vien,
}

export enum TYPE_DATE {
	ALL = -1,
	TODAY = 1,
	YESTERDAY = 2,
	THIS_WEEK = 3,
	LAST_WEEK = 4,
	THIS_MONTH = 5,
	LAST_MONTH = 6,
	THIS_YEAR = 7,
	LUA_CHON = 8,
}

export enum GENDER {
	NAM,
	NU,
	KHAC,
}

export enum CONDITION {
	BIG,
	SMALL,
}

// ENUM API CONFIG
export enum CONFIG_STATUS {
	BI_KHOA,
	HOAT_DONG,
}

export enum CONFIG_PAGING {
	NO_PAGING,
	IS_PAGING,
}

export enum CONFIG_DESCENDING {
	NO_DESCENDING,
	IS_DESCENDING,
}

export enum CONFIG_TYPE_FIND {
	DROPDOWN,
	FILTER,
	TABLE,
}

export enum TYPE_TRANSPORT {
	DUONG_BO,
	DUONG_THUY,
}

// PAGE CUSTOMER
export enum STATUS_CUSTOMER {
	DUNG_HOP_TAC,
	HOP_TAC,
}

export enum TYPE_CUSTOMER {
	KH_NHAP = 1,
	KH_XUAT,
}

export enum TYPE_SIFT {
	KHONG_SANG,
	DA_SANG,
}

export enum TYPE_BATCH {
	CAN_LO,
	CAN_LE,
}

export enum TYPE_SCALES {
	CAN_NHAP = 1,
	CAN_XUAT,
	CAN_DICH_VU,
	CAN_CHUYEN_KHO,
}

export enum STATUS_BILL {
	DA_HUY,
	CHUA_CAN,
	DANG_CAN,
	TAM_DUNG,
	DA_CAN_CHUA_KCS,
	DA_KCS,
	CHOT_KE_TOAN,
}

export enum STATUS_WEIGHT_SESSION {
	DA_HUY,
	CAN_LAN_1,
	CAN_LAN_2,
	KCS_XONG,
	CHOT_KE_TOAN,
}

// PAGE DEBT
export enum STATUS_DEBT {
	THANH_TOAN,
	TAM_UNG,
}

// PAGE PRICE
export enum STATUS_STANDARD {
	DANG_AP_DUNG,
	NGUNG_AP_DUNG,
}

// PAGE TRUCK
export enum OWNEW_TYPE_TRUCK {
	XE_CONG_TY,
	XE_KHACH_HANG,
}

// COMON REGENCY
export enum REGENCY_NAME {
	'Nhân viên tài chính - kế toán' = 9,
	'Nhân viên KCS' = 8,
	'Nhân viên thị trường' = 7,
	'Nhân viên cân' = 6,
	'Quản lý xe' = 5,
	'Quản lý nhập hàng' = 4,
	'Quản lý kho KCS' = 3,
	'Phó Giám Đốc' = 2,
	'Giám Đốc' = 1,
}

// PAGE QUY CÁCH
export enum TYPE_RULER {
	NHO_HON,
	LON_HON,
}
