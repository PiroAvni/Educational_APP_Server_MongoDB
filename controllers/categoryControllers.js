const Category = require('../models/categoryModel')

const getCategories = async (req, res) => {
  try {
    const category = await Category.find()
    if (category.length === 0) {
      throw new Error('No categories have been found ')
    }
    res.status(200).json(category)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getCategoriesByID = async (req, res) => {
  const id = req.params.id
  try {
    const categoryById = await Category.findById(id)
    if (categoryById.length === 0) {
      throw new Error('cannot locate the category')
    }
    res.status(200).send(categoryById)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
const createCategory = async (req, res) => {
  const { name } = req.body
  try {
    const newCategory = await Category.create({ name })
    await newCategory.save()
    res.status(201).send(newCategory)
  } catch (error) {
    res.status(400).send(error)
  }
}

const updateCategory = async (req, res) => {
  const id = req.params.id
  const { name } = req.body
  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, name)
    if (!updatedCategory) {
      throw new Error(' cannot locate the category')
    }
    res.status(200).send(updatedCategory)
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const deleteCategory = async (req, res) => {
  const id = req.params.id
  try {
    const deletedCategory = await Category.findByIdAndDelete(id)
    if (!deletedCategory) {
      throw new Error('cannot locate the category')
    }
    res.status(204).send()
  } catch (error) {
    res.status(400).send(error.message)
  }
}

module.exports = {
  getCategories,
  getCategoriesByID,
  createCategory,
  updateCategory,
  deleteCategory,
}
