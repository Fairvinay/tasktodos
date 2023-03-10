import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";

import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';


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
  DOMSAC: string= "security#xss)";
  VALIDREG: string = "[\w\d]*" ; //"^[a-zA-Z0-9]+$";
  ALLOWED:string =" ,.-+"
  NOTALLOWED: string ="%$#@!^&*()~`<>"
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
    private sanitizer: DomSanitizer,
    private store: Store<{taskitem: TaskItem[] }>) {   
     

    }
   //  [\w\d\-]{1,})([\.])?([\w\d]{1,})
  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      taskName: new FormControl('', [Validators.required ,
        Validators.pattern(/^[a-zA-Z0-9\.\-]+$/) ]
      )
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
   checkReg = (chSt:string, CHECKWITH:string) => 
  {    let te = Array.from(CHECKWITH);
       let ileg = false;
       te.forEach(c => { 
             if((chSt.indexOf(c) >-1)) 
             {ileg=true;} ;
           // console.log(" c "+c+" "+(chSt.indexOf(c) >-1 ? true:false));
          } )
         // console.log("ileg "+ileg)
       return ileg;
  };
  formValidate(){

    // this.taskForm.controls['taskName'].valueChanges.subscribe({
    //   next: (value) => {
    //      this.taskForm.controls['taskName'].updateValueAndValidity();
    //   } });
    let no = false;
    let task :string = this.taskForm.get('taskName')?.value;
    let pattern =  new RegExp(this.VALIDREG); 
       let chSt = Array.of(task)
    
    if(this.checkReg(task,this.NOTALLOWED) ){
      no = true;
      this.taskForm.get('taskName')?.setErrors({'incorrect': true})
    }
    else if(task == "" || task === null ||
    task === undefined ){

    this.taskForm.get('taskName')?.setErrors({'incorrect': true})
   }
   else if ( task.includes(this.DOMSAC)  ){
    this.taskForm.get('taskName')?.setErrors({'xss': true})
   }
   else{ 
    this.taskForm.get('taskName')?.setErrors({'incorrect': false})
     
   }
   //console.log("no "+no)
     return no;
  }
  addTask () {  
      
      this.taskForm.controls['taskName'].markAsTouched();
      let f =   this.formValidate();
     let task :string = this.taskForm.get('taskName')?.value;
      console.log("Todos add taask : "+task)
      this.taskForm.get('taskName')?.hasError
     if(!f) { 
       let tl :Task = { name: task, status: false, id:0}

      this.store.dispatch(createTask({payload:tl}))
      this.reloadTasks()
     }
     
  }
 completeTask(id:number) {

  let task:Task  = this.tasks.filter(x => x.id === id)[0]
  //console.log("task to complete : "+JSON.stringify(task))
  
  this.store.dispatch(completeTask({payload:task}))
   this.reloadTasks();
  //this.cdRef.detectChanges();
 }

  deleteTask (id:number) {
    //this.taskitems$.add
    let task = this.tasks.filter(x => x.id === id)[0]
     // console.log("task to delete : "+task)
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

      this.tasks2.forEach(s => //console.log("task2 "+JSON.stringify(s))
      s);
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
               // console.log(" typeof x Array "+JSON.stringify(x))
            // }
           }
           else if(x !== null && x !== undefined) {
             //  console.log(" typeof x Object "+JSON.stringify(x))
              
           }
          else { 
            let ar = Object.entries(x)[0]
            let  g = new TaskItem();
            g = JSON.parse(JSON.stringify(Object.entries(x)[0]));
           // console.log("g: " +JSON.stringify(g));
            this.tasks.push(g);
           }
          })
  }
}
