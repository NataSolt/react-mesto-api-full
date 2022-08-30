const Card = require('../models/card');
const BadRequest = require('../errors/badrequest');
const Forbidden = require('../errors/forbidden');
const NotFound = require('../errors/notfound');
const { CREATED } = require('../statusError');

// возвращаем карточки
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

// создаем карточку
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({
    name,
    link,
    owner,
  })
    .then((card) => res.status(CREATED).send(card))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequest('Некорректные данные'));
        return;
      }
      next(error);
    });
};

// ставим лайк
module.exports.likeCard = (req, res, next) => {
  const owner = req.user._id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: owner } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFound('Карточка не существует');
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
};

// удаляем лайк
module.exports.dislikeCard = (req, res, next) => {
  const owner = req.user._id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: owner } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFound('Карточка не существует');
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
};

// удаляем карточки по id
module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFound('Карточка с указанным _id не найдена');
      }
      if (JSON.stringify(card.owner) !== JSON.stringify(req.user._id)) {
        throw new Forbidden('Нельзя удалить эту карточку');
      }
      return Card.remove(card);
    })
    .then(() => res.status(200).send({ message: 'Карточка успешно удалена' }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Невалидный id'));
        return;
      }
      next(err);
    });
};
