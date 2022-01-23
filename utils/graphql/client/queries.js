import { gql } from "@apollo/client";

export const GET_ALL_POSTS = gql`
	query  {
		posts {
			id
			title
			slug
			excerpt
			content {
				html
			}
			featuredPhoto {
				url(
					transformation: {
						image: {
							resize: { width: 360, height: 240, fit: crop }
						}
					}
				)
			}
			category {
				id
				name
			}
			updatedAt
			authors {
				name
				slug
			}
		}
	}
`;

export const GET_FEATURED_POSTS = gql`
	query {
		posts(where: { featuredPost: true }) {
			id
			title
			slug
			excerpt
			featuredPhoto {
				url(
					transformation: {
						image: {
							resize: { width: 290, height: 190, fit: crop }
						}
					}
				)
			}
		}
	}
`;

export const GET_UN_FEATURED_POSTS = gql`
	query {
		posts(where: { featuredPost: false }) {
			id
			title
			slug
			excerpt
			content {
				html
			}
			featuredPhoto {
				url(
					transformation: {
						image: {
							resize: { width: 360, height: 240, fit: crop }
						}
					}
				)
			}
			category {
				id
				name
			}
			updatedAt
			authors {
				name
				slug
			}
		}
	}
`;

export const GET_POST = gql`
	query post($slug: String!) {
		post(where: { slug: $slug }) {
			id
			title
			slug
			excerpt
			content {
				html
			}
			featuredPhoto {
				url
			}
			updatedAt
			category {
				name
				posts(last: 5, where: { slug_not: $slug }) {
					id
					title
					slug
					excerpt
					featuredPhoto {
						url(
							transformation: {
								image: { resize: { height: 64, width: 64 } }
							}
						)
					}
				}
			}
			authors {
				name
				slug
				bio
				photo {
					url(
						transformation: {
							image: { resize: { height: 64, width: 64 } }
						}
					)
				}
			}
			comment {
				id
				name
				email
				comment
				createdAt
			}
		}
	}
`;



export const GET_POST_BY_CATEGORY = gql`
	query posts($slug: String!) {
		posts(where: { category_some: { slug: $slug } }) {
			id
			title
			slug
			excerpt
			content {
				html
			}
			featuredPhoto {
				url
			}
			category {
				id
				name
			}
			updatedAt
			authors {
				name
				slug
			}
		}
		category(where: { slug: $slug }) {
			name
		}
	}
`;

export const RECENT_POSTS = gql`
	query posts($count: Int!) {
		posts(last: $count) {
			id
			title
			excerpt
			featuredPhoto {
				url
			}
		}
	}
`;

export const GET_CATEGORIES = gql`
	query {
		categories {
			id
			name
			slug
			photo {
				url
			}
			featured
		}
	}
`;

export const GET_FEATURED_CATEGORIES = gql`
	query categories($featured: Boolean) {
		categories(where: { featured: $featured }) {
			id
			name
			slug
			photo {
				url
			}
			featured
		}
	}
`;

export const GET_CATEGORY = gql`
	query category($slug: String!) {
		category(where: { slug: $slug }) {
			id
			name
			photo {
				url
			}
		}
	}
`;

// export const GET_COMMENTS = gql`
// 	query comments($id: ID!) {
// 		comments(where: { post: { id: $id } }) {
// 			id
// 			name
// 			email
// 			comment
// 		}
// 	}
// `;
