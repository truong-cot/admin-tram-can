import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import WrapperContainer from '~/components/layouts/WrapperContainer';
import MainCreate from '~/components/pages/nhan-vien/MainCreate';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Thêm mới Nhân viên</title>
				<meta name='description' content='Thêm mới Nhân viên' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<WrapperContainer bg={true}>
				<MainCreate />
			</WrapperContainer>
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Thêm mới Nhân viên'>{Page}</BaseLayout>;
};
