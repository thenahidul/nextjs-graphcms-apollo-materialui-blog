import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { RECENT_POSTS } from "../../../utils/graphql/client/queries";

const RecentPostWidget = () => {
	const [posts, setPosts] = useState([]);

	const { loading, error, data } = useQuery(RECENT_POSTS, {
		variables: { count: 5 }
	});
	useEffect(() => {
		if (!loading && !error) {
			setPosts(data.posts);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading]);

	return (
		<Box sx={{ mb: 3 }}>
			<Paper elevation={2}>
				<Typography
					sx={{ p: 2, pb: 2, borderBottom: "1px solid #eee" }}
					variant="h6"
					component="h3">
					Recent Posts
				</Typography>
				<List
					sx={{
						py: 0,
						width: "100%",
						bgcolor: "background.paper"
					}}>
					{posts.map((post) => (
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

export default RecentPostWidget;
