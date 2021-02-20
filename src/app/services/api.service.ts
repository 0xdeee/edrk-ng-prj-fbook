import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoginResponse } from '../models/login-response/login-response.module';
import { User } from '../models/user/user.module';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private currentUserSubject: BehaviorSubject<LoginResponse>;
  public currentUser: Observable<LoginResponse>;
  constructor(private httpClient: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<LoginResponse>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): LoginResponse {
    return this.currentUserSubject.value;
  }

  register(newUser: User): Observable<any> {
    console.table(newUser);
    return this.httpClient
      .post(`${environment.apiUrl}/users/register`, newUser)
      .pipe(
        map((response) => {
          console.log(response);
          return response;
        }),
        catchError((error) => {
          console.error(error);
          return throwError(error);
        })
      );
  }

  login(loginForm: any): Observable<any> {
    return this.httpClient
      .post<LoginResponse>(
        `${environment.apiUrl}/users/authenticate`,
        loginForm
      )
      .pipe(
        map((response) => {
          console.table(response);
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currentUserSubject.next(response);
          return response;
        }),
        catchError((error) => {
          console.error(error);
          return throwError(error);
        })
      );
  }

  logout(): void {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    console.log('user logged out');
    this.router.navigate(['/login']);
  }
}
