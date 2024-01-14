const router = require('express').Router();

router.get("/", (req, res) => {
    res.send("This is the home page");
});

router.use("/contacts", require("./contacts"));

module.exports = router;