// const {conn} = require("../config/db-setup");
require("dotenv").config()
const { MongoClient } = require("mongodb")

const connectionUrl = process.env.DB_CONNECTION

const client = new MongoClient(connectionUrl)


const seedDB = async () => {
  try {
    await client.connect();
    console.log("Awaiting Seed 🌱");
    await client.db('Project_3').collection('users').drop();
    await client
      .db('Project_3')
      .collection("users")
      .insertMany([
        { name: "Test-Avni", email:"test1@gmail.com", password: "123" },
        { name: "Test-Dohee", email: "test2@gmail.com", password: "123" },
        { name: "Test-Muhammad", email: "test3@gmail.com", password: "123" },
        { name: "Test-George", email: "test4@gmail.com", password: "123" },
        { name: "Test-Fracesca", email: "test5@gmail.com", password: "123" },
        
      ]);
    console.log("DB Seeded 🌾");
    await client.close();
  } catch (err) {
    console.log(err);
  }
};

seedDB();
