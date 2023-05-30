const client = require("../database/setup");
require("dotenv").config()

const seedDB = async () => {
  try {
    await client.connect();
    console.log("Awaiting Seed 🌱");
    await client.db('cats').collection('shelter').drop();
    await client
      .db('cat')
      .collection("shelter")
      .insertMany([
        { name: "Felix the Cat", age: 34, owner: "Purina" },
        { name: "Happy", age: 6 },
        { name: "Yoruichi", age: 99 },
        { name: "Doraemon", age: 10 },
        { name: "Bob the Cat", age: 14, owner: "Bowen" },
      ]);
    console.log("DB Seeded 🌾");
    await client.close();
  } catch (err) {
    console.log(err);
  }
};

seedDB();
