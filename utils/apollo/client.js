import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
	uri: process.env.GRAPHCMS_API,
	cache: new InMemoryCache(),
	onError: (e) => {
		console.log(e);
	}
});

export default client;
