const deck_schema = require("../modal/deck");
const User = require('../modal/user')

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
  try {
    if (deck.length === 0) {
      throw new Error("No cards left in the deck");
    }

    const drawnCard = deck.shift();

    switch (drawnCard) {
      case "cat":
        return res
          .status(200)
          .json({ message: "Cat card drawn successfully", card: drawnCard });
      case "defuse":
        return res
          .status(200)
          .json({ message: "Defuse card drawn successfully", card: drawnCard });
      case "exploding_kitten":
        return res
          .status(200)
          .json({ message: "Boom! You lost the game!", card: drawnCard });
      case "shuffle":
        initializeDeck();
        return res
          .status(200)
          .json({
            message: "Shuffle card drawn successfully",
            card: drawnCard,
          });
      default:
        return res
          .status(200)
          .json({ message: "Card drawn successfully", card: drawnCard });
    }
  } catch (error) {
    console.error("Error drawing card:", error);
    return res
      .status(500)
      .json({ error: error.message || "Internal Server Error" });
  }

  
};

const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await User.find().sort({ wins: -1 }).limit(10);
    res.status(200).json(leaderboard);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  startGame,
  drawCardFromDeck,
  getLeaderboard,
};
