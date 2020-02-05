var express = require("express");
var router = express.Router();

var User = require("../models/user");
var Student = require("../models/student");
var Class = require("../models/class");

// // Student classes
// router.get("/classes", isLoggedIn, function(req, res, next) {
//   Student.getStudentByUsername(req.user.username, function(err, student) {
//     if (err) {
//       throw err;
//     }
//     res.json({ student: student });
//   });
// });
// student classes
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
router.post("/:id/class/:classID/register", isLoggedIn, async function(
  req,
  res
) {
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
// router.post("/classes/register", isLoggedIn, function(req, res) {
//   var info = [];
//   info["student_username"] = req.user.username;
//   info["class_id"] = req.body.class_id;
//   info["class_title"] = req.body.class_title;

//   Student.register(info, function(err, student) {
//     if (err) {
//       throw err;
//     }
//     console.log(student);
//   });
//   req.flash("success_msg", "You are now enrroled in this class.");
//   // res.redirect("/students/classes");
// });

// Access Control
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash("You must login to access this page.");
    // res.redirect("/users/signin");
  }
}
module.exports = router;
