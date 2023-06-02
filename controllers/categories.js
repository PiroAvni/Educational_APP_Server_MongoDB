const Category = require('../models/Categories')

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find()
    res.status(200).json(categories)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
}

const getCategoriesById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
    if (!category) {
      throw new Error('Category not found')
    }
    res.status(200).json(category)
  } catch (error) {
    res.status(400).json({ error: 'Server error' })
  }
}
const createCategory = async (req, res) => {
  try {
    const { name } = req.body

    let category = await Category.create({ name })
    res.status(201).json(category)
  } catch (error) {
    res.status(400).json({ error: 'Server error' })
  }
}
const updateCategory = async (req, res) => {
  try {
    const { name } = req.body
    let category = await Category.findById(req.params.id)
    if (!category) {
      return res.status(404).json({ error: 'Category not found' })
    }
    category.name = name
    category = await category.save()
    res.status(200).json(category)
  } catch (error) {
    res.status(400).json({ error: 'Server error' })
  }
}
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id)
    if (!category) {
      throw new Error('Category not found')
    }

    res.status(204).json('Category deleted successfully')
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  getCategories,
  getCategoriesById,
  createCategory,
  updateCategory,
  deleteCategory,
}
