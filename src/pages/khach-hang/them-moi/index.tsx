import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import WrapperContainer from '~/components/layouts/WrapperContainer';
import MainCreateCustomer from '~/components/pages/khach-hang/MainCreateCustomer';
export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Thêm mới</title>
				<meta name='description' content='Thêm mới' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<WrapperContainer>
				<MainCreateCustomer />
			</WrapperContainer>
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Quản lý khách hàng'>{Page}</BaseLayout>;
};
