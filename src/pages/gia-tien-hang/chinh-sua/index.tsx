import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import WrapperContainer from '~/components/layouts/WrapperContainer';
import UpdatePriceTag from '~/components/pages/gia-tien-hang/UpdatePriceTag';
export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Chỉnh sửa giá tiền hàng</title>
				<meta name='description' content='Chỉnh sửa giá tiền hàng' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<WrapperContainer>
				<UpdatePriceTag />
			</WrapperContainer>
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Quản lý Chỉnh sửa giá tiền'>{Page}</BaseLayout>;
};
