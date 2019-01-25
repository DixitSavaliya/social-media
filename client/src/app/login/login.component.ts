import { Component, OnInit } from '@angular/core';
import  {UserService} from '../user.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


	details = {email: "", password: ""};

  constructor(public _userService:UserService , private router:Router) { }

  ngOnInit() {
  }

 addData(details){
		console.log("details", details);
		this._userService.logIn(details).subscribe((res: any) => {
			console.log("response",res);
		localStorage.setItem("user",JSON.stringify(res));
		this.router.navigate(['/mywall']);

			
			
		},err => {
			console.log("ERROR !" , err)
		});
	}
}
