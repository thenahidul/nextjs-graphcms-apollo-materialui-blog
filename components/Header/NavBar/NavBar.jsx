import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { GET_FEATURED_CATEGORIES } from "../../../utils/graphql/client/queries";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

const NavBar = () => {
	const [mobileMenu, setMobileMenu] = useState(false);
	const [categories, setCategories] = useState([]);

	/* query to GRAPHCMS directly */
	const { loading, error, data } = useQuery(GET_FEATURED_CATEGORIES, {
		variables: { featured: true }
	});

	useEffect(() => {
		if (!loading && !error) {
			setCategories(data.categories);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading]);

	/* query to GRAPHCMS through our api(pages/api/...) */
	// const fetchCategories = async () => {
	// 	const data = await fetch(
	// 		`${process.env.NEXT_API_URI}/category?featured=1`
	// 	);
	// 	setCategories(await data.json());
	// };

	// useEffect(() => {
	// 	fetchCategories();
	// }, []);

	const handleMobileMenu = () => {
		setMobileMenu(!mobileMenu);
	};

	return (
		<div>
			<AppBar postion="static">
				<Container maxWidth="lg">
					<Toolbar>
						<Typography
							variant="h6"
							component="div"
							sx={{
								mr: 2,
								ml: -3,
								flexGrow: 1
							}}>
							<Link href="/">LOGO</Link>
						</Typography>
						<Box
							sx={{
								display: {
									md: "flex",
									xs: mobileMenu ? "block" : "none"
								},
								position: { xs: "absolute", md: "static" },
								backgroundColor: {
									xs: "#0c73d5",
									md: "transparent"
								},
								right: { xs: 0 },
								top: { xs: "64px" },
								minWidth: { xs: "180px", md: "auto" },
								borderRadius: { xs: "5px", md: 0 },
								border: {
									xs: "1px solid rgb(247 247 247 / 50%)",
									md: "none"
								}
							}}>
							{categories.map((category) => (
								<Button
									href={`/category/${category.slug}`}
									key={category.id}
									sx={{
										my: 2,
										mx: 1,
										color: "white",
										display: "block",
										textAlign: "center"
									}}>
									{category.name}
								</Button>
							))}
						</Box>
						<IconButton
							onClick={handleMobileMenu}
							size="large"
							edge="start"
							color="inherit"
							aria-label="menu"
							sx={{
								mr: 2,
								display: { xs: "block", md: "none" }
							}}>
							<MenuIcon />
						</IconButton>
					</Toolbar>
				</Container>
			</AppBar>
		</div>
	);
};

export default NavBar;
