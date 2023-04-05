// External Dependancies
const mongoose = require("mongoose");
const Schema = mongoose.Schema.Types;

const userLikeSchema = new mongoose.Schema(
  {
    user: { type: Schema.ObjectId, ref: "users" },
    post: { type: Schema.ObjectId, ref: "tour_post" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user_tour_post_likes", userLikeSchema);
