import { Injectable } from '@angular/core';
import  {HttpClient} from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class PostService {


	constructor(public http:HttpClient) { 
	}

	addPost(detail){
		console.log("addpost",detail);
		return this.http.post("http://localhost:3000/post",detail);
	}

	getPost(userid){
		return this.http.get("http://localhost:3000/post",userid);
	}


	getUsersPosts(userId){
		console.log("getPosts")
		return this.http.get("http://localhost:3000/post/"+userId);
		
	}

	getMyFriendPost(currentUser){
		console.log("getmyfriendpsts")
		return this.http.get("http://localhost:3000/post/get-friend-post/"+currentUser);
	}
	
}
