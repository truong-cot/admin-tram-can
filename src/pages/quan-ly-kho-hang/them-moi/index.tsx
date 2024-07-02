import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import WrapperContainer from '~/components/layouts/WrapperContainer';
import MainCreateWarehouse from '~/components/pages/quan-ly-kho-hang/MainCreateWarehouse';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Thêm kho hàng chính</title>
				<meta name='description' content='Thêm kho hàng chính' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<WrapperContainer>
				<MainCreateWarehouse />
			</WrapperContainer>
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return (
		<BaseLayout bgLight={true} title='Thêm kho hàng chính'>
			{Page}
		</BaseLayout>
	);
};
