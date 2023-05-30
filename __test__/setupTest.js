const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const app = require("../app");
const jwt = require("jsonwebtoken");
const { before } = require("node:test");

let mongoServer;

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Set up JWT authentication for testing
  app.use((req, res, next) => {
    req.user = {
      _id: "user_id",
      name: "testuser",
      email: "testuser@gmail.com",
    };
    next();
  });
});
afterAll(async (done) => {
    await mongoose.disconnect();
    await mongoServer.stop();
})

//Helper function to generate a JWT token
const generateToken = () => {
    return jwt.sign({id:'user-id'}, 'your-secret-token',{expiresIn:'1h'});

};

module.exports ={
    app,
    generateToken
};