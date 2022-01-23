import "../styles/globals.css";
import Layout from "../components/Layout";
import { ApolloProvider } from "@apollo/client";
import client from "../utils/apollo/client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NextNprogress from "nextjs-progressbar";
import App from "next/app";


const theme = createTheme({

	typography: {
		fontFamily: ['"Montserrat"', '"sans-serif"'].join(",")
		// fontSize: 14
		// h1: { // h1 variant, not h1 tag
		// 	fontSize: 3
		// }
	}
});

function MyApp({ Component, pageProps }) {
	return (
		<ApolloProvider client={client}>
			<ThemeProvider theme={theme}>
				<Layout>
					<NextNprogress
						options={{ easing: "ease", speed: 500 }}
						color="tomato"
						startPosition={0.3}
						stopDelayMs={200}
						height={7}
						showOnShallow={true}
					/>
					<Component {...pageProps} />
				</Layout>
			</ThemeProvider>
		</ApolloProvider>
	);
}

// MyApp.getInitialProps = async (appContext) => {

// 	const appProps = await App.getInitialProps(appContext);

// 	return { ...appProps };
// };

export default MyApp;
