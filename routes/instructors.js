const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Instructor = require('../models/instructor');

/**
 * @route POST api/instructors/classes/:id
 * @desc Get classes by instructor
 * @access Private
 * Not working
 */
router.get('/classes/:id', async function(req, res, next) {
    console.log('Getting instructors classes...');
    try {
        const { id } = req.params;
        const instructorByID = await User.findById(id);

        const instructorByUsername = await Instructor.findOne({
            username: instructorByID.username,
        }).populate({
            path: 'classes',
            populate: {
                path: 'instructor',
                select: ['email', 'username', 'id'],
            },
        });
        // console.log(instructorByUsername.classes);

        res.status(200).json({ classes: instructorByUsername.classes });
    } catch (err) {
        console.log(err);
    }
});

router.all('*', (req, res) => {
    res.status(400).send({ error: 'undefined-route' });
});

module.exports = router;
