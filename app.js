const express = require("express");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const session = require("express-session");
const passport = require("passport");
const DB = require("./DB");

const app = express();

DB.client();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.disable("etag").disable("x-powered-by");

app.use(
  session({
    secret: "agrilearn",
    saveUninitialized: true,
    resave: true,
    maxAge: 24 * 60 * 60 * 1000 // 24
  })
);

app.use(
  expressValidator({
    errorFormatter: function(param, msg, value) {
      var namespace = param.split("."),
        root = namespace.shift(),
        formParam = root;

      while (namespace.length) {
        formParam += "[" + namespace.shift() + "]";
      }
      return {
        param: formParam,
        msg: msg,
        value: value
      };
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Handle SPA
app.get(/.*/, (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

if (process.env.NODE_ENV === "production") {
  // Statiic folder
  app.use(express.static(__dirname + "/public/")); // Set up public folder
  // Handle SPA
  app.get(/.*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, "public/index.html"));
  });
}

var usersRouter = require("./routes/users");
var classesRouter = require("./routes/classes");
var studentsRouter = require("./routes/students");
var instructorsRouter = require("./routes/instructors");
var lessonsRouter = require("./routes/lessons");

app.use("/api/users", usersRouter);
app.use("/api/classes", classesRouter);
app.use("/api/students", studentsRouter);
app.use("/api/instructors", instructorsRouter);
app.use("/api/lessons", lessonsRouter);

module.exports = app;
