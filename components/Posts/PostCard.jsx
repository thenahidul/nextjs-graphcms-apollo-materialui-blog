import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { renderCategories } from "../../utils/functions";

const PostCard = ({ post }) => {
	const router = useRouter();
	// const actionHandler = () => {
	// 	router.push(`/post/${post.slug}`);
	// };

	return (
		<Grid item md={4} sm={6} xs={12}>
			<Card>
				<Link href={`/post/${post.slug}`} passHref key={post.passHref}>
					<CardActionArea>
						<CardMedia
							component="img"
							image={post.featuredPhoto.url}
							alt={post.title}
						/>
						<CardContent
							sx={{
								p: 2,
								display: "flex",
								marginBottom: "-20px"
							}}>
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
						<CardContent sx={{ p: 2 }}>
							<Typography
								gutterBottom
								variant="h6"
								component="h3">
								{post.title}
							</Typography>

							<Typography variant="body2" color="text.secondary">
								{post.excerpt.slice(0, 100)}...
							</Typography>
						</CardContent>
					</CardActionArea>
				</Link>
			</Card>
		</Grid>
	);
};

export default PostCard;
