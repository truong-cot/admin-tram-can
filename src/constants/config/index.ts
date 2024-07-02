import icons from '../images/icons';
import {TYPE_DATE} from './enum';

export const MAXIMUM_FILE = 10; //MB

export const allowFiles = [
	'application/pdf',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	'image/jpeg',
	'image/jpg',
	'image/png',
];

export enum PATH {
	Any = 'any',
	Login = '/auth/login',
	ForgotPassword = '/auth/forgot-password',
	Profile = '/profile',
	Home = '/',
	CongTy = '/cong-ty',
	ThemMoiCongTy = '/cong-ty/them-moi',
	KhachHang = '/khach-hang',
	TaiKhoan = '/tai-khoan',
	ThemMoiTaiKhoan = '/tai-khoan/them-moi',
	ThemKhachHang = '/khach-hang/them-moi',

	HangHoa = '/hang-hoa',
	HangHoaLoaiHang = '/hang-hoa/loai-hang',
	HangHoaChatLuong = '/hang-hoa/chat-luong',
	HangHoaQuyCach = '/hang-hoa/quy-cach',
	ThemQuyCach = '/hang-hoa/quy-cach/them-moi',

	GiaTien = '/gia-tien-hang',
	ThemGiaTien = '/gia-tien-hang/them-moi',
	ChinhSuaGiaTien = '/gia-tien-hang/chinh-sua',

	CongNo = '/cong-no/cong-ty',
	CongNoKhachHang = '/cong-no/khach-hang',
	LichSuThanhToan = '/cong-no/lich-su',

	CongNoPhieu = '/cong-no-phieu/tat-ca',
	CongNoPhieuChuaKCS = '/cong-no-phieu/chua-kcs',
	CongNoPhieuDaKCS = '/cong-no-phieu/da-kcs',

	QuanLyCan = '/quan-ly-can',
	TramCan = '/quan-ly-can/tram-can',
	CauCan = '/quan-ly-can/cau-can',
	ThemTramCan = '/quan-ly-can/tram-can/them-moi',

	ChucVu = '/chuc-vu',
	RFID = '/rfid',
	XeHang = '/xe-hang',

	NhanVien = '/nhan-vien',
	ThemNhanVien = '/nhan-vien/them-moi',

	ThongKeDuLieuCan = '/thong-ke-log/du-lieu-can',
	ThongKeDuLieuKho = '/thong-ke-log/du-lieu-kho',
	ThongKeKeToanTaiChinh = '/thong-ke-log/ke-toan-tai-chinh',
	ThongKeKhac = '/thong-ke-log/thong-ke-khac',

	QuanLyKhoHang = '/quan-ly-kho-hang',
	ThemKhoHangChinh = '/quan-ly-kho-hang/them-kho-hang-chinh',
	ThemKhoHangCon = '/quan-ly-kho-hang/them-kho-hang-con',

	VaiTro = '/vai-tro',
	ThemVaiTro = '/vai-tro/them-vai-tro',

	PhieuDuKien = '/phieu-du-kien',
	PhieuAllDuKien = '/phieu-du-kien/tat-ca',
	PhieuNhapDuKien = '/phieu-du-kien/phieu-nhap',
	PhieuXuatDuKien = '/phieu-du-kien/phieu-xuat',
	PhieuDichVuDuKien = '/phieu-du-kien/dich-vu',
	PhieuChuyenKhoDuKien = '/phieu-du-kien/chuyen-kho',
	PhieuDaCan = '/phieu-can',
	PhieuAllDaCan = '/phieu-can/tat-ca',
	PhieuNhapDaCan = '/phieu-can/phieu-nhap',
	PhieuXuatDaCan = '/phieu-can/phieu-xuat',
	PhieuDichVuDaCan = '/phieu-can/dich-vu',
	PhieuChuyenKhoDaCan = '/phieu-can/chuyen-kho',

