import client from "../../../utils/apollo/client";
import { GET_POST } from "../../../utils/graphql/client/queries";

const getPost = async (req, res) => {
	const { slug } = req.query;

	try {
		const { data } = await client.query({
			query: GET_POST,
			variables: { slug: slug }
		});

		res.status(200).json({ post: data.post });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

export default getPost;
