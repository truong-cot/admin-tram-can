import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import LayoutPages from '~/components/layouts/LayoutPages';
import {PATH} from '~/constants/config';
import MainOther from '~/components/pages/thong-ke-log/MainOther';
export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Thống kê khác</title>
				<meta name='description' content='Thống kê khác' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<LayoutPages
				listPages={[
					{
						title: 'Dữ liệu cân',
						url: PATH.ThongKeDuLieuCan,
					},
					{
						title: 'Dữ liệu kho',
						url: PATH.ThongKeDuLieuKho,
					},
					{
						title: 'Kế toán & tài chính',
						url: PATH.ThongKeKeToanTaiChinh,
					},
					{
						title: 'Khác',
						url: PATH.ThongKeKhac,
					},
				]}
			>
				<MainOther />
			</LayoutPages>
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Thống kê log'>{Page}</BaseLayout>;
};
