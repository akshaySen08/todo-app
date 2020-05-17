import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/Models/Todo';
import { TodoService } from '../../todo.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  @Input() index: any;

  @Output() taskId: number;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  onCheck(index: number, task: Todo) {
    $('#markCheck' + index).toggleClass('completed');
    this.todo.status = this.todo.status === 0 ? 1 : 0;
    this.todoService.updateTask(this.todo, index);
  }

  editTaskTitle(index: number, task: Todo) {
    this.todoService.editMode.next([index, task]);
  }

  deleteTask(index: number, task: Todo) {
    if (confirm('Are you sure you want to delete this task ?')) {
      this.todoService.deleteTask(index, task);
    }
  }
}
