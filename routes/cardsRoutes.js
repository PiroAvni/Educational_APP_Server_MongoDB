const express = require('express')

const { getCard, getCardByID, createCard, updateCard, deleteCard } = require('../controllers/cardsControllers')

const router = express.Router()

router.get('/', getCard)
router.get('/:id', getCardByID)
router.post('/', createCard)
router.patch('/:id', updateCard)
router.delete('/:id', deleteCard)

module.exports = router
