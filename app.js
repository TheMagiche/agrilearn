const express = require("express");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const expressValidator = require("express-validator");
const session = require("express-session");
const passport = require("passport");
const DB = require("./DB");
// const cookieSession = require("cookie-session");
const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:8080" }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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

// app.use(
//   cookieSession({
//     name: "agrilearn",
//     keys: ["vueauthrandomkey"],
//     maxAge: 24 * 60 * 60 * 1000 // 24 hours
//   })
// );

DB.client();
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Check on dev mode don't uncomment
app.use(express.static(__dirname + "/public/"));
// Set up public folder

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

// var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var classesRouter = require("./routes/classes");
var studentsRouter = require("./routes/students");
var instructorsRouter = require("./routes/instructors");
var lessonsRouter = require("./routes/lessons");

// app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/classes", classesRouter);
app.use("/api/students", studentsRouter);
app.use("/api/instructors", instructorsRouter);
app.use("/api/lessons", lessonsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Global user object to use in any route
app.get("*", function(req, res, next) {
  // Add user to res.locals
  res.locals.user = req.user || null;
  if (req.user) {
    res.locals.type = req.user.type;
  }
  next();
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render("error");
});

module.exports = app;
