const request = require('supertest')
const app = require('../app')
const Deck = require('../models/Decks')

describe('api for category', () => {
  it('should respond with 200 ', async () => {
    const response = await request(app)
      .get('/api/decks')
      .expect(200)
      .expect('Content-Type', /json/)
  })

  it('should respond with 200 ', async () => {
    const category = await Deck.create({ name: 'Test Deck' })
    const response = await request(app)
      .get(`/api/decks/${category._id}`)
      .expect(200)
      .expect('Content-Type', /json/)
  })

  it('should respond with 201 success', async () => {
    const add = {
      name: 'Math',
    }
    const response = await request(app)
      .post('/api/decks')
      .send(add)
      .expect('Content-Type', /json/)
      .expect(201)
  })

  it('should respond with 200 success', async () => {
    const category = await Deck.create({ name: 'Test Deck' })

    const update = {
      name: 'Math',
    }

    const response = await request(app)
      .patch(`/api/decks/${category._id}`)
      .send(update)
      .expect('Content-Type', /json/)
      .expect(200)

    // verify that that the update has been sent
    const updatedDeck = await Deck.findById(category._id)
    expect(updatedDeck).toBeTruthy()
  })

  it('should delete a category and respond with 204', async () => {
    // Create a new category in the database
    const category = await Deck.create({ name: 'Test Deck' })

    // Send a DELETE request to delete the category
    const response = await request(app)
      .delete(`/api/decks/${category._id}`)
      .expect(204)

    // Verify that the category is deleted
    const deletedDeck = await Deck.findById(category._id)
    expect(deletedDeck).toBeNull()
  })

  // fail

  // it('should respond fail with 500 when there are no decks ', async () => {
  //   const response = await request(app)
  //     .get('/api/category')
  //     .expect(500)
  //     .expect('{"error":"No decks have been found "}')
  // })

  it('responds to invalid get request with 400 if id is not found', async () => {
    const response = await request(app).get('/api/decks/:id').expect(400)

    // Verify the error response
  })

  it('responds to invalid post method request with 400', async () => {
    const response = await request(app).post('/api/decks').expect(400)
  })

  it('responds to invalid patch method request with 400', async () => {
    const response = await request(app).patch(`/api/decks/:id`).expect(400)
  })

  it('responds to invalid delete method request with 400', async () => {
    const response = await request(app)
      .delete(`/api/decks/:id`)
      .expect(400)
  })
})
