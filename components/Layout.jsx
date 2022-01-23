import React from "react";
import Footer from "./Footer/Footer";
import NavBar from "./Header/NavBar/NavBar";

const Layout = ({ children }) => {
	return (
		<div>
			<NavBar />
			<div style={{ marginTop: "100px" }}>{children}</div>
			<Footer />
		</div>
	);
};

export default Layout;
