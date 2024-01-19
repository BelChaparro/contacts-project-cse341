const express = require('express');
const mongodb = require("./db/connection");
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 3000;

// To be able to ready the body from the request object when creating a new contact:
app.use(bodyParser.json());
// When "/" go to ./routes/index.js
app.use("/", require("./routes"));


mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is listening and node is running on port ${port}`);
    });
  }
});