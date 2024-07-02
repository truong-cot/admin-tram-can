import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import LayoutPages from '~/components/layouts/LayoutPages';
import MainPageScalesService from '~/components/pages/phieu-can/MainPageScalesService';
import {PATH} from '~/constants/config';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Phiếu cân</title>
				<meta name='description' content='Phiếu cân' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<LayoutPages
				listPages={[
					{
						title: 'Tất cả',
						url: PATH.PhieuAllDaCan,
					},
					{
						title: 'Phiếu nhập',
						url: PATH.PhieuNhapDaCan,
					},
					{
						title: 'Phiếu xuất',
						url: PATH.PhieuXuatDaCan,
					},
					{
						title: 'Dịch vụ',
						url: PATH.PhieuDichVuDaCan,
					},
					{
						title: 'Chuyển kho',
						url: PATH.PhieuChuyenKhoDaCan,
					},
				]}
			>
				<MainPageScalesService />
			</LayoutPages>
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Quản lý phiếu cân'>{Page}</BaseLayout>;
};
