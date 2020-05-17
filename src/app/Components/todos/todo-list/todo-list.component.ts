import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/Models/Todo';
import { TodoService } from '../todo.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos: Todo[];
  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.allTasksChanged.subscribe(
      (task: Todo[]) => {
        this.todos = task;
      }
    );
    this.todos = this.todoService.getAllTasks();
  }
}
