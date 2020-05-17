import { Injectable } from '@angular/core';
import { Todo } from 'src/app/Models/Todo';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  allTasksChanged = new Subject<Todo[]>();
  editMode = new Subject();
  apiUrl = environment.apiUrl;

  private allTasks = [

  ];

  constructor(private httpClient: HttpClient, private authService: AuthService) {
  }

  getAllTasks() {
    return this.allTasks;
  }

  createTask(task) {

    const newTask = {
      task: task.task
    };

    this.httpClient.post(this.apiUrl + 'tasks', newTask).subscribe(
      (res: any) => {
        if (res.success) {
          this.allTasks.push(res.data);
        } else {
          console.log(res.message);
        }
      }
    );
    return this.allTasksChanged.next(this.allTasks);
  }

    updateTask(task: Todo, index: number = null) {
    console.log(task);

    this.httpClient.put(
      `${this.apiUrl}tasks/${task.id}`,
      task).subscribe(
        (res: any) => {
          if (res.success) {
            this.allTasks[index] = res.data;
          } else {
            console.log(res.message);
          }
        }
      );
    return this.allTasksChanged.next(this.allTasks);
  }

  deleteTask(index, task: Todo) {
    this.allTasks.splice(index, 1);

    this.httpClient.delete(`${this.apiUrl}tasks/${task.id}`).subscribe();

    return this.allTasksChanged.next(this.allTasks);
  }

  fetchTasks(tasks: Todo[]) {
    this.allTasks = tasks['data'];
    return this.allTasksChanged.next(this.allTasks.slice());
  }
}
