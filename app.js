var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
// var server = http.createServer(app);
// var io = require('socket.io')(server);

//允许访问
app.all('*',function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");  // ehotgame.top
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, token");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Connection", "keep-alive"); //长链接
  res.header("Access-Control-Allow-Credentials", true); //可以带cookies
	res.header("X-Powered-By", '3.2.1')
	if (req.method == 'OPTIONS') {
      //console.log(req.method);
	  	res.sendStatus(200);
	} else {
	    next();
	}
});

// //有新的客户端连接时触发
// io.on('connection', function (socket) {
//   console.log('socket connection');
//   //接收到消息时触发
//   socket.on('message', function (data) {
//       console.log('服务端收到 : ', data);
//       //注意send()方法其实是发送一个 'message' 事件
//       //客户端要通过on('message')来响应
//       socket.send('你好客户端, ' + data);
//   });
//   //发生错误时触发
//   socket.on('error', function (err) {
//       console.log(err);
//   });
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
