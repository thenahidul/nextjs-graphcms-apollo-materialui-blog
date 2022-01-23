import { gql } from "@apollo/client";
 
export const MAKE_COMMENT = gql`
	mutation createComment(
		$name: String!
		$email: String!
		$comment: String!
		$postId: ID!
	) {
		createComment(
			data: {
				name: $name
				email: $email
				comment: $comment
				post: { connect: { id: $postId } }
			}
		) {
			id
			name
			email
			comment
			post {
				id
				title
			}
		}
	}
`;
