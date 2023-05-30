const express = require('express')

const {
  getCategories,
  getCategoriesByID,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryControllers')

const router = express.Router()

router.get('/', getCategories)
router.get('/:id', getCategoriesByID)
router.post('/', createCategory)
router.patch('/:id', updateCategory)
router.delete('/:id', deleteCategory)

module.exports = router
