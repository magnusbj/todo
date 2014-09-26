var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
    user_id : String,
    content : String,
    updated_at : Date
});

module.exports = mongoose.model('Todo', todoSchema);
