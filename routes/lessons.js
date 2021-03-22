const express = require('express');
const router = express.Router();

const Lesson = require('../models/lesson');
const Class = require('../models/class');

/**
 * @route POST api/lessons/create/:classID
 * @desc Create lesson
 * @access Private
 * Working
 */
router.post('/create/:classID', async function (req, res, next) {
    console.log('Receiving lesson details...');

    try {
        const id = req.params.classID;
        // console.log(id);
        var {
            title,
            body,
            number,
            myclass
        } = req.body;

        var mylesson = await Lesson.create({
            title: title,
            body: body,
            number: number,
            class: myclass
        });
        await mylesson.save();

        var classByID = await Class.findById(id);
        // console.log(classByID);
        classByID.lessons.push(mylesson);

        await classByID.save();
        return res.status(200).json({
            msg: 'Sucessfully saved class',
        });
    } catch (err) {
        console.log(err);
    }
});

/**
 * @route POST api/lessons/update/:id
 * @desc Update lesson
 * @access Private
 * Working
 */
router.put('/update/:id', function (req, res, next) {
    Lesson.findByIdAndUpdate(req.params.id, req.body, function (err) {
        if (err) return next(err);
        return res.json({
            success: true,
            msg: 'Successfully updated lesson',
        });
    });
});

/**
 * @route POST api/lessons/delete/:id
 * @desc Delete lesson
 * @access Private
 * Working
 */
router.delete('/delete/:id', function (req, res, next) {
    Lesson.findOneAndDelete(req.params.id, req.body, async function (err, lesson) {
        if (err) return next(err);
        console.log("removing doc....")
        await Class.updateOne({
            _id: lesson.class
        }, {
            $pull: {
                lessons: {
                    $in: lesson._id
                }
            }
        }, );
        return res.json({
            success: true,
            msg: 'Successfully deleted lesson',
        });
    });
});

/**
 * @route POST api/lessons/details/:classID
 * @desc Get single lesson
 * @access Private
 * Working
 */
router.get('/details/:id', async function (req, res, next) {
    console.log('fetching lesson...');
    try {
        const id = req.params.id;
        const lessonByID = await Lesson.findById(id).populate({
            path: 'topic'
        });

        res.status(200).json({
            lesson: lessonByID
        });
    } catch (err) {
        res.status(400).json({
            err: err,
        });
    }
});

router.all('*', (req, res) => {
    res.status(400).send({
        error: 'undefined-route'
    });
});

module.exports = router;