const mongoose = require('mongoose');
const Lesson = mongoose.model('Lesson');
const Topic = mongoose.model('Topic');
const express = require('express');
const router = express.Router();

/**
 * @route POST api/topics/create/:lessonID
 * @desc Create a topic 
 * @access Private
 * 
 */

 router.post('/create/:lessonID', async function (req, res, next) {
    console.log('Receiving topic details...');

    try {
        const lessonID = req.params.lessonID;
        var {
            title,
            content,
            userID
        } = req.body;

        var newTopic = await Topic.create({
            title,
            content,
            lesson: lessonID,
            user: userID    
        });
        await newTopic.save();

        var lessonByID = await Lesson.findById(lessonID);
        lessonByID .replies.push(newTopic);
        await lessonByID.save();

        return res.status(200).json({
            msg: 'Sucessfully saved topic',
        });
    } catch (err) {
        console.log(err);
    }
});


/**
 * @route POST api/replies/update/:topicID
 * @desc Update topic
 * @access Private
 * Working
 */
 router.put('/update/:topicID', function (req, res, next) {
    Reply.findByIdAndUpdate(req.params.topicID, req.body, function (err) {
        if (err) return next(err);
        return res.json({
            success: true,
            msg: 'Successfully updated topic',
        });
    });
});

/**
 * @route POST api/replies/delete/:topicID
 * @desc Delete topic
 * @access Private
 * Working
 */
 router.delete('/delete/:topicID', function (req, res, next) {
    Topic.findOneAndDelete(req.params.topicID, req.body, async function (err, topic) {
        if (err) return next(err);
        console.log("removing doc....")
        await Lesson.updateOne({
            _id: topic.lesson
        }, {
            $pull: {
                replies: {
                    $in: topic._id
                }
            }
        }, );
        return res.json({
            success: true,
            msg: 'Successfully deleted replies',
        });
    });
});


module.exports = router;