const Card = require('../models/cardsModel');

const getCard = async (req, res) => {
  try {
    const cards = await Card.find();
    if (cards.length === 0) {
      throw new Error('No cards found');
    }
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCardByID = async (req, res) => {
  const id = req.params.id;
  try {
    const card = await Card.findById(id);
    if (!card) {
      throw new Error('Cannot locate the card');
    }
    res.status(200).send(card);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createCard = async (req, res) => {
  const { name } = req.body;
  try {
    const newCard = await Card.create({ name });
    res.status(201).send(newCard);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateCard = async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  try {
    const updatedCard = await Card.findByIdAndUpdate(id, { name }, { new: true });
    if (!updatedCard) {
      throw new Error('Cannot locate the card');
    }
    res.status(200).send(updatedCard);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteCard = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedCard = await Card.findByIdAndDelete(id);
    if (!deletedCard) {
      throw new Error('Cannot locate the card');
    }
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = { getCard, getCardByID, createCard, updateCard, deleteCard };
