import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../login.service';
import { RegistrationService } from '../registration.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {

  user:User=new User('','',0,'');

  constructor(private registrationservice:RegistrationService,private router:Router) { }

  saveToDb()
  {
    this.registrationservice.saveToDb(this.user).subscribe(
      answer =>
      {

      if(answer)
      {
         
         sessionStorage.setItem("message","registration succeesful");
        
        this.router.navigate(['login']);
        
      }

    },
    error=>
    {
      
      sessionStorage.setItem("message","registration Unsucceesful");
        
    });
  }
}
