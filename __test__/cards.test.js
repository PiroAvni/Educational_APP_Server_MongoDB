const request = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const Cards = require('../models/cardsModel')

describe('api for cards', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:3000', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  it('should respond with 200', async () => {
    const response = await request(app)
      .get('/api/cards')
      .expect(200)
      .expect('Content-Type', /json/)
  })

  it('should respond with 200', async () => {
    const cards = await Cards.create({ name: 'Test Card' })
    const response = await request(app)
      .get(`/api/cards${cards._id}`)
      .expect(200)
      .expect('Content-Type', /json/)
  })
})
