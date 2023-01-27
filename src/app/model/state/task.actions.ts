import { createAction , props } from "@ngrx/store";
import { Task } from "../task";

export const createTask = createAction("createTask", 
props<{payload: Task}>());
export const deleteTask = createAction("deleteTask", 
props<{payload: Task}>());
export const resetTask = createAction("resetTask");
export const completeTask = createAction("completeTask",
props<{payload: Task}>());
export const listTask = createAction("listTask");

