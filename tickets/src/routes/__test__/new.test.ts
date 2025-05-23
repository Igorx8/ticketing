import request from "supertest";
import { app } from "../../app";

it("has a route handler listening to /api/tickets for post requests", async () => {
  const response = await request(app).post("/api/tickets").send({});

  expect(response.status).not.toEqual(404);
});

it("can only be accessed if the user is signed in", async () => {
  await request(app).post("/api/tickets").send({}).expect(401);
});

it("returns a status other then 401 if the user is signed in", async () => {
  const [cookie] = global.signin();
  const response = await request(app)
    .post("/api/tickets")
    .set("cookie", cookie)
    .send({});

  console.log(response.status);
  expect(response.status).not.toEqual(401);
});

it("returns an error if an invalid title is provided", async () => {
  await request(app).post("/api/tickets").send({
    title: 42,
  });
});

it("returns an error if an invalid price is provided", async () => {});

it("creates a ticket with valid inputs", async () => {});
