const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// var Class = require('./class');

var ratingClassSchema = new Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    comment: {
        type: String
    },
    class: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class"
    }],
    rating: {
        type: Number,
        default: 3.5
    }
});


var RateClass = (module.exports = mongoose.model("ClassRatings", ratingClassSchema));



module.exports.getClassRatings = function (classID) {
    RateClass.aggregate([{
            "$unwind": "$class"
        },
        {
            "$group": {
                "_id": "$class",
                "ratingAvg": {
                    "$avg": {
                        "$ifNull": ["$rating", 3.5]
                    }
                }
            }
        }
    ], function (err, results) {
        if (err) {
            throw err;
        }

        console.log(results);
        // Class.populate(results, {
        //     "path": "_id"
        // }, function (err, result) {
        //     if (err) {
        //         throw err;
        //     }


        // });
    });
}