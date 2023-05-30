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
      name: "test_user",
      email: "testuser@gmail.com",
      password:"123"
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

// const {MongoClient} = require('mongodb');

// describe('insert', () => {
//   let connection;
//   let db;

//   beforeAll(async () => {
//     connection = await MongoClient.connect(globalThis.__MONGO_URI__, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     db = await connection.db(globalThis.__MONGO_DB_NAME__);
//   });

//   afterAll(async () => {
//     await connection.close();
//   });

//   it('should insert a doc into collection', async () => {
//     const users = db.collection('users');

//     const mockUser = {_id: 'some-user-id', name: 'John'};
//     await users.insertOne(mockUser);

//     const insertedUser = await users.findOne({_id: 'some-user-id'});
//     expect(insertedUser).toEqual(mockUser);
//   });
// });