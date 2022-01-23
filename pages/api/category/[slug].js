import client from "../../../utils/apollo/client";
import { GET_POST_BY_CATEGORY } from "../../../utils/graphql/client/queries";

const getCategoryPost = async (req, res) => {
	const { slug } = req.query;

	try {
		const { data } = await client.query({
			query: GET_POST_BY_CATEGORY,
			variables: { slug }
		});
		// console.log(data);

		res.status(200).json({ posts: data.posts, category: data.category });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

export default getCategoryPost;
