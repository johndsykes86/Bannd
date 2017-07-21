var express      = require('express');
var app          = express();
var mongoose     = require('mongoose');
var passport     = require('passport');
var flash        = require('connect-flash');
var ejsLayouts   = require("express-ejs-layouts");
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
var dbURL = 'mongodb://localhost/bannd'
var port = process.env.PORT || 3000


const store = new MongoDBStore({
  uri: 'mongodb://localhost/bannd',
  collection: 'sessions'
})


mongoose.connect(process.env.MONGODB_URI || dbURL)

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.set("views","./views");
app.use(express.static(__dirname + '/public'));

app.use(session({ secret: 'WDI-GENERAL-ASSEMBLY-EXPRESS', cookie: {maxAge: 600000000}, resave: true, saveUnitialized: false, store: store }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./config/passport')(passport);

app.use(function (req, res, next){
  global.user = req.user
  next()
})

var routes = require('./config/routes');
app.use(routes);

app.listen(PORT);
