import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TodoService } from '../todo.service';
import { Todo } from 'src/app/Models/Todo';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css']
})
export class TodoEditComponent implements OnInit {

  constructor(private todoService: TodoService) { }

  id: number;
  task: Todo;
  editMode = false;
  taskIndex: number;
  taskAddForm: FormGroup;

  ngOnInit() {

    this.todoService.editMode.subscribe(
      (res: any) => {
        this.editMode = res[0] != null;
        this.task = res[1];
        this.taskIndex = res[0];
        this.initForm();
      }
    );
    this.initForm();
  }

  initForm() {
    let title = '';
    // let date_added = '';
    // let date_completed = '';
    // let status: number;

    if (this.editMode) {
      title = this.task.task;
    }

    this.taskAddForm = new FormGroup({
      title: new FormControl(title, Validators.required),
      // date_added: new FormControl(date_added),
      // date_completed: new FormControl(date_completed),
      // status: new FormControl(status),
    });
  }

  onSubmit() {
    let taskCreated = {
      task: this.taskAddForm.value.title,
    }

    if (this.editMode) {
      this.task.task = this.taskAddForm.value.title;
      this.todoService.updateTask(this.task);
      this.editMode = false;
      this.taskAddForm.reset();
    } else {
      this.todoService.createTask(taskCreated);
      this.taskAddForm.reset();
    }
  }
}



