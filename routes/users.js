const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const Student = require('../models/student');
const Instructor = require('../models/instructor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var async = require('async');
var crypto = require('crypto');
// Serialize user for the session to determine which data will be saved
passport.serializeUser(function (user, done) {
    done(null, user._id);
});

// Deserialize user
passport.deserializeUser(function (id, done) {
    User.getUserById(id, function (err, user) {
        done(err, user);
    });
});

const nodeMailer = require('nodemailer');
let transporter = nodeMailer.createTransport({
    pool: true,
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        // should be replaced with real sender's account
        user: 'agriskul@gmail.com',
        pass: 'agriskul2020!',
    },
});

/**
 * @route POST api/users/register
 * @desc REgisterthe User
 * @access Public
 * Working
 */

router.post('/register', async (req, res, next) => {
    console.log('Receiving details ..');

    async.waterfall([
        function (done) {
            crypto.randomBytes(20, (err, buf) => {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function (token) {
            var first_name = req.body.first_name;
            var last_name = req.body.last_name;
            var email = req.body.email;
            var username = req.body.username;
            var password = req.body.password;
            var type = req.body.type;
            var phoneNumber = req.body.phoneNumber;
            User.findOne({
                    $or: [{
                        username: username
                    }, {
                        email: email
                    }, {
                        phoneNumber: phoneNumber
                    }]
                })
                .then(user => {
                    //if user found.
                    if (user) {
                        if (user.username == username) {
                            console.log('Username already exists, username: ' + username);
                            return res.json({
                                msg: 'Username already exists',
                                success: false,
                                error: 'username',
                            });
                        }
                        if (user.email == email) {
                            console.log('EMAIL already exists, email: ' + email);
                            return res.json({
                                msg: 'Email already exists',
                                success: false,
                                error: 'email',
                            });
                        }
                        if (user.phoneNumber == phoneNumber) {
                            console.log('Phone number already exists, email: ' + phoneNumber);
                            return res.json({
                                msg: 'Phone number already exists',
                                success: false,
                                error: 'phone',
                            });
                        }
                    } else {
                        var newUser = new User({
                            email: email,
                            username: username,
                            password: password,
                            type: type,
                            phoneNumber: phoneNumber,
                        });

                        // Check type instructor or student, create users
                        if (type == 'student') {
                            console.log('Registering as student...');
                            var newStudent = new Student({
                                first_name: first_name,
                                last_name: last_name,
                                email: email,
                                username: username,
                                phoneNumber: phoneNumber,
                            });
                            console.log(newStudent);
                            // Save student in the user collection
                            User.saveStudent(newUser, newStudent, token, async function (err, user) {
                                console.log('Student created!');
                            });

                        } else {
                            console.log('Registering as instructor...');
                            var newInstructor = new Instructor({
                                first_name: first_name,
                                last_name: last_name,
                                email: email,
                                username: username,
                            });
                            console.log(newInstructor);
                            // Save instructor in the user collection
                            User.saveInstructor(newUser, newInstructor, token, async function (err, user) {
                                console.log('Instructor created!');
                            });

                        }

                        var Nodeemail = {
                            to: email,
                            from: 'agriskul@gmail.com',
                            subject: 'Signup Verification',
                            html: 'Signup Verification.\n\n' + 'Please click on the following link, or paste this into your browser to complete the process:\n\n' + '<a href="http://' + req.headers.host + '/verify/' + token + '">Verify your Account</a>\n\n' + 'If you did not request this, please ignore this email.\n',
                            // html: '<b> varify your email?</b>'
                        };

                        transporter.sendMail(Nodeemail, (error, info) => {
                            if (error) {
                                return console.log(error);
                            }
                            console.log('Message %s sent: %s', info.messageId, info.response);
                        });
                        return res.status(200).json({
                            username: username,
                            success: true,
                            msg: `Thank you for joining ${username}. Verification link sent to ${email}`,
                        });
                    }
                })
                .catch(err => {
                    res.status(500).send({
                        msg: 'Something went wrong',
                        success: false,
                    });
                    console.log(err);
                });
        },
    ]);
});

/**
 * @route GET api/users/verify
 * @desc verifying a user
 * @access Public
 * Working
 */
router.get('/verify/:token', (req, res) => {
    const token = req.params.token;
    if (token) {
        User.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpires: {
                $gt: Date.now()
            }
        }).then(user => {
            if (!user) {
                return res.status(401).json({
                    msg: 'Registration token is invalid or has expired.',
                    success: false,
                });
            } else {
                user.resetPasswordToken = undefined;
                user.resetPasswordExpires = undefined;
                user.verified = true;
                user.save();
                return res.status(200).json({
                    msg: 'Verified account proceed to Login',
                    success: true,
                });
            }
        });
    } else {
        User.findOne({
            verified: true
        }).then(user => {
            if (!user) {
                return res.status(401).json({
                    msg: 'Account not verified',
                    success: false,
                });
            } else {
                return res.status(200).json({
                    msg: 'Verified account proceed to Login',
                    success: true,
                });
            }
        });
    }
});

/**
 * @route POST api/users/login
 * @desc Signing in the User
 * @access Public
 * Working
 */

router.post('/login', async function (req, res) {
    try {
        await User.findOne({
            $or: [{
                username: req.body.detail
            }, {
                email: req.body.detail
            }],
        }).then(user => {
            if (!user) {
                return res.json({
                    msg: 'Account does not exist.',
                    success: false,
                });
            }
            if (user.verified == false) {
               crypto.randomBytes(20, (err, buf) => {
                    var token = buf.toString('hex');
                    var Nodeemail = {
                        to: user.email,
                        from: 'agriskul@gmail.com',
                        subject: 'Account Verification',
                        html: 'Account Verification.\n\n' + 'Please click on the following link, or paste this into your browser to complete the process:\n\n' + '<a href="http://' + req.headers.host + '/verify/' + token + '">Verify your Account</a>\n\n' + 'If you did not request this, please ignore this email.\n',
                        
                    };
                    
                    user.resetPasswordToken = token;
                    user.resetPasswordExpires = Date.now() + 3600000;
                    user.save();

                    transporter.sendMail(Nodeemail, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }
                        console.log('Message %s sent: %s', info.messageId, info.response);
                    });
                    return res.json({
                        msg: `Account not verified. Email has been sent to ${user.email} to verify your account.`,
                        success: false,
                    });
                    done(err, token);
                }); 
            }
            // If there is user we are now going to compare the password
            bcrypt.compare(req.body.password, user.password).then(isMatch => {
                if (isMatch) {
                    // User's password is correct and we need to send the JSON Token for that user
                    const payload = {
                        _id: user._id,
                        username: user.username,
                        type: user.type,
                        email: user.email,
                    };
                    jwt.sign(
                        payload,
                        'agrilearn', {
                            expiresIn: 604800,
                        },
                        (err, token) => {
                            res.status(200).json({
                                success: true,
                                token: `Bearer ${token}`,
                                user: {
                                    _id: user._id,
                                    username: user.username,
                                    type: user.type,
                                    email: user.email,
                                },
                                msg: 'Hurry! You are now logged in.',
                            });
                        }
                    );
                } else {
                    return res.json({
                        msg: 'Incorrect password.',
                        success: false,
                    });
                }
            });
        });
    } catch (error) {
        res.status(500).send({
            msg: 'Something went wrong',
            success: false,
        });
        console.log(err);
    }
});

