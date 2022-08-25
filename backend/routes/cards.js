const router = require('express').Router();

const {
  getCards, createCard, likeCard, dislikeCard, deleteCard,
} = require('../controllers/cards');
const { validateCreateCard, validateCardId } = require('../middlewares/validator');

router.get('/', getCards);
router.post('/', validateCreateCard, createCard);
router.put('/:cardId/likes', validateCardId, likeCard);
router.delete('/:cardId/likes', validateCardId, dislikeCard);
router.delete('/:cardId', validateCardId, deleteCard);

module.exports = router;
