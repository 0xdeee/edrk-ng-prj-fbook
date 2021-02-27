import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../models/login-response/login-response.module';
import { NewPost, Post } from '../models/posts/posts.model';
import { Users } from '../models/user/user.module';
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

  getImage(photoId: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.currentUser.token}`);
    // console.log(headers);
    return this.httpClient
      .get(`${environment.apiUrl}/files/${photoId}`, {
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

  getPosts(): Observable<Post[]> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.currentUser.token}`);
    // console.log(headers);
    return this.httpClient
      .get<Post[]>(`${environment.apiUrl}/posts/`, { headers })
      .pipe(
        map((response) => {
          console.log(response);
          return response;
        }),
        catchError((error) => {
          console.log(error);
          return throwError(error);
        })
      );
  }

  createPost(newPost: NewPost): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.currentUser.token}`);
    return this.httpClient
      .post(`${environment.apiUrl}/posts/createpost`, newPost, { headers })
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

  getAllUsers(): Observable<Users[]> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.currentUser.token}`);
    return this.httpClient
      .get<Users[]>(`${environment.apiUrl}/users/`, { headers })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          console.log(error);
          return throwError(error);
        })
      );
  }
}
