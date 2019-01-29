var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var postSchema = new Schema({
  	content : String,
  	datetime : String,
  	publish : Boolean,
  	author:[{type:Schema.Types.ObjectId,ref:"users"}]
  });

  module.exports = mongoose.model('posts',postSchema);
  
