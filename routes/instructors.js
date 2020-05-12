const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Instructor = require('../models/instructor');

/**
 * @route POST api/instructors/classes/:id
 * @desc Get classes by instructor
 * @access Private
 * Working
 */
router.get('/classes/:id', async function (req, res, next) {
    console.log('Getting instructors classes...');
    try {
        const {
            id
        } = req.params;
        const instructorByID = await User.findById(id);

        const instructorByUsername = await Instructor.findOne({
            username: instructorByID.username,
        }).populate({
            path: 'classes',
            select: ['title', 'imgUrl', 'rating'],
            populate: {
                path: 'instructor',
                select: ['email', 'username', 'id'],
            },
        });

        // console.log(instructorByUsername.classes)
        res.status(200).json({
            classes: instructorByUsername.classes
        });
    } catch (err) {
        console.log(err);
    }
});



/**
 * @route POST api/instructors/rate
 * @desc Rate instructor
 * @access Private
 * Testing
 */
router.post('/rate/:instructorID/:userID', async function (req, res, next) {
    const {
        instructorID,
        userID
    } = req.params;

    let rating = Rating.create({
        instructorID: instructorID,
        userID: userID,
        rating: req.body.rating,
    })

    let instructorByID = await Instructor.findById(instructorID)
    instructorByID.ratings.push(rating);
    instructorByID.save();

    Rating.aggregate(
        [{
            "$group": {
                "_id": "$instructorID",
                "avgRating": {
                    "$avg": {
                        "$ifNull": ["$rating", 4]
                    }
                }
            }
        }],
        function (err, results) {
            results = results.map(function (result) {
                    return new classResultSchema(result);
                }),
                Class.populate(
                    results, {
                        path: "_id"
                    },
                    function (err, results) {
                        console.log(results);
                        // callback(err)
                    }
                )
        }
    );

    res.status(200).json({
        msg: "Thanks for your feedback",
        success: true
    });
});



router.all('*', (req, res) => {
    res.status(400).send({
        error: 'undefined-route'
    });
});

module.exports = router;