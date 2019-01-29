var postModel = require('../model/post.model');
var userModel = require('../model/user.model');
var postController = {};



postController.addPost = function(req,res){
	console.log(req.body);
	var userId=req.body.userId;
	var post=new postModel(req.body);
	console.log("addPost",post);
	post.save(function(err,savedPost){
		if(err){res.status(500).send("server err")}
			else{
				userModel.findOne({_id:userId})
				.exec((err,user)=>{
					if(err) {res.status(500).send("server err")}
						else{
							user.post.push(savedPost._id);
							user.save();
							res.status(200).send(savedPost);
						}
					})
			}
		})
}	

postController.deletePost = function(req,res){
	var postid =req.params.id;
	postModel.remove({_id: postid},function(err,deletepost){
		console.log(err,deletepost);
		res.send(deletepost)
	})
}

postController.updatePost = function(req,res){

	var postid = req.body._id;
	postModel
	.findOneAndUpdate({_id: postid},req.body,{upsert:true},function(err,updatedpost){
		console.log(updatedpost);
		res.send(updatedpost);
	})
}

postController.getPostById=function(req,res){

	postModel.find({_id: req.params.id},function(err,foundpost)
	{
		res.send(err || foundpost);
	})
}

postController.getPosts = function(req,res){
	postModel.find({},function(err,posts){
		res.send({posts:posts});
	})
}

postController.getUsersPost = function(req,res){
	var userId = req.params.userId;
	userModel
	.findOne({ _id: userId })
	.populate('post')
	.select('post')
	.exec((err, result)=>{
		if (err) { res.status(500).send(err); }
		res.status(200).send(result);
	})
}

postController.getMyFriendPost = function(req,res){
	var currentUser = req.params.requestedUser;
	console.log("id",req.params.requestedUser);
	userModel
	.findOne({_id:currentUser})
	.exec((err,result)=>{
		if(err) {res.status(500).send(err);}
			userModel
			.find({'_id': { $in: result.friend }})
			.populate('post')
			.select('post')
			.exec((err, posts)=>{
				if(err) {res.status(500).send(err);}
				console.log("POSTS==========&%^$&$$%^$%^%&^%$^",posts);
				res.status(200).send(posts);
			})
	})
}





module.exports = postController;