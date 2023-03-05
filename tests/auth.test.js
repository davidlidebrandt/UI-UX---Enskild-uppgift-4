import { describe, expect, test } from "@jest/globals";
import request from "supertest";
import app from "../src/app.js";

const USERNAME = "user";
const PASSWORD = "password";

describe("does the jwt token exchange work", () => {
	test("username and password to the right endpoint returns a token", async () => {
    const response = await request(app)
		.post("/api/token")
    .set("Authentication", "Basic " + btoa(USERNAME + ":" + PASSWORD))
    .send()
		.expect(200);

    expect(response.body).toHaveProperty("token");
  })

  test("wrong username and password returns 401", async () => {
    const response = await request(app)
		.post("/api/token")
    .set("Authentication", "Basic " + btoa(USERNAME + ":" + PASSWORD + "wrong"))
    .send()
		.expect(401);
    
    expect(response.body.message).toContain("invalid")
  })

  test("review endpoint does not work without a proper auth header", async () => {
    const response = await request(app)
    .post("/api/movies/TEST/reviews")
    .send()
    .expect(403)

    expect(response.body).toHaveProperty("error", "Forbidden");
  });

  
  test("review endpoint returns 401 with the wrong credentials", async () => {
    const response = await request(app)
    .post("/api/movies/TEST/reviews")
    .set("Authentication", null)
    .send()
    .expect(401);

    expect(response.body).toHaveProperty("error", "Not allowed!");
  });

  test("review endpoint does work with a valid token", async () => {
    const response = await request(app)
		.post("/api/token")
    .set("Authentication", "Basic " + btoa(USERNAME + ":" + PASSWORD))
    .send()
		.expect(200);

    const token = response.body.token;

    await request(app)
    .post("/api/movies/TEST/reviews")
    .set("Authentication","Bearer " + token)
    .send()
    .expect(200);
  });
})
