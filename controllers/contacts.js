const mongodb = require("../db/connection");
//Get unique ID created by MongoDb:
const ObjectId = require("mongodb").ObjectId;

// getAll async function:
const getAll = async (req, res) => {
  //#swagger.tags=['Contacts']
  const result = await mongodb.getDatabase().db().collection("contacts").find();
  result.toArray().then((contacts) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contacts).bodyParser;
  });
};

// getSingle async function:
const getSingle = async (req, res) => {
  //#swagger.tags=['Contacts']
  const contactId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("contacts")
    .find({ _id: contactId }); // _ for object id
  result.toArray().then((contacts) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contacts[0]);
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
  if (response.acknowledge) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || "There was an error while creating the user.");
  }
};

// updateContact async function:
const updateContact = async (req, res) => {
  //#swagger.tags=['Contacts']
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
    .deleteOne({ _id: contactId }, contact); // _ for object id
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || "There was an error while updating the user.");
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