const mongoose = require('mongoose')

const cardsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
})

const Cards = mongoose.model('Cards', cardsSchema)

module.exports = Cards
