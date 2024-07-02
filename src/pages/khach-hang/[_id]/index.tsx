import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import WrapperContainer from '~/components/layouts/WrapperContainer';
import MainDetailCustomer from '~/components/pages/khach-hang/MainDetailCustomer';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Chi tiết khách hàng</title>
				<meta name='description' content='Chi tiết khách hàng' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<WrapperContainer>
				<MainDetailCustomer />
			</WrapperContainer>
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return (
		<BaseLayout bgLight={true} title='Quản lý khách hàng'>
			{Page}
		</BaseLayout>
	);
};
