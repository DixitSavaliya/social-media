import { Component, OnInit } from '@angular/core';
import  {PostService} from '../post.service';
import {Router} from '@angular/router';

@Component({
	selector: 'app-feeds',
	templateUrl: './feeds.component.html',
	styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnInit {

	friends=[];
	constructor(public _postService:PostService , private router:Router) { }

	ngOnInit() {

		this.getFriendPost();
	}

	getFriendPost(){
		var id = JSON.parse(localStorage.getItem('user'))._id;
		this._postService.getMyFriendPost(id).subscribe((res: any) => {
			console.log("response",res);
			for(var i=0;i<res.length;i++){
				for (var j = 0; j < res[i].post.length; ++j) {
					this.friends.push(res[i].post[j]);
				}
			}
			console.log("posts in service",this.friends);
		},
		err => {
			console.log("ERROR !" , err)
		});
	}

}
