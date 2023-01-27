import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { Router, ActivatedRoute } from "@angular/router";

import { retryWhen, tap, switchMap, filter } from "rxjs/operators";
import { Observable } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  taskForm: FormGroup = new FormGroup({});
  title = 'tasktodos';

  constructor(
    
    private formBuilder: FormBuilder,
   
    private route: ActivatedRoute,
    private router: Router
  ) {}


  ngOnInit() {
  this.taskForm = this.formBuilder.group({
    taskName: ["", ]
   
  });
  }
  onSubmit() {

  }
 
}
