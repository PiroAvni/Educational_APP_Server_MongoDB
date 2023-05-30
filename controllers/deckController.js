const Deck = require('../models/deckModel');

const index = async( req, res ) => {
    try {
        const decks = await Deck.getAll();
        res.status(200).json(decks);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const show = async( req, res ) => {
    try {
        const decks = await Deck.getById(req.params.id);
        res.status(200).json(decks);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const create = async( req, res ) => {
    try {
        const decks = await Deck.create(req.body);
        res.status(200).json(decks);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const update = async( req, res ) => {
    try {
        const decks = await Deck.update(req.params.id, req.body);
        res.status(200).json(decks);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const destroy = async( req, res ) => {
    try {
        const decks = await Deck.destroy(req.params.id);
        res.status(200).json(decks);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports = { 
    index,
    show,
    create,
    update,
    destroy
}