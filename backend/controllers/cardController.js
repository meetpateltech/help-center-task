const Card = require('../models/Card');

exports.createCard = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    const existingCard = await Card.findOne({ title }).collation({ locale: 'en', strength: 2 });
    if (existingCard) {
      return res.status(409).json({ message: 'Card with this title already exists' });
    }

    const card = await Card.create({ title, description });
    res.status(201).json(card);
  } catch (error) {
    next(error);
  }
};

exports.getAllCards = async (req, res, next) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (error) {
    next(error);
  }
};

exports.getCardByTitle = async (req, res, next) => {
  try {
    const card = await Card.findOne({ title: req.params.title }).collation({ locale: 'en', strength: 2 });
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }
    res.json(card);
  } catch (error) {
    next(error);
  }
};
