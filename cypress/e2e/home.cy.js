/// <reference types="cypress" />

import { loadMovies } from "../../src/movies.js";
const url = "http://localhost:5080/";

it("Check that all film titles are present and no more then 10 screenings are shown in the aside", async () => {
    cy.visit(url);

    const movieList = await loadMovies();
    
    movieList.data.forEach(movie => {
        cy.get('.current-movies-list').contains(movie.attributes.title);
    })

    cy.get(".showtimes").find("li").its("length").should("be.lessThan", 11);
});