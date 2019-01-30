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
				res.status(200).json({msg: "log in success user ", user: founduser});
			}else{
				res.status(400).json({msg: "incorrect password"});
			}
		}else{
			res.status(404).json({msg: "user not found"});

		}
	})
}
userController.searchUser = function(req,res){
	var key = req.query.key;
	console.log("key from userController",key);
	userModel.find({$or:[{first_name:key},{last_name:key}]},function(err,founduser){
		res.send(err || founduser);
		console.log(founduser);
	})
}

userController.addFriend = function(req,res){
	var currentUser = req.body.requestedUser;
	var user = req.body.userTobeFollowed;
	console.log(currentUser, user);
	userModel.findOne({_id:currentUser},function(err,founduser){
		console.log(founduser);
		founduser.friend.push(user);
		founduser.save();
		res.send(founduser);
	})
	
	
}

userController.unFollow = function(req,res){
	var currentUser = req.body.requestedUser;
	var user = req.body.userTobeUnFollowed;
	userModel.findOne({_id:currentUser},function(err,result){
		console.log(result);
		var index = result.friend.indexOf(user);
		console.log(index);
		if(index == -1){
			console.log("user not found");
			res.status(401).send("Bad Request");
		}
		else{
			result.friend.splice(index,1);
			result.save();
			res.send(result);
		}
	})
}

userController.getUserById=function(req,res){


	userModel.findOne({_id:req.params.id},function(err,foundUser)
	{
		console.log("foundUser",req.params.id);
		res.send(err || foundUser);
	})
}

userController.getMyAllFriendsById = function(req,res){

	var currentUser = req.params.requestedUser;
	console.log("id",req.params.requestedUser);
	userModel
	.findOne({_id:currentUser})
	.exec((err,result)=>{
		if(err) {res.status(500).send(err);}
			userModel
			.find({'_id': { $in: result.friend }})
			.populate('users')
			.exec((err, friend)=>{
				if(err) {res.status(500).send(err);}
				console.log("==========&%^$&$$%^$%^%&^%$^",friend);
				res.status(200).send(friend);
			})
	})

}



module.exports = userController;