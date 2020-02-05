var mongoose = require("mongoose");

var LessonSchema = new mongoose.Schema({
  title: {
    type: String
  },
  body: {
    type: String
  },
  number: {
    type: String
  }
});

var Lesson = (module.exports = mongoose.model("Lesson", LessonSchema));
