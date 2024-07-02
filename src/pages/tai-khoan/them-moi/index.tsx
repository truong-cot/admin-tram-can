import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import WrapperContainer from '~/components/layouts/WrapperContainer';
import MainCreateAccount from '~/components/pages/tai-khoan/MainCreateAccount';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Thêm mới tài khoản</title>
				<meta name='description' content='Thêm mới tài khoản' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<WrapperContainer>
				<MainCreateAccount />
			</WrapperContainer>
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return (
		<BaseLayout title='Thêm mới tài khoản' bgLight={true}>
			{Page}
		</BaseLayout>
	);
};
