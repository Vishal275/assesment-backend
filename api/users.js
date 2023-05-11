const express = require("express");
const User = require("../models/User");
const router = express.Router();

// @route POST api/users/create
router.post("/create", async (req, res) => {
    try {
        await User.create({
            userName: req.body.userName,
            email: req.body.email
        }).then(res.send({sucess: true}))
      } catch (error) {
        console.log(error);
        res.send({ sucess: false });
      }
})

module.exports = router;