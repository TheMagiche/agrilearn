var express = require("express");
var router = express.Router();
var Class = require("../models/class");

var Instructor = require("../models/instructor");
var User = require("../models/user");

// All courses
router.get("/", function(req, res, next) {
  console.log("classes...");
  Class.getClasses(function(err, classes) {
    if (err) {
      throw err;
    }
    console.log(classes);
    res.status(200).json({ title: "All Classes", classes: classes });
  }, 4);
});

//create course
router.post("/create/:id", async function(req, res, next) {
  console.log("Receiving class details...");

  try {
    const id = req.params.id;
    // console.log(id);
    const { title, description, imageUrl } = req.body;

    const myclass = await Class.create({
      title: title,
      description: description,
      imgUrl: imageUrl,
      instructor: id
    });
    await myclass.save();

    const instructorByID = await User.findById(id);
    // console.log(instructorByID);
    // console.log(instructorByID.username);
    const instructorByUsername = await Instructor.findOne({
      username: instructorByID.username
    });
    // console.log(instructorByUsername);
    instructorByUsername.classes.push(myclass);

    await instructorByUsername.save();
    return res.status(200).json(instructorByID);
  } catch (err) {
    console.log(err);
  }
});
//update course
router.put("/:id/update", function(req, res, next) {
  Class.findByIdAndUpdate(req.params.id, req.body, function(err, myclass) {
    if (err) return next(err);
    return res.json({
      success: true,
      msg: "Successfully updated blog",
      class: myclass
    });
  });
});
//delete course
router.delete("/:id/delete", function(req, res, next) {
  Class.findByIdAndRemove(req.params.id, req.body, function(err, myclass) {
    if (err) return next(err);
    return res.json({
      success: true,
      msg: "Successfully deleted blog",
      class: myclass
    });
  });
});

// Single course
router.get("/details/:id", async function(req, res) {
  console.log("fetching class...");
  try {
    const id = req.params.id;
    const classByID = await Class.findById(id)
      .populate({
        path: "instructor",
        select: ["email", "username", "id"]
      })
      .populate({
        path: "lessons"
      });
    // console.log(classByID);

    res.status(200).json({ class: classByID });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err
    });
  }
});

//get class by instructor
router.post("/instructor/:id", async function(req, res, next) {
  const { id } = req.params;
  const instructorByClass = await (await Class.findById(id)).populate(
    "instructor"
  );
  res.status(200).json({ class: instructorByClass });
});

// // Lessons
// router.get("/:id/lessons", isLoggedIn, function(req, res, next) {
//   var user = req.user;
//   var id = req.params.id;
//   if (user.type == "student") {
//     Class.getClassById(id, function(err, classname) {
//       if (err) {
//         throw err;
//       }
//       res.json({ class: classname });
//     });
//   } else {
//     Class.getClassById(id, function(err, classname) {
//       if (err) {
//         throw err;
//       }
//       res.json({ class: classname });
//     });
//   }
// });

// router.get("/:id/lessons/:lesson_id", isLoggedIn, function(req, res, next) {
//   var id = req.params.id;
//   Class.getClassById(id, function(err, classname) {
//     var lesson;
//     if (err) {
//       throw err;
//     }
//     // Get specific lesson that matches the id
//     for (var i = 0; i < classname.lessons.length; i++) {
//       if (classname.lessons[i].lesson_number == req.params.lesson_id) {
//         lesson = classname.lessons[i];
//       }
//     }
//     res.json({ class: classname, lesson: lesson });
//   });
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
