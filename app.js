let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

//required for passport
let ensure = require('connect-ensure-login');
let session = require('express-session');
let flash = require('connect-flash');

let passport = require('./app/config/passport');
let memberController = require('./app/controllers/member_controller');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//required for passport
app.use(session({secret: 'ilovenodejs'}));
app.use(passport.init());
app.use(passport.session());
app.use(flash());

app.get('/', memberController.index);
app.get('/login', memberController.login);
app.post('/login', passport.auth());
app.get('/profile', ensure.ensureLoggedIn(), memberController.myProfile);
app.get('/logout', memberController.logout);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
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
