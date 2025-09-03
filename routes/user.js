const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

//GET - Show user registration form
router.get("/new", userController.getNewUserForm);

//POST - Create user (registration)
router.post("/", userController.createUser);

module.exports = router;
