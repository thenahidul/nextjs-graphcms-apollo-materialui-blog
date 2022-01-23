import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import PostCard from "./PostCard";
import { useQuery } from "@apollo/client";
import {
	GET_UN_FEATURED_POSTS,
	GET_FEATURED_POSTS
} from "../../utils/graphql/client/queries";
import PostsCarousel from "./PostsCarousel";

const Posts = () => {
	const [posts, setPosts] = useState([]);
	const [featuredPosts, setFeaturedPosts] = useState([]);

	const {
		loading: featuredPostLoading,
		error: featuredPostError,
		data: featuredPostData
	} = useQuery(GET_FEATURED_POSTS);

	// console.log(featuredPosts);

	/* query from GRAPHCMS directly */
	const { loading, error, data } = useQuery(GET_UN_FEATURED_POSTS);
	useEffect(() => {
		if (!loading && !error) {
			setPosts(data.posts);
		}
		if (!featuredPostLoading && !featuredPostError) {
			setFeaturedPosts(featuredPostData.posts);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading, featuredPostLoading]);

	/* query from GRAPHCMS through our api(pages/api/...) */

	// const fetchPosts = async () => {
	// 	const data = await fetch(`${process.env.NEXT_API_URI}/post`);
	// 	setPosts(await data.json());
	// };
	// useEffect(() => {
	// 	fetchPosts();
	// }, []);

	// console.log(posts);
	return (
		<>
			{featuredPostLoading ? (
				<Typography component="div" variant="h4" align="center">
					Loading...
				</Typography>
			) : (
				<Box my={5} pt={1}>
					<PostsCarousel posts={featuredPosts} />
				</Box>
			)}

			<Grid container spacing={3}>
				{posts.map((post) => (
					<PostCard post={post} key={post.id} />
				))}
			</Grid>
		</>
	);
};

export default Posts;
