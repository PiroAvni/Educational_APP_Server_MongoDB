const request = require('supertest')
const app = require('../app')
const Deck = require('../models/Decks')

describe('api for deck', () => {
  it('should respond with 200 ', async () => {
    const response = await request(app)
      .get('/api/deck')
      .expect(200)
      .expect('Content-Type', /json/)
  })

  it('should respond with 200 ', async () => {
    const deck = await Deck.create({
      title: 'English',
      description: 'english',
      visibility: 'true',
      create_date: '2023-06-01',
    })
    const response = await request(app)
      .get(`/api/deck/${deck._id}`)
      .expect(200)
      .expect('Content-Type', /json/)
  })

  it('should respond with 201 success', async () => {
    const add = {
      title: 'English',
      description: 'english',
      visibility: 'true',
      create_date: '2023-06-01',
    }
    const response = await request(app)
      .post('/api/deck')
      .send(add)
      .expect('Content-Type', /json/)
      .expect(201)
  })

  it('should respond with 200 success', async () => {
    const deck = await Deck.create({
      title: 'English',
      description: 'english',
      visibility: 'true',
      create_date: '2023-06-01',
    })

    const update = {
      title: 'English',
      description: 'english',
      visibility: 'true',
      create_date: '2023-06-01',
    }

    const response = await request(app)
      .patch(`/api/deck/${deck._id}`)
      .send(update)
      .expect('Content-Type', /json/)
      .expect(200)

    // verify that that the update has been sent
    const updatedDeck = await Deck.findById(deck._id)
    expect(updatedDeck).toBeTruthy()
  })

  it('should delete a deck and respond with 204', async () => {
    // Create a new deck in the database
    const deck = await Deck.create({
      title: 'English',
      description: 'english',
      visibility: 'true',
      create_date: '2023-06-01',
    })

    // Send a DELETE request to delete the deck
    const response = await request(app)
      .delete(`/api/deck/${deck._id}`)
      .expect(204)

    // Verify that the deck is deleted
    const deletedDeck = await Deck.findById(deck._id)
    expect(deletedDeck).toBeNull()
  })

  // fail

  // it('should respond fail with 500 when there are no deck ', async () => {
  //   const response = await request(app)
  //     .get('/api/deck')
  //     .expect(500)
  //     .expect('{"error":"No decks have been found "}')
  // })

  it('responds to invalid get request with 400 if id is not found', async () => {
    const response = await request(app).get('/api/deck/:id').expect(400)

    // Verify the error response
  })

  it('responds to invalid post method request with 400', async () => {
    const response = await request(app).post('/api/deck').expect(400)
  })

  it('responds to invalid patch method request with 400', async () => {
    const response = await request(app).patch(`/api/deck/:id`).expect(400)
  })

  it('responds to invalid delete method request with 400', async () => {
    const response = await request(app).delete(`/api/deck/:id`).expect(400)
  })
})
