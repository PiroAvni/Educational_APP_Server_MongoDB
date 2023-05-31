const express = require('express')

const { getBookmarks,
    getBookmarksById,
    createBookmarks,
    updateBookmarks,
    deleteBookmarks } = require('../controllers/bookmarksControllers.js')

const router = express.Router()

router.get('/', getBookmarks)
router.get('/:id', getBookmarksById)
router.post('/', createBookmarks)
router.patch('/:id', updateBookmarks)
router.delete('/:id', deleteBookmarks)

module.exports = router
