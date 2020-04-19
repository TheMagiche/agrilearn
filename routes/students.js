const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Student = require('../models/student');
const Class = require('../models/class');

/**
 * @route POST api/student/classes/:id
 * @desc Get students classes
 * @access Private
 * Untested
 */
router.get('/classes/:id', async function(req, res, next) {
    try {
        const { id } = req.params;
        const studentByID = await User.findById(id);

        const studentByUsername = await Student.findOne({
            username: studentByID.username,
        }).populate({
            path: 'classes',
        });

        // console.log(studentByUsername.classes);

        return res.status(200).json({ classes: studentByUsername.classes });
    } catch (err) {
        console.log(err);
    }
});

/**
 * @route POST api/student/class/:classID/register
 * @desc Register Student for a class
 * @access Private
 * Untested
 */
router.post('/:id/class/:classID/register', async function(req, res) {
    console.log('Registering classes...');
    try {
        const { id, classID } = req.params;

        const studentByID = await User.findById(id);
        const classByID = await Class.findById(classID);
        var query = { username: studentByID.username };
        let studentByUsername = await Student.findOneAndUpdate(
            query,
            // Append the values to an array - push classes inside the instructor collection
            { $addToSet: { classes: classByID } },
            // Creates a new document if no documents match the filter or update
            { safe: true, upsert: true },
            function(err) {
                if (err) {
                    return res.json({
                        msg: 'Already registered for class',
                        success: false,
                    });
                } else {
                    return res.status(200).json({
                        msg: 'Registered class successfully',
                        success: true,
                    });
                }
            }
        );

        // console.log(studentByUsername);
        // studentByUsername.classes.push(classByID);

        // studentByUsername.save();
    } catch (err) {
        console.log(err);
    }
});

router.all('*', (req, res) => {
    res.status(400).send({ error: 'undefined-route' });
});

module.exports = router;
