var express = require("express");
var router = express.Router();

var User = require("../models/user");
var Instructor = require("../models/instructor");
var Class = require("../models/class");

// Instructor classes
router.get("/classes", isLoggedIn, function(req, res, next) {
  var user = req.user;
  if (user.type == "instructor") {
    Instructor.getInstructorByUsername(req.user.username, function(
      err,
      instructor
    ) {
      if (err) {
        throw err;
      }
      res.json({ instructor: instructor });
    });
  } else {
    req.flash(
      "error_msg",
      "You must login as an instructor to access this page!"
    );
    // res.redirect("back");
  }
});
//instructor classes
router.get("/classes/:id", async function(req, res, next) {
  try {
    const { id } = req.params;
    const instructorByID = await User.findById(id);

    const instructorByUsername = await Instructor.findOne({
      username: instructorByID.username
    }).populate({
      path: "classes",
      populate: {
        path: "instructor",
        select: ["email", "username", "id"]
      }
    });
    // console.log(instructorByUsername.classes);

    res.status(200).json({ classes: instructorByUsername.classes });
  } catch (err) {
    console.log(err);
  }
});

router.post("/classes/register", isLoggedIn, function(req, res) {
  var info = [];
  info["instructor_username"] = req.user.username;
  info["class_id"] = req.body.class_id;
  info["class_title"] = req.body.class_title;

  Instructor.register(info, function(err, instructor) {
    if (err) {
      throw err;
    }
  });
  req.flash(
    "success_msg",
    "You are now registered as a teacher of this class."
  );
  res.redirect("/instructors/classes");
});

// // Lesson form
// router.get("/classes/:id/lessons/new", isLoggedIn, function(req, res, next) {
//   var user = req.user;
//   if (user.type == "instructor") {
//     res.json({
//       title: "New Lesson",
//       class_id: req.params.id
//     });
//   } else {
//     req.flash(
//       "error_msg",
//       "You must login as an instructor to access this page!"
//     );
//     // res.redirect("back");
//   }
// });
// // Create new lesson
// router.post("/classes/:id/lessons/new", isLoggedIn, function(req, res, next) {
//   var user = req.user;
//   if (user.type == "instructor") {
//     var info = [];
//     info["class_id"] = req.params.id;
//     info["lesson_number"] = req.body.lesson_number;
//     info["lesson_title"] = req.body.lesson_title;
//     info["lesson_body"] = req.body.lesson_body;

//     Class.addLesson(info, function(err, lesson) {
//       if (err) {
//         throw err;
//       }
//     });
//     req.flash("success_msg", "Lesson added.");
//     // res.redirect("/classes/" + class_id + "/lessons");
//   } else {
//     req.flash(
//       "error_msg",
//       "You must login as an instructor to access this page!"
//     );
//     // res.redirect("back");
//   }
// });
// // Edit lesson form
// router.get("/classes/:id/lesson/:lesson_number/edit", isLoggedIn, function(
//   req,
//   res,
//   next
// ) {
//   var user = req.user;
//   if (user.type == "instructor") {
//     var lesson_number = req.params.lesson_number;
//     var id = req.params.id;

//     Class.getClassById(id, function(err, classname) {
//       var lesson;
//       if (err) {
//         throw err;
//       }
//       // Get specific lesson that matches the id
//       for (var i = 0; i < classname.lessons.length; i++) {
//         if (classname.lessons[i].lesson_number == lesson_number) {
//           lesson = classname.lessons[i];
//         }
//       }
//       res.json({
//         title: "Edit Lesson",
//         lesson_number: lesson.lesson_number,
//         lesson_title: lesson.lesson_title,
//         lesson_body: lesson.lesson_body,
//         class_id: id
//       });
//     });
//   } else {
//     req.flash(
//       "error_msg",
//       "You must login as an instructor to access this page!"
//     );
//     // res.redirect("back");
//   }
// });

// router.post("/classes/:id/lesson/:lesson_number/edit", isLoggedIn, function(
//   req,
//   res,
//   next
// ) {
//   var user = req.user;
//   if (user.type == "instructor") {
//     var lesson_number = req.params.lesson_number;
//     var id = req.params.id;
//     var info = [];

//     Instructor.getInstructorByUsername(req.user.username, function(
//       err,
//       instructor
//     ) {
//       if (err) {
//         throw err;
//       }

//       info["class_id"] = req.params.id;
//       info["lesson_number"] = req.params.lesson_number;
//       info["lesson_title"] = req.body.update_lesson_title;
//       info["lesson_body"] = req.body.update_lesson_body;

//       Class.updateLesson(info, function(err, lesson) {
//         if (err) {
//           throw err;
//         }
//         req.flash("success_msg", "Lesson updated.");
//         // res.redirect("/classes/" + class_id + "/lessons");
//       });
//     });
//   } else {
//     req.flash(
//       "error_msg",
//       "You must login as an instructor to access this page!"
//     );
//     // res.redirect("back");
//   }
// });

// // Delete lesson
// router.get("/classes/:id/lesson/:lesson_number/delete", isLoggedIn, function(
//   req,
//   res,
//   next
// ) {
//   var user = req.user;
//   if (user.type == "instructor") {
//     var lesson_number = req.params.lesson_number;
//     var info = [];

//     info["class_id"] = req.params.id;
//     info["lesson_number"] = req.params.lesson_number;

//     Class.deleteLesson(info, function(err) {
//       if (err) {
//         throw err;
//       }
//       req.flash("success_msg", "Lesson deleted.");
//       // res.redirect("back");
//     });
//   } else {
//     req.flash(
//       "error_msg",
//       "You must login as an instructor to access this page!"
//     );
//     // res.redirect("back");
//   }
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
