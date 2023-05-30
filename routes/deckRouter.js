const express = require ('express') ;

const {
    index,
    show,
    create,
    update,
    destroy
    } = require ('../controllers/deckController.js') ;

const router = express.Router();