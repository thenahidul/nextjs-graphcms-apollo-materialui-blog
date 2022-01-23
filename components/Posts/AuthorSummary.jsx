import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import Avatar from "@mui/material/Avatar";

const AuthorSummary = ({ author }) => {
	return (
		<Card elevation={0} sx={{ display: "flex" }}>
			<Avatar
				alt={author.name}
				src={author.photo && author.photo.url}
				sx={{ width: 64, height: 64 }}
			/>
			<CardContent sx={{ flexGrow: 1, pt: 0 }}>
				<Typography gutterBottom variant="h6" component="h4">
					Posted By {author.name}
				</Typography>
				<Typography gutterBottom variant="body2" component="h3">
					{author.bio}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default AuthorSummary;
