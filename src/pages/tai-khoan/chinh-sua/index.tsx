import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import WrapperContainer from '~/components/layouts/WrapperContainer';
import MainUpdateAccount from '~/components/pages/tai-khoan/MainUpdateAccount';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Chỉnh sửa tài khoản</title>
				<meta name='description' content='Chỉnh sửa tài khoản' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<WrapperContainer>
				<MainUpdateAccount />
			</WrapperContainer>
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Chỉnh sửa tài khoản'>{Page}</BaseLayout>;
};
