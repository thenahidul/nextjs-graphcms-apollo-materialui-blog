import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import moment from "moment";
import Link from "next/link";
import { renderCategories } from "../../utils/functions";

const PostList = ({ post }) => {
	// console.log(post);
	return (
		<Grid item xs={12} sx={{ mb: 5 }}>
			<Card>
				<Link href={`/post/${post.slug}`} passHref key={post.passHref}>
					<CardActionArea>
						<CardMedia
							component="img"
							image={post.featuredPhoto.url}
							alt={post.title}
							height={300}
							sx={{ objectFit: "cover" }}
						/>
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
						<CardContent sx={{pb: 3}}>
							<Typography
								gutterBottom
								variant="h6"
								component="h3">
								{post.title}
							</Typography>
							<Typography variant="body2" color="text.secondary">
								{post.excerpt}
							</Typography>
						</CardContent>
					</CardActionArea>
				</Link>
			</Card>
		</Grid>
	);
};

export default PostList;
