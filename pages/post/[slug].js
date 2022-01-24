import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Head from "next/head";
import Banner from "../../components/Header/Banner/Banner";
import PostDetail from "../../components/Posts/PostDetail";
import CategoryWidget from "../../components/Common/Widget/CategoryWidget";
import RelatedPostWidget from "../../components/Common/Widget/RelatedPostWidget";
import { GET_POST, GET_ALL_POSTS } from "../../utils/graphql/client/queries";
import client from "../../utils/apollo/client";

const PostSingle = ({ post }) => {
	return (
		<>
			<Head>
				<title>{post && post.title} | Cool Technologies</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Container
				maxWidth="100%"
				sx={{ p: "0 !important", mt: "-40px", mb: "60px" }}>
				<Banner title={post && post.title} />
			</Container>
			<Container maxWidth="lg">
				<Grid container spacing={4}>
					<Grid item md={8}>
						<PostDetail post={post} />
					</Grid>
					<Grid item md={4} xs={12}>
						<CategoryWidget />
						<RelatedPostWidget
							posts={post && post.category.map(
								(category) => category.posts
							)}
						/>
					</Grid>
				</Grid>
			</Container>
		</>
	);
};

export const getStaticProps = async ({ params }) => {
	const slug = params.slug;

	/* query from GRAPHCMS through our api (pages/api/...) */
	// const data = await fetch(`${process.env.NEXT_API_URI}/post/${slug}`);
	// const json = await data.json();
	// return {
	// 	props: { post: a.data }
	// };

	/* query from GRAPHCMS directly */
	const { data } = await client.query({
		query: GET_POST,
		variables: { slug }
	});

	return {
		props: { post: data.post }
	};
};

export const getStaticPaths = async () => {
	/* query from GRAPHCMS through our api (pages/api/...) */

	// const data = await fetch(`${process.env.NEXT_API_URI}/post`);
	// const posts = await data.json();
	// const paths = posts.map((post) => {
	// 	return {
	// 		params: {
	// 			slug: post.slug
	// 		}
	// 	};
	// });
	// return {
	// 	paths,
	// 	fallback: false
	// };

	/* query from GRAPHCMS directly */
	const { data } = await client.query({
		query: GET_ALL_POSTS
	});

	const paths = data.posts.map((post) => {
		return {
			params: {
				slug: post.slug
			}
		};
	});

	return {
		paths,
		fallback: false
	};
};

export default PostSingle;
