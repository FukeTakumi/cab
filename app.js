var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var come_messagesRouter = require('./routes/come_messages');
var go_messagesRouter = require('./routes/go_messages');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//メソッドオーバーライドの設定
var methodOverride = require('method-override');
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

//こっから
const db = require('./models/index');

////時間制限で削除する処理////
date = new Date();

//残り時間を計算する関数
function passing_time(hours,minutes){
  let passing_hours = mod(date.getHours() - hours,24);
  if(date.getMinutes() - minutes  < 0){
    passing_hours -= 1;
  }
  if(passing_hours >= 1){
    return true
  } else {
    return false
  }
}

//剰余を常に正にする関数
function mod(i, j) {
  return (i % j) < 0 ? (i % j) + 0 + (j < 0 ? -j : j) : (i % j + 0);
}

//削除を行う処理
db.come_message.findAll().then((come_messages)=>{
  for(let i = 0;i < come_messages.length; i++){
    const hours = Number(come_messages[i].postdate.split(':')[0]);
    const minutes = Number(come_messages[i].postdate.split(':')[1]);
    if(passing_time(hours,minutes)){
      const filter = {
        where:{
          id:come_messages[i].id
        }
      };
      db.come_message.destroy(filter);
    }
  }
});
////時間制限で削除する処理////


app.use('/', indexRouter);
app.use('/come', come_messagesRouter);
app.use('/go', go_messagesRouter);

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
