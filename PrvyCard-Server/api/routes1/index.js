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

var Image = mongoose.model('Image');

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/uploads',express.static('uploads'));
const nodemailer = require('nodemailer');
const { ifError } = require('assert');

var fs = require('fs');
const FileReader = require('filereader');
var ipfsClient = require('ipfs-http-client')
var ipfs = ipfsClient('ipfs.infura.io', '5001', { protocol: 'https' })
var vCardsJS = require('vcards-js');
var fs = require('fs');
// const IPFS = require('ipfs-mini');
// var ipfs = new IPFS ({host:'ipfs.infura.io', port:'5001', protocol: 'https' });
var ImageRouter = express.Router();
var ext = '';


const storage = multer.diskStorage({
  destination: function(req,file,cb){
    cb(null,'./views/images');
  },
  filename: function(req,file,cb)
  {
    cb(null,Date.now() + file.originalname);
  }
});

const fileFilter = (req,file,cb)=>{
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    cb(null,true);
  }
  else{
    cb(null,false);
  }
}

const upload = multer({
  storage: storage,
  limits:{
    filesize: 1024* 1024 *5 
  },
  fileFilter: fileFilter
})

router.post('/uploadmulter',
  upload.single('imageData'),(req,res,next)=>{

    Image.findOne({ 'imageName': req.query.username}, function(err, image) {
      if(image){
           image.remove();
          
      }}).catch((err) => next(err))

    console.log("inside post")
    console.log(req.body);

    const newImage= new Image({
      imageName : req.query.username,
      imageData: req.file.path
    });
    
    newImage.save().then((result) =>{
      console.log(result);
      res.status(200).json({
        success: true,
        document: result
      });
    }).catch((err) => next(err));

   
  }
 );

//Multer to upload profile pic
/*onst multerConf = {
    storage : multer.diskStorage({
      destination : function(req, file, next){
        next(null,'./views/images');
      },
    filename: function(req, file, next){
       ext = file.mimetype.split('/')[1];
      next(null,'Pic'+'.'+ext);
    },
    fileFilter: function(req, file, next){
      if(!file){
        next();
      }
      const pdf = file.mimetype.startsWith('application/');
      if(pdf){
        next(null, true);
      }else{
        next({message: "File type not supported"},false);
      }
    }
  
    })
  };*/


  router.get('/get_admin',function(req,res,next){
    console.log(":In the get_adminb and username we got is "+ username)
    var username = req.query.username;

    User.findOne({ 'pref_username': "admin"}, function(err, Admin) {
      if(Admin){
        console.log("Adminfound and giving 200")
        res.status(200).send("admin found!");
      } else {
        console.log("Admin not found and giving 404")
        res.status(404).send("admin not found!");
      }

  })

})



  router.get('/get_profileimage',function(req,res,next){
    var username = req.query.username;
    Image.findOne({'imageName':username}, function(err,image){
      console.log(image)
      if(image)
      {
        res.status(200).sendFile(path.join(__dirname, '../../', image.imageData));
      }
      else{
        res.status(404).send("Not Found")
      }
    })
  })

