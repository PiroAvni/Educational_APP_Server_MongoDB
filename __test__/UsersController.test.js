require('dotenv').config()
const request = require('supertest')
const jwt = require('jsonwebtoken')
const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')
const app = require('../app') // Your Express app
const User = require('../models/Users')

const { generateToken } = require('../utils/generateToken')

let mongoServer

// Set up a mock MongoDB server
beforeAll(async () => {
  // mongoServer = new MongoMemoryServer();
  // const mongoUri = await mongoServer.create(process.env.DB_CONNECTION);
  await mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
})

// Clean up after all tests
afterAll(async () => {
  await mongoose.disconnect()
  // await mongoServer.stop();
})

describe('User API', () => {
  let token

  beforeEach(async () => {
    // Create a user in the test database
    const user = await User.create({
      name: 'TestUser',
      email: 'test@example.com',
      password: 'password',
    })

    // Generate a JWT token for the user
    token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET)
  })

  afterEach(async () => {
    // Remove all users from the test database
    await User.deleteMany({})
  })

  describe('POST /api/users/auth', () => {
    it('should authenticate user and return token', async () => {
      const response = await request(app)
        .post('/api/users/auth')
        .send({
          name: 'TestUser',
          email: 'test@test.com',
          password: 'password',
        })
        .expect(200)

      expect(response.body).toHaveProperty('_id')
      expect(response.body).toHaveProperty('name', 'TestUser')
      expect(response.body).toHaveProperty('email', 'test@example.com')
      expect(response.header).toHaveProperty('set-cookie')
      expect(response.header).toHaveProperty('token')
    })

    it('should return 401 if invalid credentials are provided', async () => {
      const response = await request(app)
        .post('/api/users/auth')
        .send({ email: 'test@example.com', password: 'wrongpassword' })
        .expect(401)

      expect(response.body.error).toEqual('Invalid email or password')
    })
  })

  describe('POST /api/users', () => {
    it('should register a new user and return token', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({
          name: 'New User',
          email: 'newuser@example.com',
          password: 'password',
        })
        .expect(201)

      expect(response.body).toHaveProperty('_id')
      expect(response.body).toHaveProperty('name', 'New User')
      expect(response.body).toHaveProperty('email', 'newuser@example.com')
      expect(response.header).toHaveProperty('set-cookie')
    })

    it('should return 400 if user already exists', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({
          name: 'New User',
          email: 'newuser@example.com',
          password: 'password',
        })
        .expect(400)

      expect(response.body.error).toEqual('User already exists')
    })
  })

  describe('POST /api/users/logout', () => {
    it('should clear the JWT cookie and return success message', async () => {
      const response = await request(app)
        .post('/api/users/logout')
        .set('Cookie', `jwt=${token}`)
        .expect(200)

      expect(response.body.message).toEqual('Logged out successfully')
      expect(response.header['set-cookie'][0]).toMatch(/jwt=;/)
    })
  })

  describe('GET /api/users/profile', () => {
    it('should return user profile if authenticated', async () => {
      const response = await request(app)
        .get('/api/users/profile')
        .set('Cookie', `jwt=${token}`)
        .expect(200)

      expect(response.body).toHaveProperty('_id')
      expect(response.body).toHaveProperty('name', 'TestUser')
      expect(response.body).toHaveProperty('email', 'test@example.com')
    })

    it('should return 404 if user is not found', async () => {
      // Remove the user from the test database to simulate a user not found scenario
      await User.deleteMany({})

      const response = await request(app)
        .get('/api/users/profile')
        .set('Cookie', `jwt=${token}`)
        .expect(404)

      expect(response.body.error).toEqual('User not found')
    })
  })

  describe('PUT /api/users/profile', () => {
    it('should update user profile if authenticated', async () => {
      const response = await request(app)
        .put('/api/users/profile')
        .set('Cookie', `jwt=${token}`)
        .send({ name: 'UpdatedUser', email: 'updateduser@example.com' })
        .expect(200)

      expect(response.body).toHaveProperty('_id')
      expect(response.body).toHaveProperty('name', 'UpdatedUser')
      expect(response.body).toHaveProperty('email', 'updateduser@example.com')
    })

    it('should update user password if provided', async () => {
      const response = await request(app)
        .put('/api/users/profile')
        .set('Cookie', `jwt=${token}`)
        .send({ password: 'newpassword' })
        .expect(200)

      expect(response.body).toHaveProperty('_id')
      expect(response.body).toHaveProperty('name', 'TestUser')
      expect(response.body).toHaveProperty('email', 'test@example.com')
    })

    it('should return 404 if user is not found', async () => {
      // Remove the user from the test database to simulate a user not found scenario
      await User.deleteMany({})

      const response = await request(app)
        .put('/api/users/profile')
        .set('Cookie', `jwt=${token}`)
        .send({ name: 'UpdatedUser', email: 'updateduser@example.com' })
        .expect(404)

      expect(response.body.error).toEqual('User not found')
    })
  })
})
