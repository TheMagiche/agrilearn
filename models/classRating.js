const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var Class = require('./class');

var ratingClassSchema = new Schema({
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
    rating: {
        type: Number,
        default: 3.5
    }
});

ratingClassSchema.post('save', async function (res) {
    const averageRating = await mongoose.model("ClassRatings", ratingClassSchema).aggregate([{
        $match: {
            class: this.class
        }
    }, {
        $group: {
            "_id": "$class",
            "ratingAvg": {
                $avg: "$rating"
            }
        }
    }])

    if (averageRating.length) {
        await Class.updateOne({
            _id: this.class
        }, {
            $set: {
                rating: averageRating[0]['ratingAvg']
            }
        }).exec()
    }
});

ratingClassSchema.post(/updateOne/, async function (res) {
    const averageRating = await mongoose.model("ClassRatings", ratingClassSchema).aggregate([{
        $match: {
            class: mongoose.Types.ObjectId(this._conditions.class)
        }
    }, {
        $group: {
            "_id": "$class",
            "ratingAvg": {
                $avg: "$rating"
            }
        }
    }])

    if (averageRating.length) {
        await Class.updateOne({
            _id: mongoose.Types.ObjectId(this._conditions.class)
        }, {
            $set: {
                rating: averageRating[0]['ratingAvg']
            }
        }).exec()
    }
})

var RateClass = (module.exports = mongoose.model("ClassRatings", ratingClassSchema));