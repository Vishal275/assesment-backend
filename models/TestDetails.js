const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TestdetailsSchema = new Schema({
  final_score: {
    type: Number,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    unique: true,
  },
  answer1: {
    type: Array,
  },
  comment1: {
    type: String,
  },
  answer2: {
    type: Array,
  },
  comment2: {
    type: String,
  },
  answer3: {
    type: Array,
  },
  comment3: {
    type: String,
  },
  answer4: {
    type: Array,
  },
  comment4: {
    type: String,
  },
  answer5: {
    type: Array,
  },
  comment5: {
    type: String,
  },
  answer6: {
    type: Array,
  },
  comment6: {
    type: String,
  },
  answer7: {
    type: Array,
  },
  comment7: {
    type: String,
  },
  answer8: {
    type: Array,
  },
  comment8: {
    type: String,
  },
  answer9: {
    type: Array,
  },
  comment9: {
    type: String,
  },
  answer10: {
    type: Array,
  },
  comment10: {
    type: String,
  },
  inserted_by: {
    type: Schema.Types.ObjectId,
  },
  inserted_at: {
    type: Date,
    default: Date.now,
  },
});

let testDetails = mongoose.model("testDetails", TestdetailsSchema);
module.exports = testDetails;
