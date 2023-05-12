const express = require("express");
const User = require("../models/User");
const router = express.Router();

// @route POST api/users/create
router.post("/create", async (req, res) => {
  try {
    await User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        return res.status(400).json({
          message: "Already submitted.",
        });
      }
      User.create({
        userName: req.body.userName,
        email: req.body.email,
      }).then((user) => {res.status(200).json({user: user, sucess: true })});
    })
  } catch (error) {
    console.log(error);
    res.send({ sucess: false });
  }
});

router.get("/fetch-user", async (req, res) => {
  try {
    User.find({email: req.body.email}).then((user) => {
      // res.send(user)
      console.log(user);
    })
  } catch (error) {
    console.log(error);
    res.send({ sucess: false });
  }
});

module.exports = router;
