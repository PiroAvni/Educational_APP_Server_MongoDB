const mongoose = require('mongoose')

const progressSchema = mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  deckID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Deck',
    required: true,
  },

  cardsReviewed: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cards',
  },

  correctResponses: {
    type: Number,
    default: 0,
    required: true,
  },

  incorrectResponses: {
    type: Number,
    default: 0,
    required: true,
  },

  lastReviewedAt: {
    type: Date,
    default: Date.now,
    // default: Timestamp.now,
  },

  progressPercentage: {
    type: Date,
    default: Date.now,
  },

  completionStatus: {
    type: Date,
    default: Date.now,
  },
})

const Progress = mongoose.model('Progress', progressSchema)

module.exports = Progress
