var postModel = require('../model/post.model');
var userModel = require('../model/user.model');
var postController = {};



postController.addPost = function(req,res){
	console.log(req.body);
	
		console.log("Reached Controller with body = ",req.body);
		var post = new postModel(req.body);
		post.save(function(err,savedPost){
			console.log(err,savedPost);
			res.send(savedPost)
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




	module.exports = postController;