var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
	content : String,
	datetime : String,
	publish : Boolean,
	fileName:String,
	comment:[{type:Schema.Types.ObjectId,ref:"comments"}],
	like:[{type:Schema.Types.ObjectId,ref:"users"}],
	userId:[{type:Schema.Types.ObjectId,ref:"users"}],
	share:[{type:Schema.Types.ObjectId,ref:"users"}]


});

module.exports = mongoose.model('posts',postSchema);

