const express = require('express');
const router = express.Router();
const Class = require('../models/class');
const Instructor = require('../models/instructor');
const User = require('../models/user');
const ClassRating = require('../models/classRating');
const mongoose = require('mongoose');


/**
 * @route POST api/classes/
 * @desc Get some classes
 * @access Private
 * Working
 */
router.get('/', async function (req, res) {
    try {
        console.log('classes...');

        const classes = await Class.find()
            .select({
                "title": 1,
                "instructor": 1,
                "_id": 1,
                "rating": 1,
                "imgUrl": 1,
                "pro": 1
            })
            .limit(10)
            .populate({
                path: 'instructor',
                select: ['username']
            });

        res.status(200).json({
            classes: classes
        });

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
router.post('/all', async function (req, res) {
    const {
        page,
        limit
    } = req.body;

    console.log('classes...');

    const classes = await Class.find()
        .select({
            "title": 1,
            "instructor": 1,
            "_id": 1,
            "rating": 1,
            "imgUrl": 1,
            "pro": 1
        })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .populate({
            path: 'instructor',
            select: ['username']
        });
    const count = await Class.countDocuments();
    res.status(200).json({
        classes: classes,
        totalPages: Math.ceil(count / limit),
        currentPage: page
    });
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
            .select('-ratings')
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
router.post('/instructor/:id', async function (req, res) {
    const {
        id
    } = req.params;
    const instructorByClass = await (await Class.findById(id)).populate('instructor');
    res.status(200).json({
        class: instructorByClass
    });
});


/**
 * @route POST api/classes/ratings/:classID
 * @desc Get class Ratings
 * @access Private
 * Working
 */
router.post('/ratings/:classID', async function (req, res) {
    const {
        classID,
        page,
        limit
    } = req.params;

    const ratings = await ClassRating.find()
        .where('class').equals(mongoose.Types.ObjectId(classID))
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .populate({
            path: 'author',
            select: ['username', 'email'],
        })

    const count = ClassRating.countDocuments({
        $where: {
            class: {
                $eq: mongoose.Types.ObjectId(classID)
            }
        }
    });

    return res.status(200).json({
        ratings: ratings,
        totalPages: Math.ceil(count / limit),
        currentPage: page
    })
});



router.all('*', (req, res) => {
    res.status(400).send({
        error: 'undefined-route'
    });
});

module.exports = router;