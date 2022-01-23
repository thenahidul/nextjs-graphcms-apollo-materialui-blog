import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import moment from "moment";
import AuthorSummary from "./AuthorSummary";
import CommentForm from "../Posts/CommentForm";
import { renderCategories } from "../../utils/functions";
import Comments from "./Comments";

const PostSingle = ({ post }) => {
	if (!post) return null;
	return (
		<Box>
			<Paper
				elevation={1}
				sx={{
					p: 2,
					mb: 3,
					border: "1px solid #f8f8f8",
					borderRadius: "5px"
				}}>
				<Card elevation={0}>
					<CardMedia
						component="img"
						image={post.featuredPhoto.url}
						alt={post.title}
						sx={{ p: 1, borderRadius: "5px" }}
					/>
					<CardContent>
						<Typography gutterBottom variant="h6" component="h3">
							{post.title}
						</Typography>
						<div
							dangerouslySetInnerHTML={{
								__html: post.content.html
							}}
						/>
					</CardContent>
					<CardContent
						sx={{ display: "flex", marginBottom: "-20px" }}>
						<Typography
							gutterBottom
							variant="span"
							component="span"
							sx={{
								flexGrow: 1
							}}
							color="text.secondary">
							{renderCategories(post.category)}
						</Typography>
						<Typography
							variant="span"
							component="span"
							color="text.secondary">
							{moment(post.updatedAt).format("MMM do, YYYY")}
						</Typography>
					</CardContent>
				</Card>
			</Paper>
			<Paper
				elevation={1}
				sx={{
					mb: 3,
					p: 2,
					border: "1px solid #f8f8f8",
					borderRadius: "5px"
				}}>
				<AuthorSummary author={post.authors[0]} />
			</Paper>

			<Paper
				elevation={1}
				sx={{
					mb: 3,
					p: 2,
					border: "1px solid #f8f8f8",
					borderRadius: "5px"
				}}>
				<Comments comments={post.comment} />
			</Paper>

			<Paper
				elevation={1}
				sx={{
					mb: 3,
					p: 2,
					border: "1px solid #f8f8f8",
					borderRadius: "5px"
				}}>
				{/* key is necessary to force reload the comment form so post id not cached. otherwise when submit a comment for a post and go to another post and submit a comment for that new post, the comment data remains cached for the previous post and gets submitted for the previous. needs hard reload to submit for the new post*/}
				<CommentForm post={post} key={post.id} />
			</Paper>
		</Box>
	);
};

export default PostSingle;
