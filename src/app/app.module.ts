import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskComponent } from './task/task/task.component';
import { TaskOutputComponent } from './task/task-output/task-output.component';
import { TaskButtonsComponent } from './task/task-buttons/task-buttons.component';
import { HeaderComponent } from './header/header/header.component';
import { FooterComponent } from './footer/footer/footer.component';
import { TodosComponent } from './todos/todos/todos.component';
import { StoreModule } from '@ngrx/store';
import { taskReducer } from './model/state/task.reducer';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    TaskOutputComponent,
    TaskButtonsComponent,
    HeaderComponent,
    FooterComponent,
    TodosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule, StoreModule.forRoot({taskitem : taskReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
