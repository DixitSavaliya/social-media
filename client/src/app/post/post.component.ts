import { Component, OnInit } from '@angular/core';
import  {PostService} from '../post.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
	detail = {content:"", datetime: new Date(), publish: false};
	posts:any;
  constructor(public _postService:PostService , private router:Router) { }

  ngOnInit() {
  }

  addPost(detail){
		detail['userId'] = JSON.parse(localStorage.getItem('user'))._id;
		console.log("details", detail);
		this._postService.addPost(detail).subscribe(res=> {
			console.log("response",res);
		
		

			
			
		},err => {
			console.log("ERROR !" , err)
		});
	}

	getPosts(detail){

		this._postService.addPost(detail).subscribe(res=> {
			console.log("response",res);
		},err => {
			console.log("ERROR !" , err)
		});
	}
}




