const request = require('supertest');
const jwt = require('jsonwebtoken');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const app = require('../app'); // Your Express app
const User = require('../models/userModels');
const { protect } = require('../middlewares/authMiddleware');

let mongoServer;

// Set up a mock MongoDB server
beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Clean up after all tests
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('User API', () => {
  let token;

  beforeEach(async () => {
    // Create a user in the test database
    const user = await User.create({
      username: 'testuser',
      password: 'password',
    });

    // Generate a JWT token for the user
    token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  });

  afterEach(async () => {
    // Remove all users from the test database
    await User.deleteMany({});
  });

  it('should protect a route with JWT authentication', async () => {
    const response = await request(app)
      .get('/protected-route')
      .set('Cookie', `jwt=${token}`)
      .expect(200);

    expect(response.body.message).toEqual('Protected route accessed');
  });

  it('should return 401 if no token is provided', async () => {
    const response = await request(app)
      .get('/protected-route')
      .expect(401);

    expect(response.body.error).toEqual('Not authorized, no token');
  });

  it('should return 401 if an invalid token is provided', async () => {
    const response = await request(app)
      .get('/profile')
      .set('Cookie', 'jwt=invalid-token')
      .expect(401);

    expect(response.body.error).toEqual('Not authorized, token failed');
  });
});
