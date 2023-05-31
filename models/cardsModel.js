const mongoose = require('mongoose')

const cardsSchema = mongoose.Schema({
  categoryID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },

  deckID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Deck',
  },

  frontContent: {
    type: String,
    required: true,
  },
  backContent: {
    type: String,
    required: true,
  },
  viewCount: {
    type: Number,
    required: true,
  },
})

const Cards = mongoose.model('Cards', cardsSchema)

module.exports = Cards
