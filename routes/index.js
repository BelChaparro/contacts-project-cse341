const router = require('express').Router();

router.use('/', require('./swagger'));
router.get("/", (req, res) => {
    //#swagger.tags=['This is the home page']
    res.send("This is the home page");
});

router.use("/contacts", require("./contacts"));

module.exports = router;