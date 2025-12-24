import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export class User
{
  username:string;
  password:string;
  mobno:number;
  emailid:string;

  public constructor(username:string,password:string,mobno:number,emailid:string)
  {
    
    this.username=username;
    this.password=password;
    this.mobno=mobno;
    this.emailid=emailid;
  }
  
}




@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpclient:HttpClient) { }

  validateUser(user:User):Observable<boolean>
  {
    return this.httpclient.post<boolean>("http://localhost:8080/validate",user);
  }



}
