const express = require("express");
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const Student = require("../models/student");
const Instructor = require("../models/instructor");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Serialize user for the session to determine which data will be saved
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

// Deserialize user
passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

/**
 * @route POST api/users/register
 * @desc REgisterthe User
 * @access Public
 * Working
 */

router.post("/register", async (req, res) => {
  try {
    console.log("Receiving details ..");
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;
    var type = req.body.type;

    // Validation with Express Validator
    req.checkBody("first_name", "First name required.").notEmpty();
    req.checkBody("last_name", "Last name required.").notEmpty();
    req.checkBody("email", "Email required.").notEmpty();
    req.checkBody("email", "It must be a valid email address.").isEmail();
    req.checkBody("username", "Username required.").notEmpty();
    req.checkBody("password", "Password field is required.").notEmpty();
    req
      .checkBody("password2", "Passwords do not match.")
      .equals(req.body.password);

    errors = req.validationErrors();
    User.findOne({
      username: username
    }).then(user => {
      if (user) {
        return res.json({
          msg: "Username is already taken."
        });
      }
    });
    User.findOne({
      email: email
    }).then(user => {
      if (user) {
        return res.json({
          msg: "Email is already registred. Did you forgot your password."
        });
      }
    });
    if (errors) {
      res.json({
        errors: errors
      });
    } else {
      // Create a user
      var newUser = new User({
        email: email,
        username: username,
        password: password,
        type: type
      });

      // Check type instructor or student, create users
      if (type == "student") {
        console.log("Registering as student...");
        var newStudent = new Student({
          first_name: first_name,
          last_name: last_name,
          email: email,
          username: username
        });
        console.log(newUser);
        // Save student in the user collection
        User.saveStudent(newUser, newStudent, async function(err, user) {
          console.log("Student created!");
        });
      } else {
        console.log("Registering as instructor...");
        var newInstructor = new Instructor({
          first_name: first_name,
          last_name: last_name,
          email: email,
          username: username
        });

        // Save instructor in the user collection
        User.saveInstructor(newUser, newInstructor, async function(err, user) {
          console.log("Instructor created!");
        });
      }
      res.json({
        username: username,
        success: true,
        msg: "Hurry! User is now registered."
      });
    }
  } catch (err) {
    console.log(err);
  }
});

// Sign in

/**
 * @route POST api/users/login
 * @desc Signing in the User
 * @access Public
 * Working
 */

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login"
  }),
  function(req, res) {
    User.findOne({
      username: req.body.username
    }).then(user => {
      if (!user) {
        return res.status(404).json({
          msg: "Username is not found.",
          success: false
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
            email: user.email
          };
          jwt.sign(
            payload,
            "agrilearn",
            {
              expiresIn: 604800
            },
            (err, token) => {
              res.status(200).json({
                success: true,
                token: `Bearer ${token}`,
                user: {
                  _id: user._id,
                  username: user.username,
                  type: user.type,
                  email: user.email
                },
                msg: "Hurry! You are now logged in."
              });
            }
          );
        } else {
          return res.status(404).json({
            msg: "Incorrect password.",
            success: false
          });
        }
      });
    });
  }
);

passport.use(
  new LocalStrategy(function(username, password, done) {
    User.getUserByUsername(username, function(err, user) {
      if (err) {
        throw err;
      }
      if (!user) {
        return done(null, false, {
          message: "User" + " " + username + " " + "is not registered."
        });
      }
      User.comparePassword(password, user.password, function(err, isMatch) {
        if (err) {
          return done(err);
        }
        if (isMatch) {
          return done(null, user);
        } else {
          console.log("wrong password");
          return done(null, false, { message: "Invalid password." });
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
router.get("/logout", function(req, res) {
  req.logout();
});

/**
 * @route POST api/users/profile
 * @desc Return the User's Data
 * @access Private
 */
router.get(
  "/profile",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    return res.json({
      user: req.user
    });
  }
);
module.exports = router;
