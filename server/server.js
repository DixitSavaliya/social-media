var express = require('express');

var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var cors = require("cors");

var userController = require('./controller/user.controller');
var postController = require('./controller/post.controller')



mongoose.connect('mongodb://localhost:27017/Database', {useNewUrlParser: true})
.then(() => {console.log("connected")})
.catch(err => {console.log(err)});


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post('/user/signUp',userController.signUp);
app.post('/user/logIn' ,userController.logIn);

app.post('/post',postController.addPost);
app.get('/post',postController.getPosts);
app.put('/post',postController.deletePost);
app.get('/post',postController.getPostById);
app.put('/post',postController.updatePost);






app.listen(3000);