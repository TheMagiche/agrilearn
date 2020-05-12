const mongoose = require('mongoose');

var ratingClassSchema = mongoose.Schema({
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
    console.log("Post hook save");
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

        await mongoose.model('Class').updateOne({
            _id: this.class
        }, {
            $set: {
                rating: averageRating[0]['ratingAvg']
            }
        }).exec()
    }

});

ratingClassSchema.post(/updateOne/, async function (res) {
    console.log("Post hook update");
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
        // console.log(averageRating)
        await mongoose.model('Class').updateOne({
            _id: this.class
        }, {
            $set: {
                rating: averageRating[0]['ratingAvg']
            }
        }).exec()
    }

});


module.exports = mongoose.model("ClassRatings", ratingClassSchema);