import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../models/login-response/login-response.module';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class PostLoginService {
  currentUser: LoginResponse;
  constructor(private httpClient: HttpClient, private apiService: ApiService) {
    this.getLoggedInUser();
  }

  getLoggedInUser(): void {
    this.apiService.currentUser.subscribe((loggedInUser) => {
      this.currentUser = loggedInUser;
    });
  }

  getImage(): Observable<any> {
    if (!this.currentUser) {
      this.getLoggedInUser();
    }
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.currentUser.token}`);
    console.log(headers);
    return this.httpClient
      .get(`${environment.apiUrl}/files/${this.currentUser.photoId}`, {
        headers,
        responseType: 'blob' as 'json',
      })
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
