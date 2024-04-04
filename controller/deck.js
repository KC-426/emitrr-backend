const deck_schema = require("../modal/deck");

const cardTypes = ["cat", "defuse", "shuffle", "exploding_kitten"];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function initializeDeck() {
  const deck = [];
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * cardTypes.length);
    const card = cardTypes[randomIndex];
    deck.push(card);
  }
  shuffleArray(deck);
  return deck;
}

let deck = [];

const startGame = async (req, res) => {
  try {
    deck = initializeDeck();
    const newDeck = new deck_schema({ cards: deck });
    await newDeck.save();
    return res.status(200).json({ message: "Game started !", deck: newDeck });
  } catch (error) {
    console.error("Error starting the game:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const drawCardFromDeck = async (req, res) => {
  if (deck.length === 0) {
    res.status(400).json({ error: "No cards left in the deck" });
    return;
  }

  const drawnCard = deck.shift();

  switch (drawnCard) {
    case "cat":
      break;
    case "defuse":
      break;
    case "exploding_kitten":
      res.status(200).json({ message: "Boom! You lost the game!" });
      return;
    case "shuffle":
      deck = initializeDeck();
      break;
  }

  if (deck.length === 0) {
    res.status(200).json({ message: "Congratulations! You won the game!" });
    return;
  }

  res.status(200).json({ message: "Card drawn successfully", card: drawnCard });
};

module.exports = {
  startGame,
  drawCardFromDeck
};
