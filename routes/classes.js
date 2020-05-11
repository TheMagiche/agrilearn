var express = require('express');
var router = express.Router();
var Class = require('../models/class');
var Instructor = require('../models/instructor');
var User = require('../models/user');
var mongoose = require('mongoose');
var RatingClass = require('../models/classRating')
/**
 * @route POST api/classes/
 * @desc Get some classes
 * @access Private
 * Working
 */
router.get('/', function (req, res, next) {
    try {
        console.log('classes...');

        Class.getClasses(function (err, classes) {
            if (err) {
                throw err;
            }

            // console.log(classes)

            res.status(200).json({
                title: 'All Classes',
                classes: classes
            });

        }, 10);


    } catch (err) {
        console.log(err);
    }
});
/**
 * @route POST api/classes/all
 * @desc Get all classes
 * @access Private
 * Working
 */
router.get('/all', function (req, res, next) {
    try {
        console.log('classes...');
        Class.getAllClasses(function (err, classes) {
            if (err) {
                throw err;
            }
            // console.log(classes);
            res.status(200).json({
                title: 'All Classes',
                classes: classes
            });
        });
    } catch (err) {
        console.log(err);
    }
});

/**
 * @route POST api/classes/create/:id
 * @desc Create class
 * @access Private
 * Working
 */
router.post('/create/:id', async function (req, res, next) {
    console.log('Receiving class details...');

    try {
        const id = req.params.id;
        // console.log(id);
        const {
            title,
            description,
            imageUrl,
            pro,
            readTime
        } = req.body;

        const myclass = await Class.create({
            title: title,
            description: description,
            imgUrl: imageUrl,
            instructor: id,
            pro: pro,
            readTime: readTime
        });
        await myclass.save();

        const instructorByID = await User.findById(id);
        // console.log(instructorByID);
        // console.log(instructorByID.username);
        const instructorByUsername = await Instructor.findOne({
            username: instructorByID.username,
        });
        // console.log(instructorByUsername);
        instructorByUsername.classes.push(myclass);

        await instructorByUsername.save();
        return res.status(200).json(instructorByID);
    } catch (err) {
        console.log(err);
    }
});

/**
 * @route POST api/classes/:id/update
 * @desc Update class
 * @access Private
 * Working
 */
router.put('/:id/update', function (req, res, next) {
    Class.findByIdAndUpdate(req.params.id, req.body, function (err, myclass) {
        if (err) return next(err);
        return res.json({
            success: true,
            msg: 'Successfully updated class',
            class: myclass,
        });
    });
});

/**
 * @route POST api/classes/:id/delete
 * @desc Delete class
 * @access Private
 * Working
 */
router.delete('/:id/delete', async function (req, res, next) {
    await Instructor.update({
            _id: req.body.instructorID
        }, {
            $pull: {
                classes: mongoose.Types.ObjectId(req.params.id)
            }
        }, {
            safe: true,
        },
        function (err) {
            console.log(err);
        }
    );

    Class.findById(req.params.id, function (err, myclass) {
        if (err) return next(err);
        myclass.remove();
        return res.json({
            success: true,
            msg: 'Successfully deleted class',
        });
    });
});

/**
 * @route POST api/classes/details/:id/
 * @desc get single class
 * @access Private
 * Working
 */
router.get('/details/:id', async function (req, res) {
    console.log('fetching class...');
    try {
        const id = req.params.id;
        const classByID = await Class.findById(id)
            .populate({
                path: 'instructor',
                select: ['email', 'username'],
            })
            .populate({
                path: 'lessons',
                select: ['title', '_id'],
            })
            .populate({
                path: 'ratings',
                select: ['author', 'comment', 'rating'],
                populate: {
                    path: 'author',
                    select: ['username', 'email']
                }
            });
        // console.log(classByID);

        res.status(200).json({
            class: classByID
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            err: err,
        });
    }
});

/**
 * @route POST api/classes/instructors/:id
 * @desc Get instructors classes
 * @access Private
 * Working
 */
router.post('/instructor/:id', async function (req, res, next) {
    const {
        id
    } = req.params;
    const instructorByClass = await (await Class.findById(id)).populate('instructor');
    res.status(200).json({
        class: instructorByClass
    });
});



router.all('*', (req, res) => {
    res.status(400).send({
        error: 'undefined-route'
    });
});

module.exports = router;