passport.use(
    new LocalStrategy(function (username, password, done) {
        User.getUserByUsername(username, function (err, user) {
            if (err) {
                throw err;
            }
            if (!user) {
                return done(null, false, {
                    message: 'User' + ' ' + username + ' ' + 'is not registered.',
                });
            }
            User.comparePassword(password, user.password, function (err, isMatch) {
                if (err) {
                    return done(err);
                }
                if (isMatch) {
                    return done(null, user);
                } else {
                    console.log('wrong password');
                    return done(null, false, {
                        message: 'Invalid password.'
                    });
                }
            });
        });
    })
);

/**
 * @route POST api/users/logout
 * @desc Return the User's Data
 * @access Private
 * Working
 */
router.get('/logout', function (req, res) {
    req.logout();
});
/**
 * @route POST api/users/reset-password
 * @desc Reset users password
 * @access Private
 */

router.post('/reset-password', function (req, res) {
    console.log('getting details');
    async.waterfall([
        function (done) {
            crypto.randomBytes(20, (err, buf) => {
                var token = buf.toString('hex');
                console.log(token);
                done(err, token);
            });
        },
        function (token, done) {
            let email = req.body.email;
            console.log(email);
            User.findOne({
                email: email
            }).then(user => {
                if (user) {
                    console.log('adding new user details');
                    user.resetPasswordToken = token;
                    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                    user.save();
                    console.log('sending email...');

                    var email = {
                        to: user.email,
                        from: 'agriskul@gmail.com',
                        subject: 'Password Reset',
                        text: 'Learn today enjoy tommorow',
                        html: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                            '<a href="http://' +
                            req.headers.host +
                            '/reset/' +
                            token +
                            '">Reset Your Pasword</a>\n\n' +
                            'If you did not request this, please ignore this email and your password will remain unchanged.\n',
                        //html: '<b>Click aboue plain text button' // html body
                    };

                    transporter.sendMail(email, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }
                        console.log('Message %s sent: %s', info.messageId, info.response);
                    });
                    // res

                    return res.status(200).json({
                        msg: 'An e-mail has been sent to ' + user.email + ' with further instructions.',
                        success: true,
                    });
                } else {
                    console.log('not found');
                    return res.json({
                        msg: 'Account does not exist.',
                        success: false,
                    });
                }
            });
        },
    ]);
});
/**
 * @route Get api/users/reset
 * @desc Check reset
 * @access Private
 */
