const mongoose = require('mongoose');

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
        type: mongoose.Schema.Types.ObjectId,
        ref: "ClassRatings"
    }],
    rating: {
        type: Number,
        default: 3.5
    }
});

ClassSchema.pre('remove', async function (next) {
    try {
        console.log("removing lessons....")
        await mongoose.model('Lesson').remove({
            _id: {
                $in: this.lessons,
            },
        });
        console.log("removing ratings....")
        await mongoose.model('ClassRatings').remove({
            _id: {
                $in: this.ratings,
            },
        })
        next();
    } catch (error) {
        next(error);
    }
});




module.exports = mongoose.model('Class', ClassSchema);