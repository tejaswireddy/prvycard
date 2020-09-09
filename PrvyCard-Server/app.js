require('./api/data/db.js');
var express = require('express')
var favicon = require('serve-favicon');
var app = express()
var expressValidator = require('express-validator');
var path= require('path')
var bodyParser= require('body-parser')
var routes = require('./api/routes')
var routes1 = require('./api/routes1')
var exphbs = require('express-handlebars')
var cookieParser = require('cookie-parser')
var session = require('express-session')
const MongoStore = require('connect-mongo')(session);
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var multer = require('multer')
var flash = require('express-flash-notification');
var bcrypt=require('bcryptjs')
var asy = require("async");
var mongo = require('mongodb')
var mongoose = require('mongoose')
const nodemailer = require('nodemailer')
var User=mongoose.model('User')
var cors = require("cors");
//const fileUpload = require('express-fileupload');

const dotenv = require('dotenv').config();

//app.use(fileUpload());


app.use(bodyParser.json());
//bodyparser for posting the form related Data
app.use(bodyParser.urlencoded({ extended : false}))
app.set('view engine', 'jade');

const corsOptions = {
  credentials: true,
  origin: process.env.ORIGIN
};
app.use(cors(corsOptions));
//the middleware use() function of express for serving static files.
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  store: new MongoStore({url: 'mongodb+srv://admin:admin@tappy.ulixk.gcp.mongodb.net/tappy_sessions?retryWrites=true&w=majority'}),
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: { secure : false, maxAge : ( 60 * 60 * 1000) }
}))


//cookieParser
app.use(cookieParser('keyboard cat'));

//session


// Init passport authentication
app.use(passport.initialize());
// persistent login sessions
app.use(passport.session());


//flash
//express-messages
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});
app.use(flash(app));


// Express Validator Middleware
app.use(expressValidator({
    errorFormatter: function(param, msg, value){
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;

    while(namespace.length){
        formParam += '[' + namespace.shift() + ']';
    }
    return {
        param : formParam,
        msg   : msg,
        value : value
    };
  }
  }));



  //passport middleware
app.use(passport.initialize());
app.use(passport.session());

//setting the port
app.set('port',8013)



//bodyparser for posting the form related Data
app.use(bodyParser.urlencoded({ extended : false}))

app.set('views',path.join(__dirname,'views/'));

app.engine('hbs', exphbs({defaultLayout: 'main',extname:'.hbs'}));
app.set('view engine', 'hbs');

app.get('/', function(req, res){
  res.render('index');

});

//if a request starting with /api occurs it searches automatically in the routes folder.

app.get('*',function(req,res,next){
  res.locals.user=req.user||null;
  //console.log("In the * and the user is " + res.locals.user +" and isAuthenticated status is : "+ req.isAuthenticated() );
  next();
})

//failureRedirect:'/api/wrong_login'
//failWithError: true 


app.use('/api',routes)
app.use('/api1',routes1)



//making use of variable to configure the server properties..
var server = app.listen(app.get('port'),function(){
  var port = server.address().port;
  console.log('Express server listening on port ' + port)
})
