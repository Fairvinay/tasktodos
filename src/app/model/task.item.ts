
import { Task } from "./task"
export class TaskItem implements Task {
    
    name: string = "";
    status: boolean = false;
    id:number = 0;
    // setName(d: string): void {
    //     if((d === null) || (d === undefined))
    //      throw new Error("Task cannot be Null");
    //     this.name = d;
    // }
  


}