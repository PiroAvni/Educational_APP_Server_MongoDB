const Deck = require("../models/Decks");

const index = async (req, res) => {
  try {
    const decks = await Deck.find()
      .populate("userId")
      .populate("categoryId");
    res.status(200).json(decks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const show = async (req, res) => {
  try {
    const deck = await Deck.findById(req.params.id)
      .populate("userId")
      .populate("categoryId");
    res.status(200).json(deck);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const create = async (req, res) => {
  const { userId, categoryId, title, description, visibility, create_date } =
    req.body;
  try {
    const deck = await Deck.create({
      userId,
      categoryId,
      title,
      description,
      visibility,
      create_date,
    });
    res.status(201).json(deck);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const deck = await Deck.updateOne({ _id: req.params.id }, req.body);
    res.status(200).json(deck);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const destroy = async (req, res) => {
  try {
    const deck = await Deck.deleteOne({ _id: req.params.id });
    res.status(204).json(deck);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getDecksByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    // Query the database to find decks with the specified categoryId
    const decks = await Deck.find({ categoryId });

    res.json(decks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
  getDecksByCategory,
};

