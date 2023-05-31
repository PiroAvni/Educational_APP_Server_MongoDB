const express = require('express')
const cors = require('cors')

require('dotenv').config()
const connectDB = require('./config/db-setup.js')
const cookieParser = require('cookie-parser')
const { notFound, errorHandler } = require('./middleware/errorMiddleware.js')
const logger = require('./middleware/logger')
<<<<<<< HEAD
const userRoutes = require ('./routes/Users.js')
const categoryRoutes = require ('./routes/Categories.js')
=======
>>>>>>> staging

const userRoutes = require('./routes/userRoutes.js')
const categoryRoutes = require('./routes/categoryRoutes.js')

connectDB()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())
app.use(logger)

<<<<<<< HEAD
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);


=======
app.use('/api/users', userRoutes)
app.use('/api/category', categoryRoutes)
>>>>>>> staging

app.get('/', (req, res) => {
  res.json({ App: 'Welcome to the Server!!' })
})

app.use(notFound)
app.use(errorHandler)

module.exports = app
