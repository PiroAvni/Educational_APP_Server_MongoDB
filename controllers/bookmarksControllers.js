const Bookmarks = require('../models/bookmarksModel')

const getBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmarks.find()
    if (bookmarks.length === 0) {
        throw new Error('No bookmarks found')
    }
    res.json(bookmarks)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getBookmarksById = async (req, res) => {
  try {
    const bookmarks = await Bookmarks.findById(req.params.id)
    if (!bookmarks) {
      throw new Error('Bookmarks ID not found')
    }
    res.json(bookmarks)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
const createBookmarks = async (req, res) => {
  const { userID, cardID } = req.body
    try {
    const newBookmarks =  await Bookmarks.create({ userID, cardID })
    res.status(201).json(newBookmarks)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
const updateBookmarks = async (req, res) => {
  try {
    const { userID, cardID } = req.body
    let bookmarks = await Bookmarks.findByIdAndUpdate(req.params.id, {userID, cardID})
    if (!bookmarks) {
      throw new Error('Bookmarks not found')
    }
    res.json(bookmarks)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
const deleteBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmarks.findByIdAndDelete(req.params.id)
    if (!bookmarks) {
      throw new Error('Bookmarks not found')
    }
    res.json({ message: 'Bookmarks deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  getBookmarks,
  getBookmarksById,
  createBookmarks,
  updateBookmarks,
  deleteBookmarks,
}
