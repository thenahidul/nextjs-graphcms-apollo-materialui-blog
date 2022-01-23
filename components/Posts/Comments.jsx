import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Link from "next/link";

const Comments = ({ comments }) => {
	// console.log(comments);
	return (
		<Box>
			<Typography
				sx={{ pb: 1, mb: 2, borderBottom: "1px solid #eee" }}
				variant="h6"
				component="h4">
				Total Comments ({comments.length})
			</Typography>
			<List
				sx={{
					bgcolor: "background.paper"
				}}>
				{comments.map((comment, i) => (
					<Box key={comment.id}>
						<ListItem key={comment.id} alignItems="flex-start">
							<ListItemAvatar>
								<Avatar>
									{comment.name.charAt(0).toUpperCase()}
								</Avatar>
							</ListItemAvatar>
							<ListItemText
								primary={comment.name}
								secondary={comment.comment}
							/>
						</ListItem>
						{i < comments.length - 1 ? <Divider /> : null}
					</Box>
				))}
			</List>
		</Box>
	);
};

export default Comments;
