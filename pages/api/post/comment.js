import client from "../../../utils/apollo/client";
import { MAKE_COMMENT } from "../../../utils/graphql/client/mutation";

const makeComment = async (req, res) => {
	const commentData = req.body;
	// console.log(commentData.postId);
	try {
		const { data } = await client.mutate({
			mutation: MAKE_COMMENT,
			variables: {
				name: commentData.name,
				email: commentData.email,
				comment: commentData.comment,
				postId: commentData.postId
			},
			context: {
				headers: {
					Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`
				}
			}
		});

		res.status(200).json({ post: data.createComment, success: true });
	} catch (error) {
		res.status(400).json({ error: error.message, success: false });
	}
};

export default makeComment;
