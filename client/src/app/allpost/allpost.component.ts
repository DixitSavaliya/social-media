import { Component, OnInit } from '@angular/core';
import  {PostService} from '../post.service';
import {Router} from '@angular/router';


@Component({
	selector: 'app-allpost',
	templateUrl: './allpost.component.html',
	styleUrls: ['./allpost.component.css']
})
export class AllpostComponent implements OnInit {

	posts;

	
	constructor(public _postService:PostService , private router:Router) { }

	ngOnInit() {
		this.getMyPost();
	}

	getMyPost(){
		
		var id = JSON.parse(localStorage.getItem('user'))._id;
		this._postService.getUsersPosts(id).subscribe((res: any) => {
			console.log("response",res);
			this.posts=res;
			console.log("posts in service",this.posts);

		},
		err => {
			console.log("ERROR !" , err)
		});
	}

	

}
