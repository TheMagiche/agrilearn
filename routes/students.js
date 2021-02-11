const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Student = require('../models/student');
const Class = require('../models/class');
const ClassRatings = require('../models/classRating');
const mongoose = require('mongoose');

var async = require('async');
var crypto = require('crypto');

// Test pesapal intergration
const {
    PesaPal
} = require('pesapal-node');
// const got = require('got');

/**
 * @route GET api/student/classes/:id
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
            select: ['title', 'imgUrl', 'rating'],
        });

        // console.log(studentByUsername.classes);

        return res.status(200).json({
            classes: studentByUsername.classes,

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
 * @route POST api/student/class/:classID/deregister
 * @desc Deregister Student form a class
 * @access Private
 * Working
 */
router.post('/:id/class/:classID/deregister', async function (req, res) {
    console.log('Deregistering class...');
    try {
        const {
            id,
            classID
        } = req.params;

        const studentByID = await User.findById(id);


        await Class.updateOne({
            _id: classID
        }, {
            $pull: {
                students: id
            }
        }, {
            safe: true,
            upsert: true
        }, ).exec();

        var query = {
            username: studentByID.username
        };

        await Student.findOneAndUpdate(
            query, {
                $pull: {
                    classes: classID
                }
            }, {
                safe: true,
                upsert: true
            },
        ).exec();

        res.status(200).json({
            msg: "Successfully Deregistered from class",
            success: true
        })

    } catch (err) {
        console.log(err);
    }
});


/**
 * @route POST api/student/:id/class/:classID/rate
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

        const rate = await ClassRatings.findOne({
            author: id,
            class: classID
        })

        if (rate) {
            await ClassRatings.updateOne({
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

        let newRate = await ClassRatings.create({
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
 * @route GET api/student/:id/class/:classID/rate
 * @desc Check registration status of student in a class
 * @access Private
 * Working
 */
router.get('/:id/class/:classID/checkReg', async function (req, res) {
    const {
        id,
        classID
    } = req.params;

    let classByID = await Class.findById(classID);

    let studentByID = await User.findById(id);

    let studentByUsername = await Student.findOne({
        username: studentByID.username
    });


    var isInArray = classByID.students.some(function (student) {
        return student.equals(id);
    });

    if (isInArray) {

        return res.status(200).json({
            registered: true,
            studentStatus: studentByUsername.status
        });
    } else {

        return res.status(200).json({
            registered: false,
            studentStatus: studentByUsername.status

        });
    }

});

/**
 * @route GET api/students/:id/profile
 * @desc Return the User's Data
 * @access Private
 */
router.get('/:id/profile', async function (req, res) {
    console.log('fetching student details...')
    const studID = req.params.id;
    const studentByID = await User.findById(studID);

    const studentByUsername = await Student.findOne({
        username: studentByID.username
    });

    return res.status(200).json({
        username: studentByID.username,
        email: studentByID.email,
        type: studentByID.type,
        verified: studentByID.verified,
        phoneNumber: studentByID.phoneNumber,
        status: studentByUsername.status,
        first_name: studentByUsername.first_name,
        last_name: studentByUsername.last_name,
        classes: studentByUsername.classes
    });

});
/**
 * @route POST api/students/:id/profile
 * @desc Return the User's Data
 * @access Private
 */
router.post('/profile/update', async function (req, res) {
    const username = req.body.username;
    const studentByUsername = await Student.findOneAndUpdate({
        username: username
    }, {
        first_name: req.body.first_name,
        last_name: req.body.last_name
    }, {
        new: true
    });

    return res.status(200).json({
        first_name: studentByUsername.first_name,
        last_name: studentByUsername.last_name,
        success: true,
        msg: "Updated Details Successfully"
    })
});


/**
 * @route GET api/students/:id/premium
 * @desc Check user's premuim subscription
 * @access Private
 */
router.get('/:id/premium', async function (req, res) {
    const userID = req.params.id;
    await User.findOne({
        _id: userID
    }).then(user => {
        if ( new Date(user.premiumExpires) < Date.now()) {
            Student.findOne({
                username: user.username
            }).then(stud => {
                stud.premiumExpires = null;
                stud.premiumToken = null;
                student.status = false;
            }).catch(err => {
                console.log(err);
            });
            res.status(200).json({
                msg: "Your premium subscription has ended",
                success: true
            });
        }
    }).catch(err => {
        console.log(err);
    });
});

/**
 * @route POST api/students/:id/premium
 * @desc post user's premuim subscription
 * @access Private
 */
