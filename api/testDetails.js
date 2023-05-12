const express = require("express");
const User = require("../models/User");
const testDetails = require("../models/TestDetails");
const router = express.Router();

router.post("/edit", (req, res) => {
  try {
    let reqBody = req.body;
    const { score, user_id, 
      answer1,
      comment1,
      answer2,
      comment2,
      answer3,
      comment3,
      answer4,
      comment4,
      answer5,
      comment5,
      answer6,
      comment6,
      answer7,
      comment7,
      answer8,
      comment8,
      answer9,
      comment9,
      answer10,
      comment10,
     } = reqBody;
    User.findOne({ _id: user_id })
      .then((user) => {
        if (!user) {
          return res.status(400).json({
            message: "User does not exist.",
          });
        }
        testDetails
          .updateOne(
            { user_id },
            {
              $set: {
                final_score: score,
                user_id: user_id,
                answer1: answer1,
                comment1: comment1,
                answer2: answer2,
                comment2: comment2,
                answer3: answer3,
                comment3: comment3,
                answer4: answer4,
                comment4: comment4,
                answer5: answer5,
                comment5: comment5,
                answer6: answer6,
                comment6: comment6,
                answer7: answer7,
                comment7: comment7,
                answer8: answer8,
                comment8: comment8,
                answer9: answer9,
                comment9: comment9,
                answer10: answer10,
                comment10: comment10,
                inserted_by: user_id,
                inserted_at: new Date(),
              },
            },
            { upsert: true }
          )
          .then((testDetails, err) => {
            if (err) {
              console.log(`Error while uploading test details: ${err}`);
              return res.status(500).json({
                message:
                  "There was some problem processing the request. Please try again later.",
              });
            }
            return res.status(201).json({
              message: "Test details updated successfully",
            });
          });
      })
      .catch((error) => {
        console.log(`Error while entering data : ${error}`);
        return res.status(500).json({
          message:
            "There was some problem processing the request. Please try again later.",
        });
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message:
        "There was some problem processing the request. Please try again later.",
    });
  }
});

module.exports = router;
