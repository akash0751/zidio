const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Register",
      required: true,
    },
    institution: {
      type: String,
      required: true,
      trim: true,
    },
    degree: {
      type: String,
      required: true,
    },
    fieldOfStudy: {
      type: String,
      required: true,
    },
    startYear: {
      type: Number,
    },
    endYear: {
      type: Number,
    },
    grade: {
      type: String,
    },
  },
  { timestamps: true }
);

const Education = mongoose.model("Education", educationSchema);
module.exports = Education;
