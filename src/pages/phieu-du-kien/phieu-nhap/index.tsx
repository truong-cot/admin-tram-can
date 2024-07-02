import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import LayoutPages from '~/components/layouts/LayoutPages';
import MainPageBillImport from '~/components/pages/phieu-du-kien/MainPageBillImport';
import {PATH} from '~/constants/config';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Phiếu hàng dự kiến</title>
				<meta name='description' content='Phiếu hàng dự kiến' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<LayoutPages
				listPages={[
					{
						title: 'Tất cả',
						url: PATH.PhieuAllDuKien,
					},
					{
						title: 'Phiếu nhập',
						url: PATH.PhieuNhapDuKien,
					},
					{
						title: 'Phiếu xuất',
						url: PATH.PhieuXuatDuKien,
					},
					{
						title: 'Dịch vụ',
						url: PATH.PhieuDichVuDuKien,
					},
					{
						title: 'Chuyển kho',
						url: PATH.PhieuChuyenKhoDuKien,
					},
				]}
			>
				<MainPageBillImport />
			</LayoutPages>
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Quản lý Phiếu hàng dự kiến'>{Page}</BaseLayout>;
};
