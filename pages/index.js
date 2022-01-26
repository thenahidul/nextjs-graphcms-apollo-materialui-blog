import Container from "@mui/material/Container";
import Head from "next/head";
import Posts from "../components/Posts/Posts";
import PostsCarousel from "../components/Posts/PostsCarousel";
import styles from "../styles/Home.module.css";

export default function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>Your Next Blog</title>
				<meta
					name="description"
					content="Cool Technologies that are ruling the world"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<Container maxWidth="lg" sx={{ minHeight: "100vh" }}>
					<PostsCarousel />
					<Posts />
				</Container>
			</main>
		</div>
	);
}
