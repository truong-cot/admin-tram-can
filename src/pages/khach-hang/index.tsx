import Head from 'next/head';
import { Fragment, ReactElement } from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import WrapperContainer from '~/components/layouts/WrapperContainer';
import MainPageCustomer from '~/components/pages/khach-hang/MainPageCustomer';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Khách hàng</title>
				<meta name='description' content='Khách hàng' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<WrapperContainer>
				<MainPageCustomer />
			</WrapperContainer>
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Quản lý khách hàng'>{Page}</BaseLayout>;
};
