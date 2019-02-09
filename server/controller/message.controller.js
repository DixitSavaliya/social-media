var messageModel = require('../model/message.model');

var messageController = {};


messageController.getAllMessage = function(req,res){

	
	var srcId = req.body.srcId;
	var dstId = req.body.dstId;

	messageModel.find({$or:[{srcId:srcId},{dstId:dstId},{srcId:dstId},{dstId:srcId}]},function(err,result){
		if(err){
			console.log(err);
		}else{
			console.log(result);
			res.send(result);
		}

	})
}




module.exports = messageController;