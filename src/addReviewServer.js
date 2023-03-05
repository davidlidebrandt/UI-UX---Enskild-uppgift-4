const API_BASE = "https://plankton-app-xhkom.ondigitalocean.app/api/reviews";

export async function postReview(req, res) {
  const review = req.body.data;
  const reviewToValidate = validateReview(review);
  if (reviewToValidate.validated == true) {
    const method = {
      method: "POST",
      body: JSON.stringify(req.body),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(API_BASE, method);
    //checking if for some reason the API didnt accept the post request.
    if (response.status == 200) {
      res.status(reviewToValidate.status).send({ data: reviewToValidate });
    } else {
      res.status(response.status).send({ data: reviewToValidate });
    }
  } else {
    res.status(reviewToValidate.status).send({ data: reviewToValidate });
  }
}

export function validateReview(review) {
  if (checkAuthor(review)) {
    if (checkRating(review)) {
      return {
        validated: true,
        message: "Tack för din recension, " + review.author + "!",
        status: 201,
      };
    } else {
      return {
        validated: false,
        message: "Betyget behöver vara mellan 0-5!",
        status: 422,
      };
    }
  } else if (!checkRating(review)) {
    return {
      validated: false,
      message: "Skriv in korrekt namn och betyg!",
      status: 422,
    };
  } else {
    return {
      validated: false,
      message: "Skriv in ett korrekt namn!",
      status: 422,
    };
  }
}

function checkAuthor(review) {
  const author = review.author;
  //I kept this because it feels like a cool idea to spin upon.
  const regex = /[^a-zåäöA-ZÅÄÖ -]/;
  //If author is null for some reason
  if (author == null) {
    return false;
    // I left the author.length < 2, because I felt the name deserves at least two letters
  } else if (author.match(regex) || author.length < 2) {
    return false;
  } else {
    return true;
  }
}

function checkRating(review) {
  const rating = parseInt(review.rating);
  //if rating is null for some reason
  if (rating == null) {
    return false;
  } else if (0 <= rating && rating <= 5) {
    return true;
  } else {
    return false;
  }
}
