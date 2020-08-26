var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
//var dburl = 'mongodb://localhost:27017/tappydata';
 //var dburl= 'mongodb+srv://admin:admin@tappy.ulixk.gcp.mongodb.net/Tappy?retryWrites=true&w=majority';
var dburl = 'mongodb+srv://admin:pCard123@prvycard.vwkom.mongodb.net/PrvyCard?retryWrites=true&w=majority';
// mongoose.connect(dburl,{ useNewUrlParser: true })

mongoose
.connect(dburl, {
useUnifiedTopology: true,
useNewUrlParser: true,
})
.then(() => console.log('DB Connected!'))
.catch(err => {
console.log("DB Connection Error: ${err.message}");
});

mongoose.connection.on('connected',function(){
  console.log('Mongoose connected to :-'+ dburl)
})

mongoose.connection.on('disconnected',function(){
  console.log('Mongoose disconnected')
})

mongoose.connection.on('error',function(err){
  console.log('Mongoose connection error'+ err)
})

process.on('SIGINT',function(){
  mongoose.connection.close(function(){
    console.log('Mongoose disconnected through app termination(SIGINT)')
    process.exit(0)
  })
})

process.on('SIGTERM',function(){
  mongoose.connection.close(function(){
    console.log('Mongoose disconnected through app termination(SIGTERM)')
    process.exit(0);
  })
})

process.once('SIGUSR2',function(){
  mongoose.connection.close(function(){
    console.log('Mongoose disconnected through app termination(SIGUSR2)')
    process.kill(process.pid,'SIGUSR2')
  })
})

//BRING IN SCHEMAS AND MODELS IN HERE

require('./user.model.js');
require('./admin.model.js');
require('./image.model.js');

