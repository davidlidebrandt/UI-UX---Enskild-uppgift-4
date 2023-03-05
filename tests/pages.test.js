import { describe, expect, test } from "@jest/globals";
import { marked } from "marked";
import { loadMovie, loadMovies } from "../src/movies.js";
import request from "supertest";
import app from "../src/app.js";



describe("Integrationtests", () => {

	test("First page shows title of all movies", async () => {
		const response = await request(app)
		.get("/")
		.expect(200)
		.expect("Content-Type", "text/html; charset=utf-8");

		const movieList = await loadMovies();

		movieList.data.forEach((movie) => {
			expect(response.text.includes(movie.attributes.title)).toBeTruthy();
		});
	});

	test("Shows correct information on each individual movie page", async () => {
		const movieList = await loadMovies();

		for (let i=1; i<=movieList.data.length; i++) {
			const response = await request(app)
				.get("/movie/" + i)
				.expect("Content-Type", "text/html; charset=utf-8")
				.expect(200);

			const apiResponse = await loadMovie(i);


			expect(response.text).toMatch(apiResponse.data.attributes.title);
			expect(response.text).toMatch(marked.parseInline(apiResponse.data.attributes.intro));

			// No to have another movie title on the page
			if (i !== 1) {
				expect(response.text.includes(`${movieList.data[i-1].attributes.title}`)).toBeFalsy();
			} else {
				expect(response.text.includes(`${movieList.data[i+1].attributes.title}`)).toBeFalsy();
			}
		};
		
	});

	test("Encanto page returns Encanto information", async () => {
		const response = await request(app)
			.get("/movie/2")
			.expect("Content-Type", "text/html; charset=utf-8")
			.expect(200);

		expect(response.text.includes("Encanto")).toBeTruthy();
		expect(response.text.includes("Shawshank")).toBeFalsy();
	});

	test("404 when requesting wrong page", async () => {
		const response = await request(app)
			.get("/movie/22353735724512331235465")
			.expect("Content-Type", "text/html; charset=utf-8")
			.expect(404);

		expect(response.text.includes("Shawshank")).toBeFalsy();
	});
});