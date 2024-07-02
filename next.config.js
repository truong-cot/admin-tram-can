/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
			{
				protocol: 'http',
				hostname: '**',
			},
		],
	},
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: 'http://192.168.0.128:8080/api/v1/:path*',
			},
		];
	},
};

module.exports = nextConfig;
