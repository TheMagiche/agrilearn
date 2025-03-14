const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const DB = require('./DB');

const app = express();

DB.client();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.disable('etag').disable('x-powered-by');

app.use(
    session({
        secret: 'agriskul',
        saveUninitialized: true,
        resave: true,
        maxAge: 24 * 60 * 60 * 1000, // 24
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/users', require('./routes/users'));
app.use('/api/classes', require('./routes/classes'));
app.use('/api/students', require('./routes/students'));
app.use('/api/instructors', require('./routes/instructors'));
app.use('/api/lessons', require('./routes/lessons'));

// Handle SPA after all other API routes has been added to express route table. If this comes before
// adding API routes, all requests will be forwarded to client side for routing and none of your routes will be called
app.use(express.static(__dirname + '/public/'));
app.get(/.*/, (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});
if (process.env.NODE_ENV === 'production') {
    // Statiic folder
    app.use(express.static(__dirname + '/public/')); // Set up public folder
    // Handle SPA
    app.get(/.*/, (req, res) => {
        res.sendFile(path.resolve(__dirname, 'public/index.html'));
    });
}
module.exports = app;
