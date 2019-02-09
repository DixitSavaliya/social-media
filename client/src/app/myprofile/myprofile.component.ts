import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {UserService} from '../user.service';



@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

	detail = {first_name:"", last_name:"",  dob:"", email:"",fileName:"",cover:""};
  files:FileList;

  constructor(public _userService:UserService, public change: ChangeDetectorRef) { }

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


  changFile(e, changeType){
    console.log(e.target.files);
    var userId = JSON.parse(localStorage.getItem('user'))._id;
    console.log("userid===>",this.detail['userId']);
    this.files = e.target.files;
    this._userService.uploadFile(this.files,userId, changeType).subscribe((res:any)=>{
      console.log("res==============[][][]]",res);
      this.detail = res;
      this.change.detectChanges();
    },err=>{
      console.log("err=============9-9-9-",err);
    });
  }

  updateProfile(detail){
    console.log("detail====--=-",detail);
    var userId = JSON.parse(localStorage.getItem('user'))._id;
    detail['userId']=userId;
    console.log("userid=======",userId);
    this._userService.update(detail).subscribe((res:any)=>{
      this.detail = res;
      this.change.detectChanges();
      localStorage.setItem("user",JSON.stringify(res.user));

    },err=>{
      console.log("error");
    })

  }

}
