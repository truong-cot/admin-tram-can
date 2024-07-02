import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import WrapperContainer from '~/components/layouts/WrapperContainer';
import MainUpdateCustomer from '~/components/pages/khach-hang/MainUpdateCustomer';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Chỉnh sửa khách hàng</title>
				<meta name='description' content='Chỉnh sửa khách hàng' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<WrapperContainer>
				<MainUpdateCustomer />
			</WrapperContainer>
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Chỉnh sửa khách hàng'>{Page}</BaseLayout>;
};
