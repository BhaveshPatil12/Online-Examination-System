import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Answer, QuestionService } from '../question.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-score',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './score.component.html',
  styleUrl: './score.component.css'
})
export class ScoreComponent implements OnInit
{

  totalscore:any;
  allanswers:Answer[]=[];
  
  
  constructor(private questionService:QuestionService) 
  { 
    this.totalscore=sessionStorage.getItem('totalscore');
    console.log("score from component is " + this.totalscore);

  }
  
  ngOnInit(): void 
  {
    this.questionService.getAllAnswers().subscribe(response=>this.allanswers=response);    
  }

  getColor(submittedAnswer:string,originalAnswer:string)
  {

    if(submittedAnswer==originalAnswer)
      return "green";
    else
      return "red";
  }

}
