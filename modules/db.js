var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define the parameters of the database
var Todo = new Schema({
    user_id : String,
    content : String,
    updated_at : Date
});


//var db = mongoose.connection;
//db.on('error', console.error.bind(console, 'connection error: '));
//db.once('open', function(callback){
    //this is what the connection to the database will be used for
//    console.log("Connected to database");

    
//});
