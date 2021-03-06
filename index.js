const createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const indexRouter = require('./routes/index');
const catalogRouter = require('./routes/catalog');
const usersRouter = require('./routes/users');

const app = express();
const router = express.Router();

//database connection
const mongoDB = 'mongodb+srv://admin:pass@cluster0.ubgm1.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev'));
app.use(cookieParser());
app.use(session({
  secret: "01101011",
  resave: false,
  saveUninitialized: true,
  cookie: { myCookie: 'chocolate chip' }
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter);

//error handler
app.use(function(err, req, res, next){
  console.log('error function called');
  res.locals.message = err.message;
  //res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error', {error: err});
});

app.listen(3000);