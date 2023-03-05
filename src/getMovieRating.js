import { loadReviewsForMovie } from "./movies.js";
import { loadIMDBMovieRating } from "./omdbapi.js";

export default async function getMovieRating(movieID, imdbID, reviewSource1 = loadReviewsForMovie(movieID), reviewSource2 = loadIMDBMovieRating(imdbID)) {
	
	const reviewList = await reviewSource1;
	let rating = 0;

	if (reviewList.length >= 5) {

		for (let review of reviewList) {
			rating += review.attributes.rating;
		}

		return (rating /= reviewList.length);

	} else {

		return await reviewSource2;

	}
}
