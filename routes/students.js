const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Student = require('../models/student');
const Class = require('../models/class');
const RateClass = require('../models/classRating');
const RateInstructor = require('../models/instructorRating');
const Instructor = require('../models/instructor');
const mongoose = require('mongoose');
/**
 * @route POST api/student/classes/:id
 * @desc Get students classes
 * @access Private
 * Untested
 */
router.get('/classes/:id', async function (req, res, next) {
    try {
        const {
            id
        } = req.params;
        const studentByID = await User.findById(id);

        const studentByUsername = await Student.findOne({
            username: studentByID.username,
        }).populate({
            path: 'classes',
        });

        // console.log(studentByUsername.classes);

        return res.status(200).json({
            classes: studentByUsername.classes
        });
    } catch (err) {
        console.log(err);
    }
});

/**
 * @route POST api/student/class/:classID/register
 * @desc Register Student for a class
 * @access Private
 * Working
 */
router.post('/:id/class/:classID/register', async function (req, res) {
    console.log('Registering classes...');
    try {
        const {
            id,
            classID
        } = req.params;

        const studentByID = await User.findById(id);
        const classByID = await Class.findById(classID);

        const exists = await Class.aggregate([{
            $match: {
                $and: [{
                    _id: mongoose.Types.ObjectId(classID)
                }, {
                    students: {
                        $elemMatch: {
                            $eq: mongoose.Types.ObjectId(id)
                        }
                    }
                }]
            }
        }])

        if (exists.length) {
            return res.status(200).json({
                msg: 'Already registered for class',
                success: false,
            });
        }

        classByID.students.push(studentByID);
        classByID.save();

        var query = {
            username: studentByID.username
        };

        await Student.findOneAndUpdate(
            query,
            // Append the values to an array - push classes inside the instructor collection
            {
                $addToSet: {
                    classes: classByID
                }
            },
            // Creates a new document if no documents match the filter or update
            {
                safe: true,
                upsert: true
            },


        );

        return res.status(200).json({
            msg: 'Registered class successfully',
            success: true,
        });


    } catch (err) {
        console.log(err);
    }
});

/**
 * @route POST api/student/class/:classID/rate
 * @desc Rate a class
 * @access Private
 * Working
 */
router.post('/:id/class/:classID/rate', async function (req, res) {
    console.log('Rating class...');
    try {
        const {
            id,
            classID
        } = req.params;

        const rate = await RateClass.findOne({
            author: id,
            class: classID
        })

        if (rate) {
            await RateClass.updateOne({
                author: id,
                class: classID
            }, {
                $set: {
                    rating: req.body.rate,
                    comment: req.body.comment
                }
            }).exec()

            return res.status(200).json({
                msg: "Updated your response",
                success: true
            });
        }

        let newRate = await RateClass.create({
            author: id,
            comment: req.body.comment,
            class: classID,
            rating: req.body.rate
        });

        const classByID = await Class.findById(classID)
        classByID.ratings.push(newRate);
        classByID.save();

        return res.status(200).json({
            msg: "Thank you for your feedback",
            success: true
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: "Error submitting your response",
            success: false
        });
    }
});

/**
 * @route POST api/student/class/:classID/rate
 * @desc Rate an instructor
 * @access Private
 * Working
 */
router.post('/:id/:classID/:instructorID/rate', async function (req, res) {
    console.log('Rating instructor...');
    try {
        const {
            id,
            classID,
            instructorID
        } = req.params;

        let newRate = new RateInstructor({
            author: id,
            comment: req.body.comment,
            class: classID,
            instructor: instructorID,
            rating: req.body.rate
        });

        newRate.save();
        const instructorByID = await Instructor.findById(classID)
        instructorByID.ratings.push(newRate);
        instructorByID.save()

        return res.status(200).json({
            msg: "Thank you for your feedback",
            success: true
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: "Error submitting your response",
            success: false
        });
    }
});

router.all('*', (req, res) => {
    res.status(400).send({
        error: 'undefined-route'
    });
});

module.exports = router;