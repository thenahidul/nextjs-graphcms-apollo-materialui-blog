import { useState, useEffect, useRef } from "react";
import { useMutation } from "@apollo/client";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { MAKE_COMMENT } from "../../utils/graphql/client/mutation";

const CommentForm = ({ post }) => {
	const [formResponse, setFormResponse] = useState("");

	const [errors, setErrors] = useState({ name: "", email: "", comment: "" });
	const [commentData, setCommentData] = useState({
		name: "",
		email: "",
		comment: "",
		postId: post.id
	});

	const checkboxEl = useRef(null);

	useEffect(() => {
		let user = localStorage.getItem("user");
		if (user) {
			user = JSON.parse(user);
			setCommentData((prevState) => ({
				...prevState,
				name: user.name,
				email: user.email
			}));
		}
	}, []);

	const handleChange = ({ currentTarget: input }) => {
		setCommentData((prevState) => ({
			...prevState,
			[input.name]: input.value
		}));
	};

	const [createComment, { data, loading, error }] = useMutation(MAKE_COMMENT);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const notValidate = inputValidator();
		if (notValidate) return; // terminate the submit if validation failed

		// no errors, start processing the submit
		setFormResponse("Wait, your comment is being submitted...");

		/* mutation to GRAPHCMS directly */
		await createComment({
			variables: commentData,
			context: {
				headers: {
					Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`
				}
			}
		});

		loading
			? setFormResponse("Wait, your comment is being submitted...")
			: setFormResponse(
					"You comment is submitted. It'll be published once reviewed."
			  );

		/* mutation to GRAPHCMS through our api (api/post/comment.js) */
		// const data = await fetch(`${process.env.NEXT_API_URI}/post/comment`, {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json"
		// 	},
		// body: JSON.stringify(commentData)
		// });
		// const { post, success } = await data.json();
		// loading
		// 	? setFormResponse(
		// 			"You comment is submitted. It'll be published once reviewed."
		// 	  )
		// 	: setFormResponse("Something went wrong! Please try again.");

		// localStorage.removeItem("user");
		handleLocalStorageSave(checkboxEl.current.children[0]);
	};

	const inputValidator = () => {
		let error = false;
		for (let item in commentData) {
			if (!commentData[item].trim()) {
				error = true;
				setErrors((prevState) => ({
					...prevState,
					[item]: `${item} cannot be empty`
				}));
			} else {
				// error = false;
				setErrors((prevState) => ({
					...prevState,
					[item]: ""
				}));
			}
		}
		// console.log(error);
		return error;
	};

	const handleLocalStorageSave = (input) => {
		const user = {
			name: commentData.name.trim(),
			email: commentData.email.trim()
		};
		if (user.name && user.email) {
			if (input.checked) {
				localStorage.setItem("user", JSON.stringify(user));
			} else {
				localStorage.removeItem("user");
			}
		}
	};

	return (
		<Box
			sx={{ p: 1 }}
			component="form"
			noValidate
			autoComplete="off"
			onSubmit={handleSubmit}>
			<TextField
				error={errors.name ? true : false}
				helperText={errors.name}
				value={commentData.name}
				onChange={handleChange}
				name="name"
				fullWidth
				label="Name"
				variant="outlined"
				size="normal"
				sx={{ mb: 2 }}
			/>
			<TextField
				error={errors.email ? true : false}
				helperText={errors.email}
				value={commentData.email}
				onChange={handleChange}
				name="email"
				type="email"
				fullWidth
				label="Email"
				variant="outlined"
				size="normal"
				sx={{ mb: 2 }}
			/>
			<TextField
				error={errors.comment ? true : false}
				helperText={errors.comment}
				onChange={handleChange}
				name="comment"
				multiline
				rows={4}
				fullWidth
				label="Message"
				variant="outlined"
				sx={{ mb: 2 }}
			/>
			<FormControlLabel
				control={<Checkbox ref={checkboxEl} />}
				label="Remember name and email"
			/>
			<Button type="submit" size="large" fullWidth variant="contained">
				Add Comment
			</Button>
			<Typography align="center" p={2} variant="body1" component="p">
				{formResponse}
			</Typography>
		</Box>
	);
};

export default CommentForm;
