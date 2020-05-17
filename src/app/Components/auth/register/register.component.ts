import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  isLoading = false;
  error: string = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(5)]]
    });
  }

  register() {

    if (!this.registerForm.valid) {
      return;
    }
    this.isLoading = true;
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;

    this.authService.register(email, password).subscribe(
      res => {
        this.isLoading = false;
        this.router.navigate(['./home']);
      },
      errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      });
  }
}
