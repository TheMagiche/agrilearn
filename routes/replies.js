const mongoose = require('mongoose');
const Reply = mongoose.model('Reply');
const Topic = mongoose.model('Topic');
const express = require('express');
const router = express.Router();



/**
 * @route POST api/replies/create/:topicID
 * @desc Create a reply
 * @access Private
 * 
 */

router.post('/create/:topicID', async function (req, res, next) {
    console.log('Receiving reply details...');

    try {
        const topicID = req.params.topicID;
        var {
            content,
            userID
        } = req.body;

        var newReply = await Reply.create({
            content,
            user: userID    
        });
        await newReply.save();

        var topicByID = await Topic.findById(topicID);
        topicByID.replies.push(newReply);
        await topicByID.save();

        return res.status(200).json({
            msg: 'Sucessfully saved reply',
        });
    } catch (err) {
        console.log(err);
    }
});


/**
 * @route POST api/replies/update/:replyID
 * @desc Update reply
 * @access Private
 * Working
 */
 router.put('/update/:replyID', function (req, res, next) {
    Reply.findByIdAndUpdate(req.params.replyID, req.body, function (err) {
        if (err) return next(err);
        return res.json({
            success: true,
            msg: 'Successfully updated reply',
        });
    });
});

/**
 * @route POST api/replies/delete/:replyID
 * @desc Delete reply
 * @access Private
 * Working
 */
 router.delete('/delete/:replyID', function (req, res, next) {
    Reply.findOneAndDelete(req.params.replyID, req.body, async function (err, reply) {
        if (err) return next(err);
        console.log("removing doc....")
        await Topic.updateOne({
            _id: reply.topic
        }, {
            $pull: {
                replies: {
                    $in: reply._id
                }
            }
        }, );
        return res.json({
            success: true,
            msg: 'Successfully deleted replies',
        });
    });
});


module.export = router;