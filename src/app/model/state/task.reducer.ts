import { createReducer , on } from "@ngrx/store";
import { initialState } from "./task.state"
import { completeTask, createTask, deleteTask, listTask, resetTask } from "./task.actions";
import { TaskItem } from "../task.item";
import {Task } from "../task";
/** 
  @param(state, on(ACTIONS_DEFINED)) 
  @type(Reducer )
  @typedef (createReducer)
*/
const _taskReducer = createReducer(initialState , 
    
    on(createTask, (state: any = initialState, {payload}: any) => {

        console.log(" initial state "+JSON.stringify(state));
          let tt: any = [];
          if(state.length ==0)
          tt = new Array();
          else 
          {  state.forEach((x:any )=> { 
            let rt :Task = 
            { name : x.name , status: x.status, id:x.id};
            tt.push(rt);
             }) };   // clone the task litems 
         console.log(" new state.taskitem "+JSON.stringify(tt));
           if(Array.isArray(tt)){
            let t: Task =  {
                name: payload.name,
                status: payload.status,
                id: parseInt((Math.random() ).toString(10).substring(5),10)
            };
             
              tt.push(t);
           }
        return tt        
        
    }),
    on(deleteTask, (state: any, {payload}: any) => {

        let tt2: any[] = [];
        state.forEach((x:any )=> { 
            let rt :Task = 
         { name : x.name , status: x.status, id:x.id};
              tt2.push(rt);
          })
        let comIdx = -1;
       

        tt2.forEach((element: any,index: any)=>{
            if(element.id == payload.id) comIdx = index;
         });
         if(comIdx >-1)
         {     console.log(
           "  delete array:  "+JSON.stringify(tt2));
     
             delete  tt2[comIdx];
         }
        tt2 =  tt2.filter(elements => {
          return elements !== null;
         }); //tt2.filter(notEmpty);
       console.log(" deleting state "+JSON.stringify(tt2));
      return  tt2
    
    }),
     on(resetTask, (state: any, {payload}: any) => {

        let tt3: any[] = [];
       console.log(" reset state "+JSON.stringify(tt3));

      return tt3;
      
     }),
     on(completeTask, (state: any, {payload}: any) => {

        let tt3: any[] = [];
      
       state.forEach((x:any )=> { 
                 let rt :Task = 
              { name : x.name , status: x.status, id:x.id};
        
        tt3.push(rt);
            })
         let comIdx = -1;
        tt3.forEach((element: any,index: any)=>{
                if(element.id == payload.id) {
                    console.log("ele: "+JSON.stringify(element));
                    let rt :Task = 
                    { name : element.name , status: element.status, id:element.id};
                    rt.status = !(rt.status);
                    comIdx = index;
                    console.log("completeTask  "+JSON.stringify(rt));
                };
             });
        if(comIdx >-1)
         {     console.log(
            "  comp array:  "+JSON.stringify(tt3));
            
              tt3[comIdx].status = !tt3[comIdx].status;
         }
      return tt3;
    
    }),
     on(listTask, (state: any, {payload}: any) => {

        let tt3: any[] = [];
      
       state.forEach((x:any )=> { 
        tt3.push(x);
            })
        console.log(" list state "+JSON.stringify(tt3));
      return tt3;
    
    })
    
    );

    function notEmpty<Task>(value: Task | null | undefined): value is Task {
        console.log(" notE "+JSON.stringify(value))
        return value === null || value === undefined;
    }
export function taskReducer (state:any , action:any){

    return _taskReducer(state, action);

}