	NhapLieu = '/nhap-lieu',
	ThemMoiNhapDuKien = '/phieu-du-kien/them-moi-nhap',
}

export const Menu: {
	title: string;
	group: {
		path: string;
		pathActive?: string;
		title: string;
		icon: any;
	}[];
}[] = [
	{
		title: 'overview',
		group: [{title: 'Tổng quan', icon: icons.tongQuan, path: PATH.Home}],
	},

	{
		title: 'Kế toán',
		group: [
			{title: 'Công nợ phiếu', icon: icons.phieuhang, path: PATH.CongNoPhieu, pathActive: '/cong-no-phieu'},
			{title: 'Công nợ khách hàng', icon: icons.congno, path: PATH.CongNo, pathActive: '/cong-no'},
			{title: 'Giá tiền hàng', icon: icons.giatienhang, path: PATH.GiaTien},
		],
	},
	{
		title: 'Kho hàng',
		group: [
			{title: 'Kho hàng', icon: icons.danhsachkho, path: PATH.QuanLyKhoHang},
			{title: 'Hàng hóa', icon: icons.hanghoa, path: PATH.HangHoaLoaiHang, pathActive: PATH.HangHoa},
			{title: 'Trạm cân', icon: icons.tramcan, path: PATH.TramCan, pathActive: PATH.QuanLyCan},
			{title: 'RFID', icon: icons.icon_rfid, path: PATH.RFID, pathActive: PATH.RFID},
			{title: 'Xe hàng', icon: icons.xehang, path: PATH.XeHang, pathActive: PATH.XeHang},
		],
	},
	{
		title: 'Phiếu hàng',
		group: [
			{title: 'Phiếu dự kiến', icon: icons.phieudukien, path: PATH.PhieuAllDuKien, pathActive: PATH.PhieuDuKien},
			{title: 'Phiếu cân', icon: icons.phieudacan, path: PATH.PhieuAllDaCan, pathActive: PATH.PhieuDaCan},
			{title: 'Quản lý nhập liệu', icon: icons.nhaplieu, path: PATH.NhapLieu},
		],
	},
	{
		title: 'Khách hàng',
		group: [
			{title: 'Đối tác', icon: icons.congty, path: PATH.CongTy},
			{title: 'Khách hàng', icon: icons.khachhang, path: PATH.KhachHang},
		],
	},
	{
		title: 'Hệ thống',
		group: [
			{
				title: 'Nhân viên',
				icon: icons.NhanVien,
				path: PATH.NhanVien,
			},
			{title: 'Tài khoản', icon: icons.taikhoan, path: PATH.TaiKhoan},
			{title: 'Chức vụ', icon: icons.chucvu, path: PATH.ChucVu},
			{title: 'Vai trò & Phân quyền', icon: icons.phanquyen, path: PATH.VaiTro},
		],
	},
	{
		title: 'Log',
		group: [{title: 'Thống kê log', icon: icons.thongkelog, path: PATH.ThongKeDuLieuCan, pathActive: '/thong-ke-log'}],
	},
];

export const KEY_STORE = 'ADMIN-TRAM-CAN';

export const ListOptionTimePicker: {
	name: string;
	value: number;
}[] = [
	{
		name: 'Hôm nay',
		value: TYPE_DATE.TODAY,
	},
	{
		name: 'Tuần này',
		value: TYPE_DATE.THIS_WEEK,
	},
	{
		name: 'Tuần trước',
		value: TYPE_DATE.LAST_WEEK,
	},
	{
		name: 'Tháng này',
		value: TYPE_DATE.THIS_MONTH,
	},
	// {
	// 	name: 'Tháng trước',
	// 	value: TYPE_DATE.LAST_MONTH,
	// },
	// {
	// 	name: 'Năm này',
	// 	value: TYPE_DATE.THIS_YEAR,
	// },
	{
		name: 'Lựa chọn',
		value: TYPE_DATE.LUA_CHON,
	},
];

export const WEIGHT_WAREHOUSE = 10000; // KG
