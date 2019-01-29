var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var userSchema = new Schema({
  	first_name : String,
  	last_name : String,
  	dob : String,
  	email : String,
  	password : String,
    post : [{ type:Schema.Types.ObjectId, ref:"posts"}],
    friend: [{ type:Schema.Types.ObjectId, ref:'users'}]
  	}

 
  	);

  module.exports = mongoose.model('users',userSchema);
  
