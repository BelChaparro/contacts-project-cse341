const express = require("express");
const router = express.Router();
const usersController = require("../controllers/contacts");

// GET request for all contacts:
router.get("/", usersController.getAll);
// GET request for a single contact:
router.get("/:id", usersController.getSingle);
// POST request for adding a new contact:
router.post("/", usersController.createContact);
// PUT request for udpating an existing contact:
router.put("/:id", usersController.updateContact);
// DELETE request for deleting an existing contact:
router.delete("/:id", usersController.deleteContact);

// Export router:
module.exports = router;