const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var ratingInstructorSchema = new Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    comment: {
        type: String
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
            ref: "Class"
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    rating: {
        type: Number
    }
});


var RateInstructor = (module.exports = mongoose.model("InstructorRatings", ratingInstructorSchema));