import React, { useEffect, useState } from "react";
import client from "../../utils/apollo/client";
import Head from "next/head";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CategoryWidget from "../../components/Common/Widget/CategoryWidget";
import Banner from "../../components/Header/Banner/Banner";
import PostList from "../../components/Posts/PostList";
import RecentPostWidget from "../../components/Common/Widget/RecentPostWidget";
import {
	GET_CATEGORIES,
	GET_POST_BY_CATEGORY
} from "../../utils/graphql/client/queries";

const PostByCategory = ({ posts, category }) => {
	return (
		<>
			<Head>
				<title>{category && category.name} | Cool Technologies</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Container
				maxWidth="100%"
				sx={{ p: "0 !important", mt: "-40px", mb: "60px" }}>
				<Banner
					title={
						category
							? `Posts from ${category.name}`
							: "No Posts found"
					}
				/>
			</Container>
			<Container maxWidth="lg">
				<Grid container spacing={4}>
					<Grid item md={8}>
						{posts &&
							posts.map((post) => (
								<PostList key={post.id} post={post} />
							))}
					</Grid>
					<Grid item md={4} xs={12}>
						<CategoryWidget />
						<RecentPostWidget />
					</Grid>
				</Grid>
			</Container>
		</>
	);
};

export const getStaticProps = async ({ params }) => {
	const slug = params.slug;

	/* query from GRAPHCMS through our api (pages/api/...) */
	// const data = await fetch(`${process.env.NEXT_API_URI}/category/${slug}`);
	// const json = await data.json();
	// return {
	// 	props: { posts: json.posts, category: json.category }
	// };

	/* query from GRAPHCMS directly */
	const { data } = await client.query({
		query: GET_POST_BY_CATEGORY,
		variables: { slug }
	});

	return {
		props: { posts: data.posts, category: data.category }
	};
};

export const getStaticPaths = async () => {
	/* query from GRAPHCMS through our api (pages/api/...) */

	// const data = await fetch(`${process.env.NEXT_API_URI}/category`);
	// const categories = await data.json();
	// const paths = categories.map(({ slug }) => {
	// 	return {
	// 		params: {
	// 			slug: slug
	// 		}
	// 	};
	// });
	// return {
	// 	paths,
	// 	fallback: false
	// };

	/* query from GRAPHCMS directly */
	const { data } = await client.query({
		query: GET_CATEGORIES
	});

	const paths = data.categories.map(({ slug }) => {
		return {
			params: {
				slug: slug
			}
		};
	});

	return {
		paths,
		fallback: false
	};
};

export default PostByCategory;