router.get('/reset/:token', (req, res) => {
    User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: {
            $gt: Date.now()
        }
    }, (err, user) => {
        if (!user) {
            return res.status(401).json({
                msg: 'Password reset token is invalid or has expired.',
                success: false,
            });
        } else {
            return res.status(200).json({
                msg: 'Proceed to change passowrd',
                success: true,
            });
        }
    });
});

/**
 * @route Get api/users/reset
 * @desc Complete reset
 * @access Private
 */
router.post('/reset/:token', (req, res) => {
    console.log('resetting password');

    async.waterfall([
        function () {
            let password = req.body.password;
            User.findOne({
                resetPasswordToken: req.params.token,
                resetPasswordExpires: {
                    $gt: Date.now()
                }
            }).then(user => {
                if (!user) {
                    return res.json({
                        msg: 'Password reset token is invalid or has expired.',
                        success: false,
                    });
                } else {
                    bcrypt.hash(password, 10, function (err, hash) {
                        if (err) {
                            throw err;
                        }
                        // Hash password
                        user.password = hash;
                        user.resetPasswordToken = undefined;
                        user.resetPasswordExpires = undefined;
                        user.save();
                    });

                    var email = {
                        to: user.email,
                        from: 'agriskul@gmail.com',
                        subject: 'Your password has been changed',
                        text: 'Hello,\n\n' + 'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n',
                        // html: '<b> varify your email?</b>'
                    };
                    transporter.sendMail(email, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }
                        console.log('Message %s sent: %s', info.messageId, info.response);
                    });
                    return res.status(200).json({
                        msg: 'Successfully changed password. Proceed to log in page',
                        success: true,
                    });
                }
            });
        },
        
    ]);
});
/**
 * @route POST api/users/message
 * @desc Sent email from front page
 * @access Public
 */
router.post('/message', async function (req, res) {
    var email = {
        to: 'wilsonmwangi692@gmail.com',
        from: 'agriskul@gmail.com',
        subject: 'Message from ' + req.body.name + ' Email: ' + req.body.email,
        text: 'Hello,\n\n' + 'This is a message from agriskul.co.ke from: ' + req.body.email + ' \n\n' + req.body.emailmessage + '\n\n' + 'Thank you',
        // html: '<b> varify your email?</b>'
    };
    transporter.sendMail(email, (error, info) => {
        if (error) {
            return res.json({
                msg: 'Email could not be sent. Sorry.',
                success: false,
            });
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
    return res.status(200).json({
        msg: 'Successfully sent email. Thank you for your feedback',
        success: true,
    });
});

/**
 * @route POST api/users/password/update
 * @desc Update user password
 * @access Private
 */
router.post('/password/update', async function(req, res){
    console.log('Changing password');
   
    try {
        let password = req.body.password;
        await User.findOne({
            username:req.body.username
        }).then(user => {
            
            bcrypt.hash(password, 10, function (err, hash) {
                if (err) {
                    throw err;
                }
                // Hash password
                user.password = hash;
                user.save();
            });

        });
        res.status(200).json({
            success: true,
            msg: "Successfully updated password"
        }); 
    }
    catch (error) {
        res.status(500).send({
            msg: 'Something went wrong',
            success: false,
        });
        console.log(err);
    }
});



router.all('*', (req, res) => {
    res.status(400).send({
        error: 'undefined-route'
    });
});

module.exports = router;