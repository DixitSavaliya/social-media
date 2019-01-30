import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';



@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

	detail = {first_name:"", last_name:"",  dob:"", email:""};

  constructor(public _userService:UserService) { }

  ngOnInit() {

  	this.getUser();
  }

  getUser(){

  	 var id = JSON.parse(localStorage.getItem('user'))._id;
  	this._userService.getUserById(id).subscribe((res:any)=>{
  			console.log("profile");
  			this.detail=res;
  		},err=>{
  			console.log("error");
  		});
  

  }

}
