window.addEventListener("load", onPageLoad);
const currentPath = window.location.href;
const movieID = currentPath.substring(currentPath.lastIndexOf("/") + 1);
const buttonNextEl = document.querySelector("#buttonNext");
const buttonPrevEl = document.querySelector("#buttonPrev");
const reviewListEL = document.querySelector("#reviewList");
buttonNextEl.addEventListener("click", getNextPage);
buttonPrevEl.addEventListener("click", getPrevPage);
let currentPage = 1;
let totalPages = 2;

async function getNextPage() {
	if (currentPage != totalPages) {
		currentPage++;
	}
	const reviews = await getReviewsFromAPI(movieID);
	insertReviewsInHTML(reviews);
	disableButtons();
}

async function getPrevPage() {
	if (currentPage != 1) {
		currentPage--;
	}
	const reviews = await getReviewsFromAPI(movieID);
	insertReviewsInHTML(reviews);
	disableButtons();
}

function disableButtons() {
	if (currentPage == 1) {
		buttonPrevEl.disabled = true;
	} else {
		buttonPrevEl.disabled = false;
	}
	if (currentPage == totalPages) {
		buttonNextEl.disabled = true;
	} else {
		buttonNextEl.disabled = false;
	}
}

async function onPageLoad() {
	const reviews = await getReviewsFromAPI(movieID);
	totalPages = reviews.pages.pageCount;
	disableButtons();
	insertReviewsInHTML(reviews);
}

function insertReviewsInHTML(reviews) {
	while (reviewListEL.firstChild) {
		reviewListEL.removeChild(reviewListEL.firstChild);
	}
	reviews.reviews.forEach((review) => {
		const reviewEl = renderReview(review);
		reviewListEL.appendChild(reviewEl);
	});
}

function renderReview(review) {
	const reviewEl = document.createElement("li");

	const rating = document.createElement("span");
	rating.className = "review-rating";

	const ratingNumber = review.attributes.rating;
	for (let i = 0; i < 5; i++) {
		const spanEl = document.createElement("span");
		spanEl.className =
			(i+1) <= ratingNumber ? "review-hat filled" : "review-hat nofill";
		rating.appendChild(spanEl);
	}

	const comment = document.createElement("span");
	comment.className = "review-comment";
	comment.textContent = review.attributes.comment;

	const author = document.createElement("span");
	author.className = "review-author";
	author.textContent = review.attributes.author;

	const date = document.createElement("span");
	date.className = "review-date";
	const dateCreated = new Date(review.attributes.createdAt);
	date.textContent = dateCreated.toLocaleDateString("sv-SE");

	reviewEl.append(rating, author, date, comment);

	return reviewEl;
}

async function getReviewsFromAPI(movieID, page = currentPage) {
	const response = await fetch(`/api/movies/${movieID}/reviews?page=${page}`);
	const data = response.json();
	return data;
}
