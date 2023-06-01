const request = require('supertest')
const app = require('../app')
// const mongoose = require('mongoose')
const Cards = require('../models/Cards')

describe('api for cards', () => {
  it('should respond with 200', async () => {
    const response = await request(app)
      .get('/api/cards')
      .expect(200)
      .expect('Content-Type', /json/)
  })

  it('should respond with 200 when id is fetched', async () => {
    const cards = await Cards.create({
      frontContent: 'Test',
      backContent: 'Test',
      viewCount: 0,
    })
    const response = await request(app)
      .get(`/api/cards/${cards._id}`)
      .expect(200)
      .expect('Content-Type', /json/)
  })
  it('should respond with 201 success', async () => {
    const add = {
      frontContent: 'Test',
      backContent: 'Test',
      viewCount: 0,
    }
    const response = await request(app)
      .post('/api/cards')
      .send(add)
      .expect('Content-Type', /json/)
      .expect(201)
  })

  it('should respond with 200 success when card is updated', async () => {
    const cards = await Cards.create({
      frontContent: 'Test',
      backContent: 'Test',
      viewCount: 0,
    })

    const update = {
      frontContent: 'Update',
      backContent: 'Update',
      viewCount: 2,
    }

    const response = await request(app)
      .patch(`/api/cards/${cards._id}`)
      .send(update)
      .expect('Content-Type', /json/)
      .expect(200)

    // verify that that the update has been sent
    const updatedCards = await Cards.findById(cards._id)
    expect(updatedCards).toBeTruthy()
  })

  it('should delete a card and respond with 204', async () => {
    // Create a new cards in the database
    const cards = await Cards.create({
      frontContent: 'Test',
      backContent: 'Test',
      viewCount: 0,
    })

    // Send a DELETE request to delete the cards
    const response = await request(app)
      .delete(`/api/cards/${cards._id}`)
      .expect(204)

    // Verify that the cards is deleted
    const deletedCards = await Cards.findById(cards._id)
    expect(deletedCards).toBeNull()
  })

  it('responds to invalid get request with 400 if id is not found', async () => {
    const response = await request(app).get('/api/cards/:id').expect(400)

    // Verify the error response
  })

  it('responds to invalid post method request with 400', async () => {
    const response = await request(app).post('/api/cards').expect(400)
  })

  it('responds to invalid patch method request with 400', async () => {
    const response = await request(app).patch(`/api/cards/:id`).expect(400)
  })

  it('responds to invalid delete method request with 400', async () => {
    const response = await request(app).delete(`/api/cards/:id`).expect(400)
  })
})
