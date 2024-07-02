import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import WrapperContainer from '~/components/layouts/WrapperContainer';
import DetailCompany from '~/components/pages/cong-ty/DetailCompany';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Công ty</title>
				<meta name='description' content='Công ty' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<WrapperContainer>
				<DetailCompany />
			</WrapperContainer>
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return (
		<BaseLayout bgLight={true} title='Chi tiết công ty'>
			{Page}
		</BaseLayout>
	);
};
