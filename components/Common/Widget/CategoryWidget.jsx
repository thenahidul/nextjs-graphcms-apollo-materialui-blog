import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { GET_CATEGORIES } from "../../../utils/graphql/client/queries";
import { useQuery } from "@apollo/client";

const CategoryWidget = () => {
	const [categories, setCategories] = useState([]);

	/* query from GRAPHCMS directly */
	const { loading, error, data } = useQuery(GET_CATEGORIES);
	useEffect(() => {
		if (!loading && !error) {
			setCategories(data.categories);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading]);

	/* query from GRAPHCMS through our api(pages/api/...) */

	// const fetchCategories = async () => {
	// 	const data = await fetch(`${process.env.NEXT_API_URI}/category`);
	// 	setCategories(await data.json());
	// };

	// useEffect(() => {
	// 	// fetchCategories();
	// }, []);

	return (
		<Box sx={{ mb: 3 }}>
			<Paper elevation={2}>
				<Typography
					sx={{ p: 3, pb: 2, borderBottom: "1px solid #eee" }}
					variant="h6"
					component="h3">
					Categories
				</Typography>
				<MenuList sx={{ py: 0 }}>
					{categories.map((category) => (
						<MenuItem key={category.id} sx={{ p: 1, px: 3 }}>
							<Link href={`/category/${category.slug}`} passHref>
								<ListItemText primary={category.name} />
							</Link>
						</MenuItem>
					))}
				</MenuList>
			</Paper>
		</Box>
	);
};

export default CategoryWidget;
