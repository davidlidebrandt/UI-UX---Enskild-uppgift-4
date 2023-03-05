import express from "express";
import { postReview } from "./addReviewServer.js";
import getMovieRating from "./getMovieRating.js";
import { loadMovie } from "./movies.js";
import { getReviewsForMovieWithId } from "./reviewList.js";
import loadScreenings from "./loadScreenings.js";
import { filterScreenings } from "./filterScreenings.js";
import { login, isAuthenticated } from "./auth.js";

const apiRouter = express.Router();

apiRouter.post("/token", (req, res) => { 
	login(req, res);
})

apiRouter.post("/movies/:movieId/reviews", isAuthenticated, express.json(), async (req, res) => {
	if (req.params.movieId === "TEST") {
		res.status(200).json({ message: "Hi, I am a middleware testing endpoint, if you tried to post a review try a proper ID."})
		return;
	};
	postReview(req, res);
});

apiRouter.get("/movies/:id/rating", async (req, res) => {
	const id = req.params.id;
	const movie = await loadMovie(id);
	const rating = await getMovieRating(id, movie.data.attributes.imdbId);

	if (rating.Response == "False") {
		res.status(502).send({ rating: "API Error" });
	} else {
		res.status(200).send({ rating: rating.toFixed(1) });
	}
});

apiRouter.get("/movies/:id/reviews", async (req, res) => {
	const page = req.query.page;
	const id = req.params.id;
	const response = await getReviewsForMovieWithId(id, page);
	res.status(200).json(response);
});

apiRouter.get("/screenings", async (req, res) => {
	let data;
	let filteredScreenings;
	try {
		data = await loadScreenings();
		filteredScreenings = filterScreenings(data);
		res.json(filteredScreenings);
	} catch (error) {
		res.status(error.response.status).json(error);
	}
});

export default apiRouter;
