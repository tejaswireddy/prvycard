"use strict";
var express = require('express');
var app = express()
var expressValidator = require('express-validator');
var router = express.Router();
module.exports = router;
const multer = require('multer');
//var upload = multer({dest: '../resdem/views/images'})
var mongoose=require('mongoose');
var bodyParser= require('body-parser')
var Ask= mongoose.model('User')
var session = require('express-session')
var cookieParser = require('cookie-parser')
var flash = require('express-flash-notification')
var User=mongoose.model('User')
var Admin = mongoose.model('Admin')
var ctrlUsers = require('../controllers/users.controllers.js');
var hbs  = require('express-handlebars');
var path= require('path')
var asy = require("async");
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
  var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'jade');
const nodemailer = require('nodemailer')
const dotenv = require('dotenv').config();

var flag = 0;



router.get('/',function(req, res,next){

    
          console.log("Register page called!");

          res.render('index');
        
    })

 router.get('/login',function(req, res,next){

    
        console.log("Complete Registration page called!");

        res.render('login');
      
  })


 router.post('/new_admin',function(req, res,next){

  var newUser = new User({
    firstname: 'admin',
    lastname: 'admin',
    email: process.env.EMAIL,
    password: process.env.PASSWORD,
    pref_username: 'admin',
    verified : true
  })

  
  User.createUser(newUser,function(err, user){
    if(err) { 
        throw err;  } else {
    
                user.save(function(err, userUpdated) {
                    if (err) {
                      console.log(err)
                    } else {
                        User.cryptUser(userUpdated,function(err, user){
                            if(err) throw err;
                            console.log(user);
                      
                          })
                      console.log("Admin is updated : "+ userUpdated);
                    }
                  });

         console.log("Admin is inserted as user succesfully!");
        }
      })



    var newAdmin = new Admin({
        name :'admin',
       requests : []
      })

      Admin.createAdmin(newAdmin,function(err, newAdmin){
        if(err) { 
          res.status(404).send("Error Creating the admin");
            
           } else {

            res.status(200).send("Admin created succesfully");
      
  }
})
 })



 

  router.get('/login1',function(req, res,next){

    
    console.log("Login page called!");

    res.render('login1');
  
})


 /* router.get('/register',function(req, res,next){

    
    console.log("register succesful!");

    res.render('login');
  
})*/

router.get('/admin',function(req, res,next){

    
    console.log("admin login called");
    Admin.findOne({ 'name': 'admin'}, function(err, admin) {
        if(admin){
            console.log("admin request found  : "+ admin.requests); 
            res.status(200).send(JSON.stringify(admin.requests));
            

        } else {
            console.log("admin not found"); 
        }


    //res.render('admin');
  
})
})


router.get('/profile',function(req, res,next){

    
    console.log("profile page called");

    var user=req.user;

    console.log("Profile of user is : "+ user);

    res.render('profile', {user:user});
  
})

router.get('/wrong_login',function(req, res,next){

  console.log("wrong login!!");

  res.status(202).send("error");

})

