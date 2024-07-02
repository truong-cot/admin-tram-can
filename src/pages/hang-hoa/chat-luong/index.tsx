import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import LayoutPages from '~/components/layouts/LayoutPages';
import MainQualities from '~/components/pages/hang-hoa/chat-luong/MainQualities';
import {PATH} from '~/constants/config';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Quản lý chất lượng</title>
				<meta name='description' content='Quản lý chất lượng' />
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
				<MainQualities />
			</LayoutPages>
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Quản lý chất lượng'>{Page}</BaseLayout>;
};
