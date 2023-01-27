import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";



import { retryWhen, tap, switchMap, filter } from "rxjs/operators";
import { Observable, pipe, Subject } from "rxjs";
import { TaskItem } from 'src/app/model/task.item';
import { Task } from 'src/app/model/task';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { completeTask, createTask, deleteTask, listTask, resetTask } from 'src/app/model/state/task.actions';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  taskForm: FormGroup = new FormGroup({});
 // public taskitems$: Subject<TaskItem[]> = new Subject<TaskItem[]>();
  taskItem :Observable<TaskItem []> | undefined;
  tasks:Task[] = []; 
  tasks2:Subject<TaskItem[]> = new Subject<TaskItem[]>();
  @ViewChild('tasker') tasker: ElementRef | undefined;
  taskStyle: Object = { 'background-color': "none !important" };

  constructor(private formBuilder: FormBuilder,
     private route: ActivatedRoute,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private store: Store<{taskitem: TaskItem[] }>) {   
     

    }

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      taskName: ["", ]
     
    });
    this.store.select(state => state.taskitem).subscribe(
      x=> this.tasks2.next(x ));
      this.cdRef.detectChanges();
    this.reloadTasks();
  }
  getItems(): Task[] {
     return this.tasks
  }
  taskFocus () {
    this.onFocusTaskName();
    this.taskForm.controls
    this.tasker!.nativeElement.focus();
  }
  onFocusTaskName() {
    this.taskStyle={
      'background-color' : "#fff"
    }
  }
  onBlurTask (){
    this.taskStyle={
      'background-color' : "#fff"
    }
   // this.tasker!.nativeElement.focus();
  }
  listTask():Observable<TaskItem[]> {
    //this.taskitems$.add
   //let task = this.taskForm.get('taskName')?.value;
    let t$:TaskItem[] =[];
    
    return this.store.select(state => state.taskitem);
   
   //return t$;
  }
  addTask () {  
      //this.taskitems$.add
     let task = this.taskForm.get('taskName')?.value;
      console.log("Todos add taask : "+task)
     let f =   this.taskForm.get('taskName')?.hasError
     if(task == ""){
      this.taskForm.get('taskName')?.setErrors({'incorrect': true})
     }
     else{ 
      this.taskForm.get('taskName')?.setErrors({'incorrect': false})
      let tl :Task = { name: task, status: false, id:0}

      this.store.dispatch(createTask({payload:tl}))
      this.reloadTasks()
     }
  }
 completeTask(id:number) {

  let task:Task  = this.tasks.filter(x => x.id === id)[0]
  console.log("task to complete : "+JSON.stringify(task))
  
  this.store.dispatch(completeTask({payload:task}))
   this.reloadTasks();
  //this.cdRef.detectChanges();
 }

  deleteTask (id:number) {
    //this.taskitems$.add
    let task = this.tasks.filter(x => x.id === id)[0]
      console.log("task to delete : "+task)
      this.store.dispatch(deleteTask({payload:task}))
      this.reloadTasks();
     // this.cdRef.detectChanges();
}
resetTask () {
  //this.taskitems$.add
  console.log("Todos reset taask : ")
  this.store.dispatch(resetTask())
}



  onSubmit(){

  }

  trackByIdFn(idx:number) {
    
    let las: Task ={ id: idx , name:'', status:false};
    this.tasks2.subscribe(x => {
      if(Array.isArray(x)){
        if(x.length > 0)
       {  
         las=   x.filter(x => x.id === idx)[0]
       }
      }
    }
    )
    return las
    //this.tasks.filter(x => x.id === idx)[0];
  } 
  trackById(idx:number) {
    let lt :Task = { id: -1 , name:'', status:false};
    if(this.tasks)
     lt = this.tasks.find(x => x.id === idx)!;
    return lt;
  } 

  reloadTasks() {
    this.tasks2 = new Subject<TaskItem[]>();

    this.store.select(state => state.taskitem).subscribe(
      x=> this.tasks2.next(x ));

      this.tasks2.forEach(s => console.log("task2 "+JSON.stringify(s)));
      /* this.store.select(state => state.taskitem).subscribe(
        x=> x.forEach(tt => this.tasksItem(tt))
      );*/
    let tt = this.store.select(state => state.taskitem).subscribe(
      x => { 
           if(Array.isArray(x)){
             // if(x.length > 0)
             //{  
              /*  x.forEach(element => {
                  let lt :Task = { name : element.name , status:  element.status, id:element.id}
                     this.tasks.push(lt)
                });*/

                this.tasks = x;
                console.log(" typeof x Array "+JSON.stringify(x))
            // }
           }
           else if(x !== null && x !== undefined) {
               console.log(" typeof x Object "+JSON.stringify(x))
              
           }
          else { 
            let ar = Object.entries(x)[0]
            let  g = new TaskItem();
            g = JSON.parse(JSON.stringify(Object.entries(x)[0]));
            console.log("g: " +JSON.stringify(g));
            this.tasks.push(g);
           }
          })
  }
}
