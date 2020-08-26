require('./api/data/db.js');
var express = require('express')
var favicon = require('serve-favicon');
var app = express()
var expressValidator = require('express-validator');
var path= require('path')
var bodyParser= require('body-parser')
var routes = require('./api/routes')
var routes1 = require('./api/routes1')
var hbs = require('express-handlebars')
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


//app.use(fileUpload());


app.use(bodyParser.json());
//bodyparser for posting the form related Data
app.use(bodyParser.urlencoded({ extended : false}))


const corsOptions = {
  credentials: true,
  origin: "http://localhost:3000"
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


app.get('/', function(req, res){
  res.render('index');

});


app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;
  var file_name = 'ksr.png';

  file.mv(`./public/pics/${file_name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file_name, filePath: `./public/pics/${file.name}` });
  });
});



//if a request starting with /api occurs it searches automatically in the routes folder.

app.get('*',function(req,res,next){
  res.locals.user=req.user||null;
  //console.log("In the * and the user is " + res.locals.user +" and isAuthenticated status is : "+ req.isAuthenticated() );
  next();
})

//failureRedirect:'/api/wrong_login'
//failWithError: true 

app.get('/wrong_login',function(req, res,next){

    
  console.log("wrong login!!");

  res.status(202).send("error");

})

wrong = false;
app.post('/login1',
passport.authenticate('local',{session: false, failureRedirect:'/wrong_login' }),
function(req, res, err){

  console.log("After auth and user is : "+ req.user.pref_username );
  req.logIn(req.user, err => {

    if(flag == 2){
      res.status(200).send("normal");
 //res.redirect('/api/profile');
    } else {
        if(flag == 1){
          res.status(201).send("admin");
            //res.redirect('/api/admin');
        }
    }
  })
   

});


passport.use(new LocalStrategy(
  function(username, password, done) {
    User.getUserByUsername(username,function(err,user){

      if(err) {return done(err);}

      if(!user){
        console.log("No user found");
         return done(null,false,{message:'Unknown User!'});
        }

      User.comparePassword(password,user.password,function(err,isMatch){
        if(err) {return done(err); }

        if(isMatch){
       console.log("User Found  : "+ user.pref_username)
          
             
             if(user.pref_username === 'admin' && user.email == 'prvycard@gmail.com') {
                 flag = 1;
             } else {
                 flag = 2;
             }

              return done(null,user);
        }
          else {
              return done(null, false, {
                  message: "Invalid password"})

           return done(null,false)
         }
         })
})

}));

passport.serializeUser(function(user, done) {
       return done(null, user);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
      return done(err, user);
});
});


app.post('/resetPass', function(req, res,next) {
  var username= req.body.username;
  var password = req.body.password;
  var code = req.body.code;

  console.log('Username : '+ username)
  console.log('password : '+ password)
  console.log('code : '+ code)


  User.findOne({ 'pref_username': username}, function(err, user) {
    if(user){

      if(user.forgot_password_code != code){
        res.status(202).send("code mismatch");
        return;
      } else {

      user.password = password;

      user.save(function(err, userUpdated) {
        if (err) {
          console.log(err)
        } else {
            User.cryptUser(userUpdated,function(err, user){
                if(err) throw err;
                console.log(user);
          
              })
          console.log("User is updated : "+ userUpdated);
          res.status(200).send("user password is updated succesfully");
        }
      });
    }


    } else {
      console.log("User not found!");
      res.status(201).send("user not found");
    }


})
})


app.get('/get_user', (req, res, next) => {

  if(req.isAuthenticated()){
    if(req.user.firstname == "admin"){
      res.status(201).send({ user :  req.user});
    } else {
      res.status(200).send({ user :  req.user});
    }
    
  } else {
    res.status(202).send("user not authenticated!");
  }
  
})





app.get('/logout', function(req, res, next){
   
  req.logout();
   res.status(200).send("User Logged out!");

  
 })


app.use('/api',routes)
app.use('/api1',routes1)



//making use of variable to configure the server properties..
var server = app.listen(app.get('port'),function(){
  var port = server.address().port;
  console.log('Express server listening on port ' + port)
})