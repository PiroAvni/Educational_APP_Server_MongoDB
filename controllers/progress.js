const Progress = require('../models/Progress')

const getProgress = async (req, res) => {
  try {
    const progress = await Progress.find()
      .populate('userID')
      .populate('deckID')
      .populate('deckID')
    if (progress.length === 0) {
      throw new Error('No progress found')
    }
    res.status(200).json(progress)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getProgressById = async (req, res) => {
  try {
    const progress = await Progress.findById(req.params.id)
      .populate('userID')
      .populate('deckID')
      .populate('deckID')
    if (!progress) {
      throw new Error('Progress ID not found')
    }
    res.status(200).json(progress)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
const createProgress = async (req, res) => {
  const {
    userID,
    deckID,
    cardsReviewed,
    correctResponses,
    incorrectResponses,
    lastReviewed,
    progressPercentage,
    completionStatus,
  } = req.body
  try {
    const newProgress = await Progress.create({
      userID,
      deckID,
      cardsReviewed,
      correctResponses,
      incorrectResponses,
      lastReviewed,
      progressPercentage,
      completionStatus,
    })
    res.status(201).json(newProgress)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
const updateProgress = async (req, res) => {
  try {
    const {
      userID,
      deckID,
      cardsReviewed,
      correctResponses,
      incorrectResponses,
      lastReviewedAt,
      progressPercentage,
      completionStatus,
    } = req.body
    let progress = await Progress.findByIdAndUpdate(
      req.params.id,
      {
        userID,
        deckID,
        cardsReviewed,
        correctResponses,
        incorrectResponses,
        lastReviewedAt,
        progressPercentage,
        completionStatus,
      },
      {
        new: true,
      }
    )
    if (!progress) {
      throw new Error('Progress not found')
    }
    res.status(200).json(progress)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const deleteProgress = async (req, res) => {
  try {
    const progress = await Progress.findByIdAndDelete(req.params.id)
    if (!progress) {
      throw new Error('Progress not found')
    }
    res.status(204).json({ message: 'Progress deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  getProgress,
  getProgressById,
  createProgress,
  updateProgress,
  deleteProgress,
}
