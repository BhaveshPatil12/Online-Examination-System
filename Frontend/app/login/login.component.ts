import { Component, OnInit } from '@angular/core';
import { LoginService, User } from '../login.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit
{
 answer:boolean=false;
 message:any="";
 subject:string="";
 color:string="";

 user:User=new User('','',0,'');

 constructor(private loginService:LoginService,private router:Router) { }

 ngOnInit()
 {
   this.message=sessionStorage.getItem('message');
 }

 validate()
 {
   this.loginService.validateUser(this.user).subscribe(answer=>{this.answer=answer;
     
     if(this.answer)
     {
       this.router.navigate(['welcome']);
       sessionStorage.setItem("username",this.user.username);
       sessionStorage.setItem("subject",this.subject);
  
     }
     else
     {
       this.router.navigate(['login']);
       this.message="wrong credentials";
     }

       
   });
 }

}
