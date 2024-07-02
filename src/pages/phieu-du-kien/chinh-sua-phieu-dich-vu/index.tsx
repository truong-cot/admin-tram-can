import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import WrapperContainer from '~/components/layouts/WrapperContainer';
import MainUpdateService from '~/components/pages/phieu-du-kien/MainUpdateService';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Chỉnh sửa phiếu dịch vụ dự kiến</title>
				<meta name='description' content='Chỉnh sửa phiếu dịch vụ dự kiến' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<WrapperContainer bg={true}>
				<MainUpdateService />
			</WrapperContainer>
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Quản lý phiếu dự kiến'>{Page}</BaseLayout>;
};
