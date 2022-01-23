import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CarouselCard from "./CarouselCard";

const responsive = {
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 4,
		slidesToSlide: 3
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 3,
		slidesToSlide: 2 // optional, default to 1.
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1,
		slidesToSlide: 1 // optional, default to 1.
	}
};

const PostsCarousel = ({ posts }) => {
	return (
		<>
			{posts && (
				<Carousel
					// centerMode={true}
					swipeable={true}
					draggable={true}
					showDots={false}
					responsive={responsive}
					ssr={true}
					infinite={true}
					autoPlay={false}
					autoPlaySpeed={5000}
					keyBoardControl={true}
					transitionDuration={500}
					containerClass="carousel-container"
					removeArrowOnDeviceType={["tablet", "mobile"]}
					dotListClass="custom-dot-list-style"
					itemClass="carousel-item-padding-40-px carousel-item-margin-20-px">
					{posts.map((post) => (
						<CarouselCard post={post} key={post.id} />
					))}
				</Carousel>
			)}
		</>
	);
};

export default PostsCarousel;
