const mongoose = require("mongoose");

var LessonSchema = mongoose.Schema({
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