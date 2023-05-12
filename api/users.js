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
      }).then((user) => {res.status(200).json({user: user, sucess: true })}).catch(error => console.log(error));
    })
  } catch (error) {
    console.log(error);
    res.send({ sucess: false });
  }
});

router.get("/fetch-user", async (req, res) => {
  try {
    User.findOne({email: req.body.email}).then((user) => {
      // res.send(user)
      console.log(user);
    })
  } catch (error) {
    console.log(error);
    res.send({ sucess: false });
  }
});

router.get("/all-users", async (req, res) => {
  try {
    User.find().then((user) => {
      res.json(user);
    })
  } catch (error) {
    console.log(error);
    res.send({ sucess: false });
  }
});

router.post("/edit-score", async (req, res) => {
  try {
    const {user_id, score} = req.body
    User.findOne({_id: user_id}).then((user) => {
      if(!user) {
        return res.status(400).json({
          message: "User does not exist.",
        });
      }
      User.updateOne(
        { _id : user_id },
        {
          $set: {
            score: score
          },
        },
        { upsert: true }
      )
      .then((User, err) => {
        if (err) {
          return res.status(500).json({
            message:
              "There was some problem processing the request. Please try again later.",
          });
        }
        return res.status(201).json({
          message: "Success",
        });
      }).catch((error) => {
        console.log(`Error while entering data : ${error}`);
        return res.status(500).json({
          message:
            "There was some problem processing the request. Please try again later.",
        });
      });
    })
  } catch (error) {
    console.log(error);
    res.send({ sucess: false });
  }
});

module.exports = router;
