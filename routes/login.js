const express = require("express");
const loginController = require("../controller/login");

const router = express.Router();

router.get('/login', loginController.loginUser);

module.exports = router;
