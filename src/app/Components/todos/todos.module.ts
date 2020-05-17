import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { TodosComponent } from './todos.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-list/todo-item/todo-item.component';
import { TodoEditComponent } from './todo-edit/todo-edit.component';
import { TodoService } from './todo.service';
import { HeaderComponent } from '../core/header/header.component';



@NgModule({
  declarations: [
    TodosComponent,
    TodoItemComponent,
    TodoListComponent,
    TodoEditComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [
    TodoService
  ]
})
export class TodosModule { }
