import { Component } from '@angular/core';
import { LoginResponse } from './models/login-response/login-response.module';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'edrk-ng-prj-fbook';
  currentUser: LoginResponse;
  isLoggedIn = false;

  constructor(private apiService: ApiService) {
    this.apiService.currentUser.subscribe((loggedInUser) => {
      this.currentUser = loggedInUser;
      if (this.currentUser) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }
}
