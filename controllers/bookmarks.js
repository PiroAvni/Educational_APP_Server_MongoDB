const Bookmarks = require('../models/Bookmarks')

const getBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmarks.find()
      .populate('userId')
      .populate('cardId')
    if (bookmarks.length === 0) {
      throw new Error('No bookmarks found')
    }
    res.status(200).json(bookmarks)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getBookmarksById = async (req, res) => {
  try {
    const bookmarks = await Bookmarks.findById(req.params.id)
      .populate('userId')
      .populate('cardId')
    if (!bookmarks) {
      throw new Error('Bookmarks ID not found')
    }
    res.status(200).json(bookmarks)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
const createBookmarks = async (req, res) => {
  const { userId, cardId } = req.body
  try {
    const newBookmarks = await Bookmarks.create({ userId, cardId })
    res.status(201).json(newBookmarks)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
const updateBookmarks = async (req, res) => {
  try {
    const { userId, cardId } = req.body
    let bookmarks = await Bookmarks.findByIdAndUpdate(req.params.id, {
      userId,
      cardId,
    })
    if (!bookmarks) {
      throw new Error('Bookmarks not found')
    }
    res.status(200).json(bookmarks)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
const deleteBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmarks.findByIdAndDelete(req.params.id)
    if (!bookmarks) {
      throw new Error('Bookmarks not found')
    }
    res.status(204).json({ message: 'Bookmarks deleted successfully' })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  getBookmarks,
  getBookmarksById,
  createBookmarks,
  updateBookmarks,
  deleteBookmarks,
}
