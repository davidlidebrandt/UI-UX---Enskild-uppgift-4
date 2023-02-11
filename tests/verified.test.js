import { describe, expect, test } from "@jest/globals";
import { loadReviewsForMovie } from "../src/movies.js";
import { apiAdapter } from "../src/reviewList.js";

const API_BASE = "https://plankton-app-xhkom.ondigitalocean.app/api/";

describe("Tests the API for filtering only verified reviews", () => {

    // Tested both things at once to avoid calling the same functions and repeating code to mutch
    test("Tests the returned list of reviews for rating and reviews", async () => {
        // Get the number of movies
        const res = await fetch(`${API_BASE}movies`);
        const data = await res.json();
        
        // Tests all movies
        for(let i=1; i<=data.data.length; i++) {
            
            const rateReviewList = await loadReviewsForMovie(i);
            
            // Tests that all reviews are verified
            rateReviewList.forEach(review => {

                expect(review.attributes.verified).toBeTruthy();
            });

            // Tests that loadReviewsForMovie got as many verified reviews as there are verfied reviews for that movie
            const res2 = await fetch(`${API_BASE}reviews?filters[movie]=${i}`);
            const checkAllReviews = await res2.json();

            let rateCheck = 0;

            checkAllReviews.data.forEach(controllReview => {
                
                if (controllReview.attributes.verified) {

                    rateCheck++
                }
            })

            expect(rateReviewList.length).toBe(rateCheck);

            let reviewCheck = 0;
            // Tests all reviews for all the pages that they are verified
            const reviewsList = await apiAdapter(i, 1);

            for(let j=1; j<=reviewsList.data.meta.pagination.pageCount; j++) {

                let currentPageReviews = await apiAdapter(i, j);

                currentPageReviews.data.data.forEach(rev => {

                    expect(rev.attributes.verified).toBeTruthy();
                    
                    if (rev.attributes.verified) {
                        reviewCheck++;
                    }
                })
            }

            expect(reviewCheck).toBe(rateCheck);
        }
    });
});