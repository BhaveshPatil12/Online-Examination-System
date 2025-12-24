import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Answer, Question, QuestionService } from '../question.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit {

  username:any;
  subject:any;
  question:Question=new Question(0,'','','','','','','');
  submittedAnswer:string='';
  answer:Answer=new Answer(0,'','','');
  remainingTime=301;
  durationMessage:string="";
  previousAnswer:any="";
  examInterval:any;  
  selected=false;
  allanswers:Answer[]=[];

  constructor(private questionService:QuestionService,private router:Router) 
  { 
    this.username=sessionStorage.getItem('username');
    this.subject=sessionStorage.getItem('subject');
  }

  ngOnInit()
  {
      
      this.examInterval=setInterval(()=>{
    
      this.remainingTime=this.remainingTime-1;//118
    
      const min=Math.floor(this.remainingTime/60);// 1
      const sec=this.remainingTime%60;//58
				
      this.durationMessage="Time Remianing :- " + min+":"+sec;

      if(this.remainingTime==0)
				{
						this.endexam();
				}
    
    },1000);

    this.questionService.getFirstQuestion(this.subject).subscribe(question=>this.question=question);
   
  }

  nextQuestion()
  {
    this.questionService.getAllAnswers().subscribe(response=>this.allanswers=response);

    this.selected=false;

    this.questionService.nextQuestion().subscribe(question=>this.question=question);

  }

  previousQuestion()
  {
    this.questionService.getAllAnswers().subscribe(response=>this.allanswers=response);

    this.selected=false;
    this.questionService.previousQuestion().subscribe(question=>this.question=question);
  }

  endexam()
  {
    
    clearInterval(this.examInterval);

    this.questionService.endexam().subscribe(totalscore=>
  
    {
      console.log('score from service is '+totalscore);

      console.log("value in session storage is " + totalscore);
    
      sessionStorage.setItem("totalscore",totalscore+"");

      this.router.navigate(['score']);
    });

    

  }

  buttonClicked()
  {
    //alert(this.submittedAnswer);

    this.answer.submittedAnswer=this.submittedAnswer;
    this.answer.qno=this.question.qno;
    this.answer.qtext=this.question.qtext;
    this.answer.originalAnswer=this.question.answer;

    this.questionService.saveAnswer(this.answer).subscribe();

  }

  compare(currentOption:string,qno:number)
  {
      
      for(var i=0;i<this.allanswers.length;i++)
      {
        console.log(this.allanswers[i].submittedAnswer + " " + currentOption);

        if(this.allanswers[i].qno==qno && this.allanswers[i].submittedAnswer==currentOption)
        {
          return "red";
        }
    
      }

      return "blue";
      
  }
}
