const mongodb = require("../db/connection");
//Get unique ID created by MongoDb:
const ObjectId = require("mongodb").ObjectId;

// getAll async function:
const getAll = async (req, res) => {
  //#swagger.tags=['Contacts']
  const result = await mongodb.getDatabase().db().collection("contacts").find();
  result.toArray().then((contacts) => {
    res.setHeader("Content-Type", "application/json");
    if (contacts.length > 0) {
      res.status(200).json(contacts).bodyParser;
    } else {
      res.status(500).json(result.error || "There was an error while fetching all users.");
    }
  });
};

// getSingle async function:
const getSingle = async (req, res) => {
  //#swagger.tags=['Contacts']
  // Validate contact ID:
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("You must use a valid contact ID to find a contact.")
  }
  const contactId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("contacts")
    .find({ _id: contactId }); // _ for object id
    result.toArray().then((contacts) => {
        res.setHeader("Content-Type", "application/json");
        if (contacts.length > 0) {
          res.status(200).json(contacts[0]);
        } else {
          res.status(500).json(result.error || "There was an error while fetching the user.");
        }
    });
    
};

// createContact async function:
const createContact = async (req, res) => {
  //#swagger.tags=['Contacts']
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("contacts")
    .insertOne(contact); // _ for object id
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || "There was an error while creating the user.");
  }
};

// updateContact async function:
const updateContact = async (req, res) => {
  //#swagger.tags=['Contacts']
  // Validate contact ID:
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("You must use a valid contact ID to update a contact.")
  }
  const contactId = new ObjectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("contacts")
    .replaceOne({ _id: contactId }, contact); // _ for object id
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || "There was an error while updating the user.");
  }
};

// deleteContact async function:
const deleteContact = async (req, res) => {
  //#swagger.tags=['Contacts']
  // Validate contact ID:
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("You must use a valid contact ID to delete a contact.")
  }
  const contactId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("contacts")
    .deleteOne({ _id: contactId }); // _ for object id
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || "There was an error while deleting the user.");
  }
};

// Export functions:
module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
  };