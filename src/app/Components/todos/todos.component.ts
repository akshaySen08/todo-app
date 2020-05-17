import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Todo } from 'src/app/Models/Todo';
import { map, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  isAuthenticated = false;
  apiUrl = environment.apiUrl;

  constructor(private todoService: TodoService, private httpClient: HttpClient, private authService: AuthService) { }

  ngOnInit() {

    // / Subscribing to user in service to check if user is authenticated or not
    this.httpClient.get<Todo[]>(
      this.apiUrl + 'tasks'
    ).subscribe(tasks => {
      this.todoService.fetchTasks(tasks);
    });

    this.authService.user.subscribe(
      user => {
        this.isAuthenticated = !!user;
      }
    );

    // this.authService.user.pipe(
    //   take(1),
    //   exhaustMap(user => {
    //     console.log('hey this is in');

    //     return this.httpClient.get<Todo[]>(
    //       'https://todo-app-95d91.firebaseio.com/tasks.json',
    //       {
    //         params: new HttpParams().set('auth', user.getToken())
    //       }
    //     );
    //   }),
    //   map(responseData => {
    //     const taskArray: Todo[] = [];
    //     for (const key in responseData) {
    //       if (responseData.hasOwnProperty(key)) {
    //         taskArray.push({ ...responseData[key], id: key });
    //       }
    //     }
    //     return taskArray;
    //   }),
    //   tap(tasks => {
    //     this.todoService.fetchTasks(tasks);
    //   })
    // );

    // this.httpClient.get<Todo[]>(
    //   'https://todo-app-95d91.firebaseio.com/tasks.json'
    // )
    //   .pipe(
    //     map(
    //       (responseData) => {
    //         const taskArray: Todo[] = [];
    //         for (const key in responseData) {
    //           if (responseData.hasOwnProperty(key)) {
    //             taskArray.push({ ...responseData[key], id: key });
    //           }
    //         }
    //         return taskArray;
    //       })
    //   ).subscribe(
    //     tasks => {
    //       this.todoService.fetchTasks(tasks);
    //     }
    //   );

    // Subscribing to user in service to check if user is authenticated or not
  }

}
