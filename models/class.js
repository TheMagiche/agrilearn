var mongoose = require('mongoose');
var Lesson = require('./lesson');
var Schema = mongoose.Schema;

var ClassSchema = mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    imgUrl: {
        type: String,
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    lessons: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson',
    }, ],
    readTime: {
        type: String,
        default: "10 minutes",
    },
    pro: {
        type: Boolean,
        default: false,
    },
    ratings: [{
        type: Schema.Types.ObjectId,
        ref: "RatingClass"
    }],
    rating: {
        type: Number,
        default: 3.5
    }
});

ClassSchema.pre('remove', async function (next) {
    try {
        await Lesson.remove({
            _id: {
                $in: this.lessons,
            },
        });
        next();
    } catch (error) {
        next(error);
    }
});




var Class = (module.exports = mongoose.model('Class', ClassSchema));



// Fetch all classes for home page
module.exports.getClasses = function (callback, limit) {
    Class.find(callback)
        .limit(limit)
        .populate('instructor');
};

// Fetch all classes
module.exports.getAllClasses = function (callback) {
    Class.find(callback).populate('instructor');
};

// Fetch a single class
module.exports.getClassById = function (id, callback) {
    Class.findById(id, callback);
};