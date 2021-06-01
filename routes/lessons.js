const express = require('express');
const router = express.Router();

const Lesson = require('../models/lesson');
const Class = require('../models/class');
const { Mongoose } = require('mongoose');

/**
 * @route POST api/lessons/create/:classID
 * @desc Create lesson
 * @access Private
 * Working
 */
router.post('/create/:classID', async function(req, res, next) {
    console.log('Receiving lesson details...');

    try {
        const id = req.params.classID;
        const { title, body, number, myclass } = req.body;

        const mylesson = await Lesson.create({
            title: title,
            body: body,
            number: number,
            class: myclass,
        });
        await mylesson.save();

        const classByID = await Class.findById(id);
        // console.log(classByID);
        classByID.lessons.push(mylesson);

        await classByID.save();
        return res.status(200).json({
            success: true,
            msg: 'Sucessfully created lesson',
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            msg: 'Error creating class',
        });
    }
});

/**
 * @route POST api/lessons/update/:id
 * @desc Update lesson
 * @access Private
 * Working
 */
router.put('/update/:id', function(req, res, next) {
    try {
        Lesson.findByIdAndUpdate(req.params.id, req.body, function(err) {
            if (err) return next(err);
        });
        return res.status(200).json({
            success: true,
            msg: 'Successfully updated lesson',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            msg: 'Error updating class',
        });
    }
});

/**
 * @route POST api/lessons/delete/:id
 * @desc Delete lesson
 * @access Private
 * Working
 */
router.post('/delete/:id', async function(req, res, next) {
    try {
        const lessonByID = Lesson.findById(req.params.id);
        await Class.updateOne(
            {
                _id: lessonByID.class,
            },
            {
                $pull: {
                    lessons: mongoose.Types.ObjectId(req.params.id),
                },
            }
        );
        Lesson.findById(req.params.id, function(err, mylesson) {
            if (err) return next(err);
            mylesson.remove();
            return res.status(200).json({
                success: true,
                msg: 'Successfully deleted lesson',
            });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            msg: 'Error deleting lesson',
        });
    }
});

/**
 * @route POST api/lessons/details/:classID
 * @desc Get single lesson
 * @access Private
 * Working
 */
router.get('/details/:id', async function(req, res, next) {
    console.log('fetching lesson...');
    try {
        const id = req.params.id;
        const lessonByID = await Lesson.findById(id);

        return res.status(200).json({
            lesson: lessonByID,
            success: true,
            msg: 'Details received',
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            msg: "Couldn't get lesson",
        });
    }
});

router.all('*', (req, res) => {
    res.status(400).send({
        error: 'undefined-route',
    });
});

module.exports = router;
