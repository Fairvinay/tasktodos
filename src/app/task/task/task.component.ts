import { Component, Input, OnInit } from '@angular/core';
import { randomBytes } from 'crypto';
import { TaskItem } from 'src/app/model/task.item';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  name:string ="" + (Math.random() + 1).toString(36).substring(7)

  @Input()
  item!: TaskItem;
  
  constructor() { 

    console.log("this.name ", this.name);
  }

  ngOnInit(): void {
  }
   
  
}
