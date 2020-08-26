var mongoose = require('mongoose');
var bcrypt=require('bcryptjs')


var socialSchema1 = new mongoose.Schema({
    
    linkedin : { type: String, default: null },
    instagram : { type: String, default: null },
    facebook : { type: String, default: null },
    youtube : { type: String, default: null },
    pinterest : { type: String, default: null },
    reddit : { type: String, default: null },
    twitter : { type: String, default: null }
  })

  var contactSchema1 = new mongoose.Schema({
    
    country : { type: String, default: null },
    state : { type: String, default: null },
    cell : { type: String, default: null },
    home : { type: String, default: null },
    fax : { type: String, default: null }
  })




var userSchema= new mongoose.Schema({
    firstname: {
      type: String,
    },
    occupation:{
      type: String,
      index: true
    },
    lastname: {
      type: String,
      index:true
    },
    email: {
      type: String,
    },
    pref_username: {
      type: String,

    },

    password : {
      type: String,

    },

    bio : {
      type: String,
    },

    address : {
      type : String,
    },
    
    verified : Boolean,

    unique_code: {
        type: String,
  
      },

      forgot_password_code: {
        type: String,
      },

    socialSchema: socialSchema1,

    contactSchema: contactSchema1


  })

var User=module.exports=mongoose.model('User',userSchema);

module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
  var query = {pref_username : username};
  User.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword,hash,callback){
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {

  callback(null,isMatch);
});
}


module.exports.cryptUser = function(newUser,callback){
 bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
      newUser.password=hash;
      newUser.save(callback);
    });
});

}

module.exports.createUser = function(newUser,callback){
    
         newUser.save(callback);
       console.log("User inserted in DB"+ newUser);
       
   };
