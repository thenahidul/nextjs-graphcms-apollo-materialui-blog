import client from "../../../utils/apollo/client";
import { GET_RELATED_POSTS } from "../../../utils/graphql/client/queries";

const getRelatedPosts = async (req, res) => {
	const { slug } = req.query;
	console.log(req);
	try {
		const { data } = await client.query({
			query: GET_RELATED_POSTS,
			variables: { slug }
		});
		console.log(data);
		res.status(200).json(data.posts);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

export default getRelatedPosts;
