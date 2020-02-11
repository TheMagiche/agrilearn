var express = require("express");
var router = express.Router();
var Class = require("../models/class");
var Instructor = require("../models/instructor");
var User = require("../models/user");

/**
 * @route POST api/classes/
 * @desc Get all classes
 * @access Private
 * Not working
 */
router.get("/", function(req, res, next) {
  try {
    console.log("classes...");
    Class.getClasses(function(err, classes) {
      if (err) {
        throw err;
      }
      console.log(classes);
      res.status(200).json({ title: "All Classes", classes: classes });
    }, 4);
  } catch (err) {
    console.log(err);
  }
});

/**
 * @route POST api/classes/create/:id
 * @desc Create class
 * @access Private
 * Working
 */
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

/**
 * @route POST api/classes/:id/update
 * @desc Update class
 * @access Private
 * Untested
 */
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

/**
 * @route POST api/classes/:id/delete
 * @desc Delete class
 * @access Private
 * Untested
 */
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

/**
 * @route POST api/classes/details/:id/
 * @desc get single class
 * @access Private
 * Not Working
 */
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

/**
 * @route POST api/classes/instructors/:id
 * @desc Get instructors classes
 * @access Private
 * Not working
 */
router.post("/instructor/:id", async function(req, res, next) {
  const { id } = req.params;
  const instructorByClass = await (await Class.findById(id)).populate(
    "instructor"
  );
  res.status(200).json({ class: instructorByClass });
});

module.exports = router;
