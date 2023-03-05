/// <reference types="cypress" />

import { loadMovies } from "../../src/movies.js";
const url = "http://localhost:5080/";

it("Check movie details and DOM elements are loaded", async () => {
	const movieList = await loadMovies();

	movieList.data.forEach((movie) => {
		cy.visit(`${url}movie/${movie.id}`);

		cy.get(".movie-poster").should("exist");
		cy.get(".movie-title").contains(movie.attributes.title);
//		cy.get(".movie-description").should("exist");
		cy.get(".movie-description").contains(movie.attributes.intro.slice(8, 24));
		cy.get(".movie-rating").should("not.be.empty");
		cy.get(".movie-rating-hats").find("li").its("length").should("eq", 5);
		cy.get(".add-review-button").should("exist");
		cy.get("#reviewList").find("li").its("length").should("be.at.least", 2);
		cy.get("#buttonPrev").should("exist");
		cy.get("#buttonNext").should("exist");
	});
});
