const express = require("express");
const router = express.Router();
const usersController = require("../controllers/contacts");
//const validation = require('../middleware/validator.js')
const { userValidationRules, validate } = require('../middleware/validator');

// GET request for all contacts:
router.get("/", usersController.getAll);
// GET request for a single contact:
router.get("/:id", usersController.getSingle);
// POST request for adding a new contact & validation:
router.post("/", userValidationRules(), validate, usersController.createContact);
// PUT request for udpating an existing contact & validation:
router.put("/:id", userValidationRules(), validate, usersController.updateContact);
// DELETE request for deleting an existing contact:
router.delete("/:id", usersController.deleteContact);

// Export router:
module.exports = router;
