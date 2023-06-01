const Deck = require('../models/Decks')

const index = async (req, res) => {
  try {
<<<<<<< HEAD
    const decks = await Deck.find().populate("userID").populate("categoryID")
=======
    const decks = await Deck.find().populate('userID').populate('categoryID')
>>>>>>> 708f1f1f913f45858510a6460f8ba01811c930ae
    res.status(200).json(decks)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const show = async (req, res) => {
  try {
<<<<<<< HEAD
    const deck = await Deck.findById(req.params.id).populate('userID').populate('categoryID')
=======
    const deck = await Deck.findById(req.params.id)
      .populate('userID')
      .populate('categoryID')
>>>>>>> 708f1f1f913f45858510a6460f8ba01811c930ae
    res.status(200).json(deck)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const create = async (req, res) => {
  const { userID, categoryID, title, description, visibility, create_date } =
    req.body
  try {
    const deck = await Deck.create({
      userID,
      categoryID,
      title,
      description,
      visibility,
      create_date,
    })
    res.status(201).json(deck)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const update = async (req, res) => {
  try {
    const deck = await Deck.updateOne({ _id: req.params.id }, req.body)
    res.status(200).json(deck)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const destroy = async (req, res) => {
  try {
    const deck = await Deck.deleteOne({ _id: req.params.id })
    res.status(204).json(deck)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
}
