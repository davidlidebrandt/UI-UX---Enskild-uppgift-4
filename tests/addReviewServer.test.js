import { validateReview } from "../src/addReviewServer";
import { describe, expect, test } from "@jest/globals";

const mockWrongNameReview = {
  comment: "comment",
  rating: "5",
  author: "V3D@D",
  verified: false,
  movie: 3,
  createdAt: new Date(),
  updatedAt: new Date(),
  createdBy: "V3D@D",
  updatedBy: "V3D@D",
};

const mockWrongRatingReview = {
  comment: "comment",
  rating: "55",
  author: "Vedad",
  verified: false,
  movie: 3,
  createdAt: new Date(),
  updatedAt: new Date(),
  createdBy: "Vedad",
  updatedBy: "Vedad",
};

const mockWrongNameAndRatingReview = {
  comment: "comment",
  rating: "55",
  author: "V3DaD",
  verified: false,
  movie: 3,
  createdAt: new Date(),
  updatedAt: new Date(),
  createdBy: "V3D@D",
  updatedBy: "V3D@D",
};

const mockEmptyReview = {
  comment: "comment",
  rating: "",
  author: "",
  verified: false,
  movie: 3,
  createdAt: new Date(),
  updatedAt: new Date(),
  createdBy: "Vedad",
  updatedBy: "Vedad",
};

const mockNullReview = {
  comment: "comment",
  rating: null,
  author: null,
  verified: false,
  movie: 3,
  createdAt: new Date(),
  updatedAt: new Date(),
  createdBy: "Vedad",
  updatedBy: "Vedad",
};

const mockCorrectReview = {
  comment: "comment",
  rating: "5",
  author: "Vedad",
  verified: false,
  movie: 3,
  createdAt: new Date(),
  updatedAt: new Date(),
  createdBy: "Vedad",
  updatedBy: "Vedad",
};

describe("Tests of the validateReview function on both correct and incorrect input)", () => {
  test("Wrong input (name)", () => {
    const result = validateReview(mockWrongNameReview);
    expect(result.validated == false).toBeTruthy();
    expect(result.message).toStrictEqual("Skriv in ett korrekt namn!");
    expect(result.status).toStrictEqual(422);
  });

  test("Wrong input (rating)", () => {
    const result = validateReview(mockWrongRatingReview);
    expect(result.validated == false).toBeTruthy();
    expect(result.message).toStrictEqual("Betyget behöver vara mellan 0-5!");
    expect(result.status).toStrictEqual(422);
  });

  test("Wrong input (name, rating)", () => {
    const result = validateReview(mockWrongNameAndRatingReview);
    expect(result.validated == false).toBeTruthy();
    expect(result.message).toStrictEqual("Skriv in korrekt namn och betyg!");
    expect(result.status).toStrictEqual(422);
  });

  test("No input (name, rating)", () => {
    const result = validateReview(mockEmptyReview);
    expect(result.validated == false).toBeTruthy();
    expect(result.message).toStrictEqual("Skriv in korrekt namn och betyg!");
    expect(result.status).toStrictEqual(422);
  });
  
  test("null as input (name, rating)", () => {
    const result = validateReview(mockEmptyReview);
    expect(result.validated == false).toBeTruthy();
    expect(result.message).toStrictEqual("Skriv in korrekt namn och betyg!");
    expect(result.status).toStrictEqual(422);
  });

  test("Correct input (name, rating)", () => {
    const result = validateReview(mockCorrectReview);
    expect(result.validated == true).toBeTruthy();
    expect(result.message.startsWith("Tack för din recension, ")).toBeTruthy();
    expect(result.status).toStrictEqual(201);
  });
});
