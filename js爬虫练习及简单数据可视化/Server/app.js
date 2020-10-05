var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var indexRouter = require('./routes/index');
// var APIsRouter = require('./routes/APIs');
// var NewsHandlerRouter = require('./routes/News_handler');
// var INewsHandlerRouter=require('./routes/INews_handler');
// var CarouselHandlerRouter=require('./routes/Carousel_handler');
var API_Weibo = require('./routes/API-weibo');
var API_Zhihu= require('./routes/API-zhihu');
var API_Bing = require('./routes/API-bing');
var app = express();

app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// 数据请求接口配置
// app.use('/Carousel_handler',CarouselHandlerRouter);
// app.use('/INews_handler',INewsHandlerRouter);
// app.use('/News_handler',NewsHandlerRouter);
// app.use('/apis', APIsRouter);
app.use('/', indexRouter);
app.use('/API-Weibo',API_Weibo);
app.use('/API-Zhihu',API_Zhihu);
app.use('/API-Bing',API_Bing);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
