import axios from "axios";
import { apiAdapter } from "./reviewList.js";

const API_BASE = "https://plankton-app-xhkom.ondigitalocean.app/api";

export async function loadMovies() {
	const res = await axios.request({
		url: API_BASE + "/movies",
		method: "GET"
	});
	return res.data;
}

export async function loadMovie(id) {
	try {
		const res = await axios.request({
			url: API_BASE + "/movies/" + id,
			method: "GET"
		});
		return res.data;
	} catch (err) {
		return { err };
	}
}

export async function loadReviewsForMovie(movieId) {
	let page = 1;
	let pageSize = 100;

	const result = await apiAdapter(movieId, page, pageSize);

	for (page += page; page <= result.data.meta.pagination.pageCount; page++) {
		
		let res = await apiAdapter(movieId, page, pageSize);
		
		result.data.data = result.data.data.concat(res.data.data);
	}
	
	return result.data.data;
}