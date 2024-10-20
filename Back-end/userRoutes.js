const express = require("express");
const router = express.Router();
const userControllers = require ("./userControllers");


router.get('/hola', userControllers.getuser);
module.exports = router;