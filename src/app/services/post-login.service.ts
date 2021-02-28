import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../models/login-response/login-response.module';
import { NewPost, Post } from '../models/posts/posts.model';
import { FriendRequest, Users } from '../models/user/user.module';
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

  getHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.currentUser.token}`);
  }

  getImage(photoId: string): Observable<any> {
    const headers = this.getHeaders();
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
    const headers = this.getHeaders();
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
    const headers = this.getHeaders();
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
    const headers = this.getHeaders();
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

  createFriendRequest(friendRequest: FriendRequest): Observable<any> {
    const headers = this.getHeaders();
    return this.httpClient
      .post(`${environment.apiUrl}/friends/createrequest`, friendRequest, {
        headers,
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

  getFriendsList(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.httpClient
      .get<any[]>(`${environment.apiUrl}/friends/`, { headers })
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

  getUserSpecificPosts(id: string): Observable<any[]> {
    const headers = this.getHeaders();
    return this.httpClient
      .post<any[]>(
        `${environment.apiUrl}/posts/findpostbyuserid`,
        { id },
        { headers }
      )
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
