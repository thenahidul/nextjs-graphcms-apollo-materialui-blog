import client from "../../../utils/apollo/client";
import { GET_POSTS } from "../../../utils/graphql/client/queries";

const getPosts = async (req, res) => {
	try {
		const { data } = await client.query({
			query: GET_POSTS
		});
		res.status(200).json(data.posts);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

export default getPosts;
