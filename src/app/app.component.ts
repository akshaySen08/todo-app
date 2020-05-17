import { Component, OnInit } from '@angular/core';
import { AuthService } from './Components/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'to-do-app';

  constructor(private authService:AuthService){

  }

  ngOnInit(){
    this.authService.autoLogin()
  }
}
