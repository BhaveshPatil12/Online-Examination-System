import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService 
{

  constructor(private httpclient:HttpClient) { }

  saveToDb(user:User)
  {
    return this.httpclient.post<boolean>("http://localhost:8080/saveToDB",user);
  }

}

