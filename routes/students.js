const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Student = require("../models/student");
const Class = require("../models/class");

/**
 * @route POST api/student/classes/:id
 * @desc Get students classes
 * @access Private
 * Untested
 */
router.get("/classes/:id", async function(req, res, next) {
  try {
    const { id } = req.params;
    const studentByID = await User.findById(id);

    const studentByUsername = await Student.findOne({
      username: studentByID.username
    }).populate({
      path: "classes"
    });
    // console.log(studentByUsername.classes);

    res.status(200).json({ classes: studentByUsername.classes });
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
router.post("/:id/class/:classID/register", async function(req, res) {
  console.log("Registering classes...");
  try {
    const { id, classID } = req.params;

    const studentByID = await User.findById(id);
    const studentByUsername = await Student.findOne({
      username: studentByID.username
    });
    const classByID = await Class.findById(classID);

    console.log(studentByID);

    studentByUsername.classes.push(classByID);

    studentByUsername.save();

    res.status(200).json({
      msg: "Succesfully registered class"
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
