const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Class = require('./class');

const LessonSchema = Schema({
  title: {
    type: String
  },
  body: {
    type: String
  },
  number: {
    type: String
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
      ref: "Class"
  }
});

var Lesson = (module.exports = mongoose.model("Lesson", LessonSchema));