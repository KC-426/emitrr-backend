const express = require("express");
const deckController = require("../controller/deck");

const router = express.Router();

router.post('/start_game', deckController.startGame)
router.post("/draw_card_to_win", deckController.drawCardFromDeck)
router.get('/leaderboard', deckController.getLeaderboard)

module.exports = router;
