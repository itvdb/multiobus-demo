/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "tailwindui.com",
				port: "",
				pathname: "/img/logos/mark.svg",
			},
			{
				protocol: "https",
				hostname: "images.unsplash.com",
				port: "",
				pathname: "/photo-1472099645785-5658abf4ff4e",
			},
		],
	},
};

module.exports = nextConfig;
