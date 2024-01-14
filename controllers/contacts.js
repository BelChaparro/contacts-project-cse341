const mongodb = require("../db/connection");
//Get unique ID created by MongoDb:
const ObjectId = require("mongodb").ObjectId;

// getAll async function:
const getAll = async (req, res) => {
  const result = await mongodb.getDatabase().db().collection("contacts").find();
  result.toArray().then((contacts) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contacts).bodyParser;
  });
};

// getSingle async function:
const getSingle = async (req, res) => {
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

// Export functions:
module.exports = {
    getAll,
    getSingle
  };