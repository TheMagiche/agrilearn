var mongoose = require('mongoose');
var Lesson = require('./lesson');
var Instructor = require('./instructor');

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
    lessons: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Lesson',
        },
    ],
});

ClassSchema.pre('remove', async function(next) {
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

// Fetch all classes
module.exports.getClasses = function(callback, limit) {
    Class.find(callback)
        .limit(limit)
        .populate('instructor');
};

// Fetch a single class
module.exports.getClassById = function(id, callback) {
    Class.findById(id, callback);
};
