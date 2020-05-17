import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null);
  token: string = null;
  tokenExpTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  register(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAAL4e7AnNKjvwb52kcfDhFTyoGCFZ7Rv8',
      {
        email,
        password,
        returnSecureToken: true
      })
      .pipe(
        catchError(this.handleError),
        tap(responseData => {
          this.handleAuthentication(
            responseData['success'].email,
            responseData['success'].idToken,
            responseData['success'].expires_at
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        environment.apiUrl + 'login',
        {
          email,
          password
        })
      .pipe(
        catchError(this.handleError),
        tap(responseData => {
          this.token = responseData['success'].token;
          this.handleAuthentication(
            responseData['success'].email,
            responseData['success'].token,
            responseData['success'].expires_at
          );
        })
      );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');

    if (this.tokenExpTimer) {
      clearTimeout(this.tokenExpTimer);
    }

    this.tokenExpTimer = null;
  }

  autoLogout(expirationTime) {
    this.tokenExpTimer = setTimeout(() => {
      this.logout()
    }, expirationTime);
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email, userData.token, userData.expiresAt
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expireDuration = userData.expires_at - new Date().getTime();
      this.autoLogout(expireDuration);
    }
  }

  private handleAuthentication(email: string, token: string, expiresIn) {
    expiresIn = new Date(expiresIn);
    let expireDuration = new Date(expiresIn).getTime() - new Date().getTime();
    const user = new User(
      email,
      token,
      expiresIn.getTime()
    );
    this.user.next(user);
    this.autoLogout(expireDuration)
    localStorage.setItem('userData', JSON.stringify(user));
  }


  private handleError(errRes: HttpErrorResponse) {

    let errorMessage = 'An unknown error occoured.';

    if (!errRes.error || !errRes.error.error) {
      return throwError(errorMessage);
    }

    switch (errRes.error.error.message) {
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email is not registered';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Entered password is invalid';
        break;
      case 'EMAIL_EXISTS':
        errorMessage = 'This email alreay exists';
        break;
    }

    return throwError(errorMessage);
  }
}
