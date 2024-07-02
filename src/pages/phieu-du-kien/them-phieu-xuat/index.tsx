import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import WrapperContainer from '~/components/layouts/WrapperContainer';
import MainCreateExport from '~/components/pages/phieu-du-kien/MainCreateExport';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Thêm mới phiếu xuất dự kiến</title>
				<meta name='description' content='Thêm mới phiếu xuất dự kiến' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<WrapperContainer bg={true}>
				<MainCreateExport />
			</WrapperContainer>
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Quản lý phiếu dự kiến'>{Page}</BaseLayout>;
};
