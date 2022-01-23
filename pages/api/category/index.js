import client from "../../../utils/apollo/client";
import {
	GET_FEATURED_CATEGORIES,
	GET_CATEGORIES
} from "../../../utils/graphql/client/queries";

const getCategoryList = async (req, res) => {
	const { featured } = req.query;

	try {
		const { data } = await client.query({
			query: featured ? GET_FEATURED_CATEGORIES : GET_CATEGORIES,
			variables: { featured: true } // works for GET_FEATURED_CATEGORIES only
		});
		res.status(200).json(data.categories);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

export default getCategoryList;
