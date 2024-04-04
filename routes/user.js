const express = require("express");
const userController = require("../controller/user");

const router = express.Router();

router.post('/create_user', userController.createUser);

module.exports = router;
