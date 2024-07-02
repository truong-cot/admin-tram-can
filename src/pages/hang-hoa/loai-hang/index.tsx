import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import LayoutPages from '~/components/layouts/LayoutPages';
import MainProductType from '~/components/pages/hang-hoa/loai-hang/MainProductType';
import {PATH} from '~/constants/config';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Quản lý loại hàng</title>
				<meta name='description' content='Quản lý loại hàng' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<LayoutPages
				listPages={[
					{
						title: 'Loại hàng',
						url: PATH.HangHoaLoaiHang,
					},
					{
						title: 'Chất lượng',
						url: PATH.HangHoaChatLuong,
					},
					{
						title: 'Quy cách',
						url: PATH.HangHoaQuyCach,
					},
				]}
			>
				<MainProductType />
			</LayoutPages>
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Quản lý loại hàng'>{Page}</BaseLayout>;
};
