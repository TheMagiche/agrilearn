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
router.post('/classes/:id', async function(req, res, next) {
    console.log('Getting instructors classes...');
    try {
        const { id } = req.params;
        const { page, limit } = req.body;
        const instructorByID = await User.findById(id);

        const countDoc = await Instructor.findOne({
            username: instructorByID.username,
        });
        let count = countDoc.toObject();
        count = count.classes.length;

        const instructorByUsername = await countDoc
            .populate({
                path: 'classes',
                select: ['title', 'imgUrl', 'rating', 'instructor', 'pro'],
                options: {
                    limit: limit * 1,
                    skip: (page - 1) * limit,
                },
                populate: {
                    path: 'instructor',
                    select: ['username', 'avatar'],
                },
            })
            .execPopulate();
        res.status(200).json({
            classes: instructorByUsername.classes,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
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
router.post('/rate/:instructorID/:userID', async function(req, res, next) {
    const { instructorID, userID } = req.params;

    let rating = Rating.create({
        instructorID: instructorID,
        userID: userID,
        rating: req.body.rating,
    });

    let instructorByID = await Instructor.findById(instructorID);
    instructorByID.ratings.push(rating);
    instructorByID.save();

    Rating.aggregate(
        [
            {
                $group: {
                    _id: '$instructorID',
                    avgRating: {
                        $avg: {
                            $ifNull: ['$rating', 4],
                        },
                    },
                },
            },
        ],
        function(err, results) {
            (results = results.map(function(result) {
                return new classResultSchema(result);
            })),
                Class.populate(
                    results,
                    {
                        path: '_id',
                    },
                    function(err, results) {
                        console.log(results);
                        // callback(err)
                    }
                );
        }
    );

    res.status(200).json({
        msg: 'Thanks for your feedback',
        success: true,
    });
});

/**
 * @route GET api/instructors/:id/profile
 * @desc Return the User's Data
 * @access Private
 */
router.get('/:id/profile', async function(req, res) {
    console.log('fetching instructor details...');
    try {
        const instructorID = req.params.id;
        const instructorByID = await User.findById(instructorID);
        const instructorByUsername = await Instructor.findOne({
            username: instructorByID.username,
        });

        return res.status(200).json({
            username: instructorByID.username,
            email: instructorByID.email,
            type: instructorByID.type,
            verified: instructorByID.verified,
            phoneNumber: instructorByID.phoneNumber,
            first_name: instructorByUsername.first_name,
            last_name: instructorByUsername.last_name,
            classes: instructorByUsername.classes,
            avatar: instructorByID.avatar,
        });
    } catch (error) {
        res.status(500).send({
            msg: 'Something went wrong',
            success: false,
        });
        console.log(error);
    }
});

router.all('*', (req, res) => {
    res.status(400).send({
        error: 'undefined-route',
    });
});

module.exports = router;
