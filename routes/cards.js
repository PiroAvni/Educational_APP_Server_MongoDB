const express = require('express')

const {
  getCard,
  getCardByID,
  createCard,
  updateCard,
  deleteCard,
  getFlashcardsByDeckId
} = require('../controllers/cards')

const router = express.Router()

router.get('/', getCard)
router.get('/:id', getCardByID)
router.post('/', createCard)
router.patch('/:id', updateCard)
router.delete('/:id', deleteCard)
router.get('/flashcards/decks/:deckId', getFlashcardsByDeckId);

module.exports = router;

