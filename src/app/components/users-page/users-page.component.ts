import { Component, OnInit } from '@angular/core';
import { LoginResponse } from 'src/app/models/login-response/login-response.module';
import { Users } from 'src/app/models/user/user.module';
import { AlertService } from 'src/app/services/alert.service';
import { PostLoginService } from 'src/app/services/post-login.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css'],
})
export class UsersPageComponent implements OnInit {
  users: Users[];
  isLoading = false;
  constructor(
    private postLoginService: PostLoginService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.postLoginService.getAllUsers().subscribe(
      (response) => {
        this.alertService.clear();
        this.users = response;
        this.isLoading = false;
      },
      (error) => {
        this.alertService.clear();
        this.alertService.error('error occurred while fetching all users');
      }
    );
  }
}
