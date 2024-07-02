import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import WrapperContainer from '~/components/layouts/WrapperContainer';
import MainPagePrice from '~/components/pages/gia-tien-hang/MainPagePrice';
export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Giá tiền hàng</title>
				<meta name='description' content='Giá tiền hàng' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<WrapperContainer>
				<MainPagePrice />
			</WrapperContainer>
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Quản lý giá tiền'>{Page}</BaseLayout>;
};
