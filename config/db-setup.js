require('dotenv').config()
const mongoose =require( "mongoose");

const connectionUrl = process.env.DB_CONNECTION
const dbName = process.env.DB_NAME

const connectDB = async () => {
    try {
       const conn = await mongoose.connect(connectionUrl,{
        dbName,
        useNewUrlParser: true,     
        useUnifiedTopology: true,  
      });
        console.log(` MongoDB Connected:${conn.connection.host} 🚀`)
    } catch (error) {
        console.error(`Error:${error.message}`);
        process.exit(1)
    }
}

module.exports = connectDB;
