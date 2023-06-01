const request = require("supertest");
const app = require("../app");
const Progress = require("../models/Progress");

describe("api for progress", () => {
  it("should respond with 200 ", async () => {
    const response = await request(app)
      .get("/api/progress")
      .expect(200)
      .expect("Content-Type", /json/);
  });

  it("should respond with 200", async () => {
    const progress = await Progress.create({
      cardsReviewed: "1",
      correctResponses: "1",
      incorrectResponses: "1",
      lastReviewedAt: "2023-06-01",
      progressPercentage: "10",
      completionStatus: "Not Started",
    });

    await request(app)
      .get(`/api/progress/${progress._id}`)
      .expect(200)
      .expect("Content-Type", /json/);
  });

  it("should respond with 201 success", async () => {
    const add = {
      cardsReviewed: 1,
      correctResponses: 1,
      incorrectResponses: 1,
      lastReviewedAt: "2023-06-01",
      progressPercentage: 10,
      completionStatus: "Not Started",
    };

    await request(app)
      .post("/api/progress")
      .send(add)
      .expect("Content-Type", /json/)
      .expect(201);
  });

  it("should respond with 200 success", async () => {
    const progress = await Progress.create({
      cardsReviewed: 1,
      correctResponses: 1,
      incorrectResponses: 1,
      lastReviewedAt: "2023-06-01",
      progressPercentage: 10,
      completionStatus: "Not Started",
    });

    const update = {
      cardsReviewed: 1,
      correctResponses: 1,
      incorrectResponses: 1,
      lastReviewedAt: "2023-06-01",
      progressPercentage: 10,
      completionStatus: "Not Started",
    };

    await request(app)
      .patch(`/api/progress/${progress._id}`)
      .send(update)
      .expect("Content-Type", /json/)
      .expect(200);

    const updatedProgress = await Progress.findById(progress._id);
    expect(updatedProgress).toBeTruthy();
  });

  it("should delete a progress and respond with 204", async () => {
    const progress = await Progress.create({
      cardsReviewed: 1,
      correctResponses: 1,
      incorrectResponses: 1,
      lastReviewedAt: "2023-06-01",
      progressPercentage: 10,
      completionStatus: "Not Started",
    });

    await request(app).delete(`/api/progress/${progress._id}`).expect(204);

    const deletedProgress = await Progress.findById(progress._id);
    expect(deletedProgress).toBeNull();
  });

  // fail

  // it('should respond fail with 500 when there are no progress ', async () => {
  //   const response = await request(app)
  //     .get('/api/progress')
  //     .expect(500)
  //     .expect('{"error":"No progress have been found "}')
  // })

  it("responds to invalid get request with 400 if id is not found", async () => {
    const response = await request(app).get("/api/progress/:id").expect(400);

    // Verify the error response
  });

  it("responds to invalid post method request with 400", async () => {
    const response = await request(app).post("/api/progress").expect(400);
  });

  it("responds to invalid patch method request with 400", async () => {
    const response = await request(app).patch(`/api/progress/:id`).expect(400);
  });

  it("responds to invalid delete method request with 400", async () => {
    const response = await request(app).delete(`/api/progress/:id`).expect(400);
  });
});
