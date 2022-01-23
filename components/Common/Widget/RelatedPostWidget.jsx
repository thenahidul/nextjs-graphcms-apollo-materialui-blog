import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import _ from "lodash";
import Link from "next/link";

const RelatedPostWidget = ({ posts }) => {
	// console.log(posts);

	// const flatten = _.flatten(posts);
	const relatedPosts = _.uniqWith(_.flatten(posts), _.isEqual); // first flatten multi-dimensional array, then remove dublicate post objects
	// console.log(relatedPosts);

	// get randomly five posts from the relatedPosts
	const shuffled = relatedPosts.sort(() => 0.5 - Math.random());
	const five_relatedPosts = shuffled.slice(0, 5);

	if (!relatedPosts.length) return null;

	return (
		<Box sx={{ mb: 3 }}>
			<Paper elevation={2}>
				<Typography
					sx={{ p: 2, pb: 2, borderBottom: "1px solid #eee" }}
					variant="h6"
					component="h3">
					Related Posts
				</Typography>
				<List
					sx={{
						py: 0,
						width: "100%",
						bgcolor: "background.paper"
					}}>
					{five_relatedPosts.map((post) => (
						<Link
							key={post.id}
							href={`/post/${post.slug}`}
							passHref>
							<ListItemButton>
								<ListItem alignItems="flex-start">
									<ListItemAvatar>
										<Avatar
											alt={post.title}
											src={post.featuredPhoto.url}
										/>
									</ListItemAvatar>
									<ListItemText
										primary={post.title}
										secondary={post.excerpt.slice(0, 50)}
									/>
								</ListItem>
							</ListItemButton>
						</Link>
					))}
				</List>
			</Paper>
		</Box>
	);
};

export default RelatedPostWidget;
