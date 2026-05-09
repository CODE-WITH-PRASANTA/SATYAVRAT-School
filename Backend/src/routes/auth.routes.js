const express = require("express");

const router = express.Router();

const {
  loginAdmin,
} = require("../controllers/auth.controller");


// LOGIN
router.post("/login", loginAdmin);

module.exports = router;