router.post('/:id/premium', async function (req, res) {
    console.log('Generating pesapal url..');
    const userID = req.params.id;
    async.waterfall([
        function (done) {
            crypto.randomBytes(20, (err, buf) => {
                var token = buf.toString('hex');
                // console.log(token);
                done(err, token);
            });
        },
        async function (token) {
            User.findOne({
                _id: userID
            }).then(user => {
                if (user) {
                    Student.findOne({
                        username: user.username
                    }).then(async stud => {

                        var pesapal = new PesaPal({
                            // sitename: `http://localhost:8080/premium/${userID}/`,
                            sitename: `http://${req.headers.host}/premium/${userID}/`,
                            consumer_key: 'Q+cv8l1N3mbI2sEPLlMG196etR/lC2gE',
                            consumer_secret: 'kqhRW461nvtan1LPYyy999SWnnA=',
                            debug: false // false in production!
                        });

                        var customer = pesapal.customerDetail({
                            firstname: stud.first_name,
                            lastname: stud.last_name,
                            email: user.email,
                            phonenumber: user.phoneNumber.substr(1),
                        });
                        // console.log(customer);
                        // Create Order Detail <as many as required>
                        var order = pesapal.orderDetail({
                            itemID: 'agriskulpremiummbership',
                            particulars: '30 Day subscription',
                            quantity: 1,
                            unitCost: 100.0,
                            details: 'Get a 30 day subscription for pro membership in agriskul.co.ke'
                        });
                        // console.log(order);

                        // Place orders in an array
                        var orders = [];
                        orders.push(order);

                        // make a call to the PESAPALDIRECTORDER
                        var postOrderUrl = await pesapal.sendPostPesaPalDirectOrder({
                            reference: token,
                            customerDetails: customer,
                            description: '30 day pro account',
                            orders: orders
                        }); // Returns a url to redirect to pesapal payment page
                        // console.log(postOrderUrl);

                        res.status(200).json({
                            msg: "Complete the transaction and check the payment status",
                            success: true,
                            urlRedirect: postOrderUrl
                        });
                    }).catch(err => {
                        console.log(err);
                    });

                }
            }).catch(err => {
                console.log(err);
            });



        }
    ]);

});

// /**
//  * @route POST api/students/:id/checkpremium
//  * @desc confirm premium status of payment from pesapal
//  * @access Private
//  */
// router.post('/:id/checkpremium', async function(req, res){
//     const {pesapal_merchant_reference, pesapal_transaction_tracking_id } = req.body;
//     const userID = req.params.id;
//     var pesapal = new PesaPal({
//         sitename: `http://localhost:8080/premium/${userID}/`,
//         consumer_key: 'RV1wEGL3aYXhmFEdpd6+72UEbRpVSfZO',
//         consumer_secret: 'peQvF//QOvItVPl3oPDFYZCD5Ho=',
//         debug: true // false in production!
//     });
//     let pesapalQueryUrl = await pesapal.getQueryPaymentDetails({
//         merchant_ref: pesapal_merchant_reference,
//         merchant_tracking_id: pesapal_transaction_tracking_id
//     });
//     // console.log(pesapalQueryUrl);
//     (async () => {
//         try {
//             const response = await got(pesapalQueryUrl);
//             console.log(response.body);
//             //=> '<!doctype html> ...'
//         } catch (error) {
//             console.log(error.response.body);
//             //=> 'Internal server error ...'
//         }
//     })();
// });

/**
 * @route POST api/students/:id/checkpremium
 * @desc confirm premium status of payment from pesapal
 * @access Private
 */
router.post('/:id/confirmpremium', async function (req, res) {
    console.log('Generating pesapal url..');
    const userID = req.params.id;
    async.waterfall([
        function (done) {
            crypto.randomBytes(20, (err, buf) => {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function (token) {
            User.findOne({
                _id: userID
            }).then(user => {
                if (user) {
                    Student.findOne({
                        username: user.username
                    }).then(stud => {
                        stud.premiumExpires = Date.now() + 60 * 60 * 24 * 1000 * 30; //30days
                        stud.premiumToken = token;
                        stud.status = true;
                        stud.save();
                    }).catch(err => {
                        console.log(err);
                    });
                }
            }).catch(err => {
                console.log(err);
            });
        }
    ]);

    res.status(200).json({
        msg: "You've received premium status for 30 days",
        success: true
    });
});


router.all('*', (req, res) => {
    res.status(400).send({
        error: 'undefined-route'
    });
});

module.exports = router;