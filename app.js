var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var menuRouter = require('./routes/menu');
var createMovieRouter = require('./routes/createMovie');
var searchMoviesRouter = require('./routes/searchMovies');
var movieRouter = require('./routes/movie');
var usersManagementRouter = require('./routes/usersManagement');
var userDataRouter = require('./routes/userData');



var app = express();
app.use(session({ secret: 'mysecret', cookie: { maxAge: 1000 * 60 * 60 * 24 }}))

// app.use(session({secret: 'mysecret' }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/', loginRouter);
app.use('/menu', menuRouter);
app.use('/createMovie', createMovieRouter);
app.use('/searchMovies', searchMoviesRouter);
app.use('/movie', movieRouter);
app.use('/usersManagement', usersManagementRouter);
app.use('/userData', userDataRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
