const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

// When "/" go to ./routes/index.js
app.use("/", require("./routes"));

app.listen(port, () => {
    console.log(`Node is running on port ${port}`);
  });