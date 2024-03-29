const express = require('express');
const mongodb = require("./db/connection");
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 3000;

app
  // To be able to ready the body from the request object when creating a new contact:
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allows cross-origin
    res.setHeader('Access-Control-Allow-Headers', // Allows any header
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization');
    res.setHeader('Access-Control-Allow-Methods', // Allow all methods from API
    'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

// When "/" go to ./routes/index.js
app.use("/", require("./routes"));

// "Catch all" error handling:
process.on("uncaughtException", (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception on origin: ${origin}`);
});


mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is listening and node is running on port ${port}`);
    });
  }
});