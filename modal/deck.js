const mongoose = require('mongoose');

const deckSchema = new mongoose.Schema({
  cards: [
    {
      type: String,
      enum: ['cat', 'defuse', 'shuffle', 'exploding_kitten'],
      required: true
    }
  ]
});

module.exports = mongoose.model('Deck', deckSchema);


