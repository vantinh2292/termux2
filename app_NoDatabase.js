var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require('cors')

// var indexRouter = require('./routes/index');
// var pointRouter = require('./routes/routes_Point');
// var pointPickPlaceRouter = require('./routes/routes_Point_PickPlace');
// var imageRouter = require('./routes/routes_Image');
// var labelRouter = require('./routes/routes_Label');
// var lineRouter = require('./routes/routes_Line');
// var wordDisplayRouter = require('./routes/routes_WordDisplay');
// var wordAdjustRouter = require('./routes/routes_WordAdjust');
// var dwordDisplayRouter = require('./routes/routes_DWordDisplay');
// var dwordAdjustRouter = require('./routes/routes_DWordAdjust');
// var bitDisplayRouter = require('./routes/routes_BitDisplay');
// var bitAdjustRouter = require('./routes/routes_BitAdjust');
// var panelRouter = require('./routes/routes_Panel');

var app = express();

// view engine setup
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// app.use('/point', pointRouter);
// app.use('/pointPickPlace', pointPickPlaceRouter);
// app.use('/image', imageRouter);
// app.use('/label', labelRouter);
// app.use('/line', lineRouter);
// app.use('/wordDisplay', wordDisplayRouter);
// app.use('/wordAdjust', wordAdjustRouter);
// app.use('/dwordDisplay', dwordDisplayRouter);
// app.use('/dwordAdjust', dwordAdjustRouter);
// app.use('/bitDisplay', bitDisplayRouter);
// app.use('/bitAdjust', bitAdjustRouter);
// app.use('/panel',panelRouter)

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

