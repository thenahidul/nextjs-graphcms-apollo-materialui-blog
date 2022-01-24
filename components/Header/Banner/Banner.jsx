import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import BannerImg from "../../../public/images/banner.jpg";

const styles = {
	boxContainer: {
		backgroundImage: `url(${BannerImg.src})`,
		backgroundRepeat: "no-repeat",
		backgroundSize: "cover",
		backgroundAttachment: "fixed",
		backgroundPosition: "center",
		height: "400px",
		textAlign: "center",
	}
};

const Banner = ({ title }) => {
	const router = useRouter();

	const breadcumb = () => {
		// if (data.breadcumb == false) return;
		const paths = router.asPath
			.split("/")
			.filter((path) => path)
			.map((path) => path.charAt(0).toUpperCase() + path.slice(1))
			.join(" / ");

		return paths;
	};

	return (
		<Box
			elevation={0}
			style={styles.boxContainer}
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center"
			}}>
			<Typography variant="h3" component="h1" color="#fff">
				{title}
			</Typography>
			<Typography variant="body1" component="p" color="#eee">{breadcumb()}
			</Typography>
		</Box>
	);
};

export default Banner;
