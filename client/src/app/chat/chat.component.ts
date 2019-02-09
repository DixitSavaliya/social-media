import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import {UserService} from '../user.service';


@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
	friends=[];
	message: string;
	messages = [];
	currentUser = JSON.parse(localStorage.getItem('user'));
	user:any;

	constructor(public _chatService: ChatService, public _userService:UserService) {
		this.getMessages();
	}

	ngOnInit() {
		this.getFriends();
	}

	getFriends(){
		var currentUser = JSON.parse(localStorage.getItem('user'))._id;
		this._userService.getMyAllFriendsById(currentUser).subscribe((res: any) => {
			console.log("response",res);
			for(var i=0;i<res.length;i++){
				this.friends.push(res[i]);
			}			
			console.log("users in service",this.friends);
		},(err:any) => {
			console.log("ERROR !" , err)
		});		
	}

	openModel(user){
		this.user = user;
		this.getAllMessage(user._id);
	}

	sendMessage(dstId){
		var body = {
			srcId: JSON.parse(localStorage.getItem('user'))._id,
			dstId: dstId,
			msg: this.message
		}
		this._chatService.sendMessage(body);
		setTimeout(()=>{this.getAllMessage(dstId)},500);
	}

	getAllMessage(user){

		var body = {
			srcId: JSON.parse(localStorage.getItem('user'))._id,
			dstId: user._id,
			
		}
		this._chatService.getAllMessage(body).subscribe((res:any)=>{
			console.log("message");
			this.messages=res;

		},err=>{
			console.log(err);
		});

	}

	getMessages(){
		this._chatService
		.getMessages()
		.subscribe((data: any) => {
			console.log(data);
			if(data.dstId === this.currentUser._id){
				alert("you have new message from " + data.msg);	
				this.getAllMessage(data.srcId);			
			}
		});
	}
	
	
}
