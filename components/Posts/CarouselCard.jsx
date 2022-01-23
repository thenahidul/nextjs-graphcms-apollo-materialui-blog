import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import Link from "next/link";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

const CarouselCard = ({ post }) => {
	return (
		<Card>
			<Link href={`/post/${post.slug}`} passHref key={post.passHref}>
				<CardActionArea>
					<ImageListItem component="div" sx={{ display: "block" }}>
						<CardMedia
							component="img"
							image={post.featuredPhoto.url}
							alt={post.title}
						/>
						<ImageListItemBar
							title={post.title}
							subtitle={post.excerpt}
						/>
					</ImageListItem>
				</CardActionArea>
			</Link>
		</Card>
	);
};

export default CarouselCard;
