import { getReviewsForMovieWithId } from "../src/reviewList.js";
import { describe, expect, test } from "@jest/globals";

const exampleResponse1 = {
	data: {
		data: [
			{
				id: 1,
				attributes: {
					comment: "I don't like this!",
					rating: 0,
					author: "Richard",
					verified: false,
					createdAt: "2023-01-31T08:32:50.177Z",
					updatedAt: "2023-01-31T08:32:58.231Z"
				}
			},
			{
				id: 2,
				attributes: {
					comment: "I like this!",
					rating: 5,
					author: "Richard",
					verified: true,
					createdAt: "2023-01-31T08:33:15.683Z",
					updatedAt: "2023-01-31T08:33:31.874Z"
				}
			},
			{
				id: 3,
				attributes: {
					comment: "i love the movie",
					rating: 4,
					author: "yve",
					verified: true,
					createdAt: "2023-01-31T09:01:56.535Z",
					updatedAt: "2023-01-31T09:01:56.535Z"
				}
			},
			{
				id: 4,
				attributes: {
					comment: "Bra film, men för låga tonarter för sångarens röst!",
					rating: 3,
					author: "Alice",
					verified: true,
					createdAt: "2023-02-01T01:57:53.261Z",
					updatedAt: "2023-02-01T01:57:53.261Z"
				}
			},
			{
				id: 1,
				attributes: {
					comment: "I don't like this!",
					rating: 0,
					author: "Richard",
					verified: false,
					createdAt: "2023-01-31T08:32:50.177Z",
					updatedAt: "2023-01-31T08:32:58.231Z"
				}
			},
			{
				id: 1,
				attributes: {
					comment: "I don't like this!",
					rating: 0,
					author: "Richard",
					verified: false,
					createdAt: "2023-01-31T08:32:50.177Z",
					updatedAt: "2023-01-31T08:32:58.231Z"
				}
			},
			{
				id: 1,
				attributes: {
					comment: "I don't like this!",
					rating: 0,
					author: "Richard",
					verified: false,
					createdAt: "2023-01-31T08:32:50.177Z",
					updatedAt: "2023-01-31T08:32:58.231Z"
				}
			}
		],
		meta: {
			pagination: {
				page: 1,
				pageSize: 5,
				pageCount: 2,
				total: 4
			}
		}
	}
};
const exampleResponse2 = {
	data: {
		data: [
			{
				id: 34,
				attributes: {
					comment: "Hej en strikt recension!",
					rating: 0,
					author: "RichardMedStrikt",
					verified: null,
					createdAt: "2023-02-02T13:47:12.336Z",
					updatedAt: "2023-02-02T13:47:12.336Z"
				}
			},
			{
				id: 36,
				attributes: {
					comment: "Some birds aren't meant to be caged",
					rating: 5,
					author: "MovieLover",
					verified: false,
					createdAt: "2023-02-03T09:31:39.830Z",
					updatedAt: "2023-02-03T09:31:39.830Z"
				}
			},
			{
				id: 37,
				attributes: {
					comment: "Detta är min första recension någonsin!",
					rating: 5,
					author: "MovieNoob",
					verified: false,
					createdAt: "2023-02-03T12:07:38.140Z",
					updatedAt: "2023-02-03T12:07:38.140Z"
				}
			},
			{
				id: 38,
				attributes: {
					comment: "comment",
					rating: 2,
					author: "name",
					verified: false,
					createdAt: "2023-02-03T12:38:26.936Z",
					updatedAt: "2023-02-03T12:38:26.936Z"
				}
			},
			{
				id: 39,
				attributes: {
					comment: "This movie is awesome!",
					rating: 3,
					author: "John Doe",
					verified: false,
					createdAt: "2023-02-03T15:00:21.287Z",
					updatedAt: "2023-02-03T15:00:21.287Z"
				}
			}
		],
		meta: {
			pagination: {
				page: 2,
				pageSize: 5,
				pageCount: 2,
				total: 4
			}
		}
	}
};

const mockApiAdapter = async (movieId, pageNumber) => {
	if (pageNumber === 1) {
		return exampleResponse1;
	} else if (pageNumber === 2) {
		return exampleResponse2;
	}
};

const exampleMovie = 2;

describe("Tests of the Review List Pagination function", () => {
	test("max five results", async () => {
		const result = await getReviewsForMovieWithId(
			exampleMovie,
			1,
			mockApiAdapter
		);

		expect(result.reviews.length).toBeLessThanOrEqual(5);
	});

	test("pages aren't the same", async () => {
		const result1 = await getReviewsForMovieWithId(
			exampleMovie,
			1,
			mockApiAdapter
		);
		const result2 = await getReviewsForMovieWithId(
			exampleMovie,
			2,
			mockApiAdapter
		);

		expect(result1.reviews[0].id).not.toStrictEqual(result2.reviews[0].id);
	});
});
