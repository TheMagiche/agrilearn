const express = require("express");
const router = express.Router();

const Lesson = require("../models/lesson");
const Class = require("../models/class");

//create lesson
router.post("/create/:classID", async function(req, res, next) {
  console.log("Receiving lesson details...");

  try {
    const id = req.params.classID;
    // console.log(id);
    var { title, body, number } = req.body;

    var mylesson = await Lesson.create({
      title: title,
      body: body,
      number: number
    });
    await mylesson.save();

    var classByID = await Class.findById(id);
    console.log(classByID);
    classByID.lessons.push(mylesson);

    await classByID.save();
    return res.status(200).json({
      msg: "Sucessfully saved class"
    });
  } catch (err) {
    console.log(err);
  }
});

//update lesson
router.put("/update/:id", function(req, res, next) {
  Class.findByIdAndUpdate(req.params.id, req.body, function(err, myclass) {
    if (err) return next(err);
    return res.json({
      success: true,
      msg: "Successfully updated blog",
      class: myclass
    });
  });
});
//delete lesson
router.delete("/delete/:id", function(req, res, next) {
  Class.findByIdAndRemove(req.params.id, req.body, function(err, myclass) {
    if (err) return next(err);
    return res.json({
      success: true,
      msg: "Successfully deleted blog",
      class: myclass
    });
  });
});

// Single lesson
router.get("/details/:id", async function(req, res, next) {
  console.log("fetching lesson...");
  try {
    const id = req.params.id;
    const lessonByID = await Lesson.findById(id);

    res.status(200).json({ lesson: lessonByID });
  } catch (err) {
    res.status(400).json({
      err: err
    });
  }
});

module.exports = router;
