const express = require('express');
const {
  index,
  show,
  create,
  update,
  destroy
} = require('../controllers/deckController');

const router = express.Router();

router.get('/', index);
router.get('/:id', show);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', destroy);

module.exports = router;