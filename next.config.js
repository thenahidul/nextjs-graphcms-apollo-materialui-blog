module.exports = {
	reactStrictMode: true,
	images: {
		domains: ["graphcms.com", "graphassets.com"]
	},
	env: {
		NEXT_API_URI: process.env.NEXT_PUBLIC_API_URI,
		GRAPHCMS_API: process.env.NEXT_PUBLIC_GRAPHCMS_API,
		GRAPHCMS_TOKEN: process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN
	}
};
