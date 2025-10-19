const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Register",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    date: {
      type: Date,
      default: Date.now,
    },
    certificateLink: {
      type: String,
      default: "",
    },
    organization: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Achievement = mongoose.model("Achievement", achievementSchema);
module.exports = Achievement;
