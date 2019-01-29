import { Component, OnInit } from '@angular/core';
import  {UserService} from '../user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public _userService:UserService,private router:Router) { }

  ngOnInit() {
  }






  logout(){
		console.log("response");
		localStorage.clearAll();
		this.router.navigate(['/logIn']);

			
		
	}

}