router.post('/login1',passport.authenticate('local',{session: false, failureRedirect:'/wrong_login' }),
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

router.post('/upload', (req, res) => {
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

router.post('/resetPass', function(req, res,next) {
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
});

router.get('/get_user', (req, res, next) => {

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

router.get('/logout', function(req, res, next){
   
  req.logout();
   res.status(200).send("User Logged out!");

  
 })

  router.post('/register', function(req, res,next) {

    var firstname= req.query.fname;
  var email = req.query.email;
  var lastname=req.query.lname;
  var preferredname=req.query.pname;
  var result = '';

  console.log("In register first name is last name is and email is "+ firstname + " " + lastname + " " + email);

  result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < 7; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  

    if(false){
    //PASSWORD MATCHING VERIFICATION
    //VALID EMAIL MATCHING
    } else {

        //Creating the user in DB
        User.findOne({ 'email': email}, function(err, user) {
            if(user){
                console.log("Duplicate email found!");
                res.status(201).send("Duplicate Email");
              //res.render('index',{x:3});
            } else {
                User.findOne({ 'pref_username': preferredname}, function(err, user1) {
                    if(user1){
                        console.log("Duplicate pname found!");
                        res.status(202).send("Duplicate Pname");
                        
                      //res.render('index',{x:33});
            } else {
                console.log("Unique user detected!");

                var newUser = new User({
                    firstname:firstname,
                    lastname: lastname,
                    email:email,
                    pref_username:preferredname,
                    verified : false,
                    socialSchema : {},
                    contactSchema : {},
                    unique_code : result
                  })
                  User.createUser(newUser,function(err, user){
                    if(err) { 
                        throw err;  } else {

                           

     Admin.findOne({ 'name': 'admin'}, function(err, admin) {
        if(admin){
            console.log("admin found : "+ admin);
                    
            admin.requests.push({


                firstname:firstname,
                    lastname: lastname,
                    email:email,
                    pref_username:preferredname,
                    verified : false,
                    unique_code : result
                
                  });
                
                  admin.save(function(err, adminUpdated) {
                    if (err) {
                     console.log(err);
                    } else {
                     console.log("Admin Updated Succesfully : "+ adminUpdated);
                     console.log("ressssss");
                     
                      res.status(200).send("Registered successfully");
                     
                    }
                  });

                        }
                  })
            }
        })
    } 
    })
   
    } 

        })
}
  })

router.post('/login', function(req, res,next) {
    var username= req.query.username;
    var code = req.query.unique_code;
    var password1 =req.query.password;
    var password2 =req.query.password_repeat;

//Check for same password

User.findOne({ 'pref_username': req.body.username}, function(err, user) {
    if(user){

        if(user.verified){
        var stored_code = user.unique_code;


        if(code === stored_code){
            console.log("Unique Code Matched for "+ user);
            user.password = password1;
            user.verified = true;

            user.save(function(err, userUpdated) {
                if (err) {
                  console.log(err)
                } else {
                    User.cryptUser(userUpdated,function(err, user){
                        if(err) throw err;
                        console.log(user);
                  
                      })
                  console.log("User is updated : "+ userUpdated);
                  res.status(200).send("user is updated succesfully");
                }
              });

        } else {
            console.log("User found but Unique Code MisMatched!");
        }
      
    } else {
      console.log("User not verified");
      res.status(404).send("This user is not verified");
        
    }
    } 
    else{
      console.log("User not Found!");
      res.status(404).send("This user is not found in DB");
        
    }
})
})

var result = ''
//Forgot Password
router.post('/forgot', function(req, res,next) {

  var username= req.query.username;

  console.log("In forgot and username is "+ username);

  User.findOne({ 'pref_username': username}, function(err, user) {
    if(user){
      console.log("User found : "+ user.email)
      var email = user.email;

      result = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < 7; i++ ) {
         result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }

      //  //nodemailer
     let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
          user: process.env.EMAIL, // generated ethereal user
          pass: process.env.PASSWORD// generated ethereal password
      },
      tls:{
        rejectUnauthorized:false
      }
  });

  var code_string = '<p> Your code for password retrieval is  ' + result + '. </p>';

  let mailOptions = {
  from: '"PRVY CARD" <getprvy@gmail.com>', // sender address
  to: email, // list of receivers
  subject: '❕❕ PRVY CARD Forgot Password',
  html: code_string
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

  });


  //END OF MAIL TRIGGERING //

  user.forgot_password_code = result;

  user.save(function(err, userUpdated) {
    if (err) {
     console.log(err);
    } else {
     console.log("User forgot password code : "+userUpdated.forgot_password_code);
     
      res.status(200).send("email sent!");
     
    }


    })
  }
    else {
      console.log("User not found!");
      res.status(201).send("user not found");
    }
  })

})
