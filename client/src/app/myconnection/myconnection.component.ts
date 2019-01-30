import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';


@Component({
  selector: 'app-myconnection',
  templateUrl: './myconnection.component.html',
  styleUrls: ['./myconnection.component.css']
})
export class MyconnectionComponent implements OnInit {

  constructor(public _userService:UserService) { }

  friends = [];
  _id : string;
  

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

	removeFriend(_id){

		console.log("response");
		this._userService.unFollow(_id).subscribe((res:any)=>{
			console.log("response",res);
			this._id = res;
			localStorage.setItem("user",JSON.stringify(res));
			
	
		},err=>{
			console.log("error",err);
		})

		}
}
