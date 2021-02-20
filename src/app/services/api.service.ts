import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/user/user.module';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

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
}
