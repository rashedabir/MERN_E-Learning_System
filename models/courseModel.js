const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    course_code: {
      type: String,
      trim: true,
      unique: true,
      require: true,
    },
    title: {
      type: String,
      trim: true,
      require: true,
    },
    price: {
      type: String,
      trim: true,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    about: {
      type: String,
      require: true,
    },
    images: {
      type: Object,
      require: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    enrolled: {
      type: Number,
      default: 0,
    },
    objective: {
      type: Array,
      default: [],
      require: true,
    },
    requirements: {
      type: Array,
      default: [],
    },
    videos: {
      type: Array,
      default: [],
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Courses", courseSchema);
