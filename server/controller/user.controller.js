var userModel = require('../model/user.model');

var userController = {};

userController.signUp = function(req,res){

	console.log("Reached Controller with body = ",req.body);
	var user = new userModel(req.body);
	user.save(function(err,savedUser){
		console.log(err,savedUser);
		res.send(savedUser);

	})
}

userController.logIn = function(req,res){

	enter_email = req.body.email;
	
	userModel.findOne({email:enter_email},function(err,founduser){
		if(founduser){
			if(req.body.password == founduser.password){
				res.status(200).json({msg: "log in success user "});
			}else{
				res.status(400).json({msg: "incorrect password"});
			}
		}else{
			res.status(404).json({msg: "user not found"});

		}
		


	})
	

	
}	





module.exports = userController;
