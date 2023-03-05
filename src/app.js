import express from "express";
import { marked } from "marked";
import expressLayouts from "express-ejs-layouts";
import { loadMovie, loadMovies } from "./movies.js";
import apiRouter from "./api.js";

const app = express();

app.set("view engine", "ejs");
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);

app.use(expressLayouts);

app.use("/api", apiRouter);

app.get("/", async (req, res) => {
	const movies = await loadMovies();

	res.render("pages/home", {
		title: "Tomtens Biograf!",
		movies
	});
});

const VIEWS = [
	{
		path: "/about",
		file: "pages/about",
		options: { title: "Tomtens Biograf - om oss!" }
	},
	{
		path: "/open",
		file: "pages/open",
		options: { title: "Tomtens Biograf - Öppettider & Kontakt" }
	},
	{
		path: "/barbistro",
		file: "pages/barAndBistro",
		options: { title: "Tomtens Biograf" }
	},
	{
		path: "/coming",
		file: "pages/comingPremieres",
		options: { title: "Tomtens Biograf" }
	},
	{
		path: "/giftcert",
		file: "pages/giftcertificate",
		options: { title: "Tomtens Biograf" }
	},
	{
		path: "/newsletter",
		file: "pages/newsletter",
		options: { title: "Tomtens Biograf" }
	},
	{
		path: "/placeholder",
		file: "pages/placeholder",
		options: { title: "Tomtens Biograf" }
	},
	{
		path: "/ticketInfo",
		file: "pages/ticketInfo",
		options: { title: "Tomtens Biograf" }
	},
	{
		path: "/tickets",
		file: "pages/tickets",
		options: { title: "Tomtens Biograf" }
	}
];

VIEWS.forEach((view) => {
	app.get(view.path, async (req, res) => {
		res.render(view.file, view.options);
	});
});

app.get("/movie/:movieId", async (req, res) => {
	const movie = await loadMovie(req.params.movieId);
	if (movie.err) {
		res.status(404).render("pages/404", {
			title: "OH NOES"
		});
	} else if (movie) {
		res.render("pages/movie", {
			id: movie.data.id,
			movieDetails: movie.data.attributes,
			title: movie.data.attributes.title,
			marked
		});
	}
});

app.use("/", express.static("./static"));

app.get("/**", async (req, res) => {
	res.status(404).render("pages/404", {
		title: "404"
	});
});

export default app;
