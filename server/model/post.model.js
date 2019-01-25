var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var postSchema = new Schema({
  	content : String,
  	datetime : String,
  	publish : String
 }
  	);

  module.exports = mongoose.model('posts',postSchema);
  
