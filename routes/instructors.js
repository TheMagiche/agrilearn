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

/**
 * @route GET api/instructors/:id/profile
 * @desc Return the User's Data
 * @access Private
 */
router.get('/:id/profile',async function(req, res){
    console.log('fetching instructor details...')
    const instructorID = req.params.id;
    const instructorByID = await User.findById(instructorID);

    const instructorByUsername = await Instructor.findOne(
        {username: instructorByID.username}
    );

        return res.status(200).json({
            username: instructorByID.username,
            email: instructorByID.email,
            type: instructorByID.type,
            verified: instructorByID.verified,
            phoneNumber: instructorByID.phoneNumber,
            first_name: instructorByUsername.first_name,
            last_name: instructorByUsername.last_name,
            classes: instructorByUsername.classes
        });

    }
);
/**
 * @route POST api/students/:id/profile
 * @desc Return the User's Data
 * @access Private
 */
router.post('/profile/update', async function(req, res){
    const username = req.body.username;
    const instructorByUsername = await Instructor.findOneAndUpdate({username:username},{first_name: req.body.first_name, last_name:req.body.last_name}, {new: true});

    return res.status(200).json({
        first_name: instructorByUsername.first_name,
        last_name: instructorByUsername.last_name,
        success: true,
        msg: "Updated Details Successfully"
    })
});


router.all('*', (req, res) => {
    res.status(400).send({
        error: 'undefined-route'
    });
});

module.exports = router;