const express = require("express");
const router = express.Router();
const usersController = require("../controllers/contacts");

// GET request for all contacts:
router.get("/", usersController.getAll);
// GET request for a single contact:
router.get("/:id", usersController.getSingle);

// Export router:
module.exports = router;