router.post('/del_request', function(req, res,next) {

    
    var email = req.query.email;
    console.log("emaillll");
    console.log(email);

      
      User.findOne({ 'email': email}, function(err, user) {
        if(user){
            user.remove();
            user.save(function(err, userDeleted) {
                if (err) {
                console.log(err);
                } else {
            console.log("User Deleted Succesfully");

        }
    })
}
      })
      

    Admin.findOne({ 'name': 'admin'}, function(err, admin) {
        if(admin){

           for(var i=0; i<admin.requests.length;i++){
             if(admin.requests[i].email == email ) {
                 console.log("request removed");
                admin.requests[i].remove();
             }
           }

                  admin.save(function(err, adminUpdated) {
                    if (err) {
                     console.log(err);
                    } else {
                     console.log("Admin Updated Succesfully : "+ adminUpdated);

                     //  //nodemailer
     let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'prvycard@gmail.com', // generated ethereal user
            pass:  'prvyCard123!@#'// generated ethereal password
        },
        tls:{
          rejectUnauthorized:false
        }
    });

    var code_string = '<p> Your request is rejected by the admin. Please contact admin support for more details. </p>';

    let mailOptions = {
    from: '"PRVY Card." <prvycard@gmail.com>', // sender address
    to: email, // list of receivers
    subject: '❗️❗️ PRVY CARD Registration Failure',
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
    res.status(200).send("request deleted");
                     //res.redirect('/api/login')
                    }
                  });

                        }
                  })
                        })

                        router.post('/login', function(req, res,next) {
                          var username= req.query.username;
                          var code = req.query.unique_code;
                          var password1 =req.query.password;
                          var password2 =req.query.password_repeat;
                      
                      //Check for same password
                      
                      User.findOne({ 'pref_username': req.query.username}, function(err, user) {
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
                                  res.status(204).send("User found but Unique Code MisMatched!")
                              }
                            
                          } else {
                            console.log("User not verified");
                            res.status(403).send("This user is not verified");
                              
                          }
                          } 
                          else{
                            console.log("User not Found!");
                            res.status(404).send("This user is not found in DB");
                              
                          }
                      })
                      })


    router.post('/approve_request', function(req, res,next) {

            var email = req.query.email;
            var code = req.query.code;
                        
                           

            User.findOne({ 'email': email}, function(err, user) {
                if(user){
                    user.verified = true;
                    user.save(function(err, userUpdated) {
                        if (err) {
                        console.log(err);
                        } else {
                    console.log("User Updated to Verified "+userUpdated);
        
                }
            })
        }
              })


            Admin.findOne({ 'name': 'admin'}, function(err, admin) {
              if(admin){
                        
                 for(var i=0; i<admin.requests.length;i++){
                   if(admin.requests[i].email == email ) {
                        console.log("request removed");
                            admin.requests[i].remove();
                              }
                            }
                        
                         admin.save(function(err, adminUpdated) {
                           if (err) {
                           console.log(err);
                           } else {
                       console.log("Admin Updated Succesfully : "+ adminUpdated);


                       //MAIL TRIGGERING //
  
 
    //  console.log("Now triggering mail to "+ email + "with a unique code of "+ result);
 
    //  //nodemailer
     let transporter = nodemailer.createTransport({
         host: 'smtp.gmail.com',
         port: 587,
         secure: false, // true for 465, false for other ports
         auth: {
             user: 'prvycard@gmail.com', // generated ethereal user
             pass:  'prvyCard123!@#'// generated ethereal password
         },
         tls:{
           rejectUnauthorized:false
         }
     });
 
     var code_string = '<p> Thank you for registering with us! Your unique code is ' + code + '. </p>';
 
     let mailOptions = {
     from: '"PRVY CARD" <prvycard@gmail.com>', // sender address
     to: email, // list of receivers
     subject: '✅ PRVY CARD Registration Succesful',
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
     res.status(200).send("request approved");
                     //res.redirect('/api/login')
               }
           });
                        
          }
     })
      })



      router.post('/update_handle', function(req, res, next) {
        var username = req.query.username;
  

      console.log("In update_handle username is  " + username );

      
      User.findOne({ 'pref_username': username}, function(err, user) {
                if(user){
                    console.log("User Found");

                        user.firstname = req.query.fullname; 

                       // user.lastname = req.query.lastname; 
                       user.occupation = req.query.occupation;
                       
                        user.socialSchema.instagram=  req.query.instagram;
      
                        user.socialSchema.twitter=  req.query.twitter;
              
                        user.socialSchema.facebook=  req.query.facebook;
          
                        user.socialSchema.pinterest=  req.query.pinterest;
        
                        user.socialSchema.youtube=  req.query.youtube;
                  
                        user.socialSchema.linkedin =  req.query.linkedin;
           
                        user.socialSchema.reddit =  req.query.reddit;
                
                        user.bio = req.query.bio;

                        user.address = req.query.address;

                        user.contactSchema.country = req.query.country;

                        user.contactSchema.state = req.query.state;
                         
                        user.contactSchema.cell = req.query.cell;
                         
                        user.contactSchema.home = req.query.home;

                        user.contactSchema.fax = req.query.fax;

                        //user.contactSchema.email = req.query.email;
                    
                      user.save(function(err, userUpdated) {
                        if (err) {
                        console.log(err);
                        } else {
                    console.log("User Profile Updated to  "+userUpdated);
        
                }
            })                 
                    
        } else {
          res.status(404).send("user not found");
        }
              })

              //return res.json({ done : true });
              //res.status(200).send(JSON.stringify(user));
              res.status(200).send("user updated")
      })



      router.get('/get_profile', function(req, res, next) {
        
         
        var username = req.query.username;
        
    User.findOne({ 'pref_username': username}, function(err, user) {
                if(user){
                    //console.log("User Found in get profile");
                    res.status(200).send(user);
                } else {
                  res.status(404).send("user not found");
                }
              })
      })

    router.get('/get_imagelocation',function(req,res,next){
      Image.findOne({'imageName':req.query.username}, function(err,image){
       res.send(image.imageData);
      })});
  


      router.get('/get_vcard', function(req, res, next) {
        var vCard = vCardsJS();
        
        
   
         //vCard.photo.embedFromFile('views/images/1595848271984images.jpeg');
         vCard.photo.embedFromFile(req.query.filelocation);

        vCard.isOrganization = true;
        vCard.firstName = req.query.fullname;
        vCard.homePhone = req.query.home;
        vCard.cellPhone = req.query.cell;
        vCard.email=req.query.email;
        vCard.fax=req.query.fax;
        
          

        vCard.note= req.query.bio;

        vCard.homeAddress.label = 'Home Address';
vCard.homeAddress.street = req.query.address;

vCard.homeAddress.stateProvince = req.query.region;
vCard.homeAddress.countryRegion = req.query.country;
        
        vCard.socialUrls['linkedin'] = "http://www.linkedin.com/in/"+req.query.linkedin;
        vCard.socialUrls['twitter'] = "http://www.twitter.com/"+req.query.twitter;
        vCard.socialUrls['instagram'] = "http://www.instagram.com/"+req.query.instagram;
        vCard.socialUrls['facebook'] = "http://www.facebook.com/"+req.query.facebook;
        //vCard.socialUrls['reddit'] = "http://www.reddit.com/"+req.query.reddit;
        //vCard.socialUrls['pinterest'] = "http://www.pinterest.com/"+req.query.pinterest;
        vCard.socialUrls['youtube'] = "https://www.youtube.com/c/TeamNaach";
        
        console.log(vCard);
        vCard.version = '3.0'; 
        vCard.saveToFile(req.query.fullname+'.vcf'); 
        const fileName = req.query.fullname+'.vcf';
        const filePath = path.join('./', fileName);

         const options = {
            headers: {
                'x-timestamp': Date.now(),
                'x-sent': true,
                'content-disposition': "attachment; filename=" + fileName, // gets ignored
                'Content-Type': "text/x-vcard; CHARSET=utf-8;"
            }
        }
    
        try {
            res.download(
                filePath,
                fileName,
                options
            );
            console.log("File sent successfully!");
        }
        catch (error) {
            console.error("File could not be sent!");
            next(error);
        }

      })


