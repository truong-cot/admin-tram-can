import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import WrapperContainer from '~/components/layouts/WrapperContainer';
import MainUpdateExport from '~/components/pages/phieu-du-kien/MainUpdateExport';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Chỉnh sửa phiếu xuất dự kiến</title>
				<meta name='description' content='Chỉnh sửa phiếu xuất dự kiến' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<WrapperContainer bg={true}>
				<MainUpdateExport />
			</WrapperContainer>
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Quản lý phiếu dự kiến'>{Page}</BaseLayout>;
};
