const mongoose = require('mongoose')

const progressSchema = mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  deckID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Deck',
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
  },

  progressPercentage: {
    type: Number,
    default: 0,
  },

  completionStatus: {
    type: String,
    default: 'Not Started',
    enum: ['Not Started', 'In Progress', 'Completed']
  },
})

const Progress = mongoose.model('Progress', progressSchema)

module.exports = Progress
