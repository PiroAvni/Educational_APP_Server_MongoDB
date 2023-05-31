const Progress = require('../models/progressModel')

const getProgress = async (req, res) => {
  try {
    const progress = await Progress.find()
    if (progress.length === 0) {
        throw new Error('No progress found')
    }
    res.json(progress)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getProgressById = async (req, res) => {
  try {
    const progress = await Progress.findById(req.params.id)
    if (!progress) {
      throw new Error('Progress ID not found')
    }
    res.json(progress)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
const createProgress = async (req, res) => {
  try {
    const { name } = req.body

    let progress = await Progress.create({ name })
    res.status(201).json(progress)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
const updateProgress = async (req, res) => {
  try {
    const { name } = req.body
    let progress = await Progress.findById(req.params.id)
    if (!progress) {
      throw new Error('Progress not found')
    }
    progress.name = name
    progress = await progress.save()
    res.json(progress)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
const deleteProgress = async (req, res) => {
  try {
    const progress = await Progress.findById(req.params.id)
    if (!progress) {
      throw new Error('Progress not found')
    }
    await progress.remove()
    res.json({ message: 'Progress deleted successfully' })
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
