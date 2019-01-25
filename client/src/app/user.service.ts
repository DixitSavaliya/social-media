import { Injectable } from '@angular/core';
import  {HttpClient} from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http:HttpClient) { }



  logIn(log)
  {
  	console.log("login user",log);
  	return this.http.post("http://localhost:3000/user/logIn",log);
  	localStorage.setItem("user",JSON.stringify(log));
  }


  signUp(log)
  {
  	console.log("signUp user",log);
  	return this.http.post("http://localhost:3000/user/signUp",log);
  }
}
