import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/models/user/user.module';
import { AlertService } from 'src/app/services/alert.service';
import { PostLoginService } from 'src/app/services/post-login.service';

@Component({
  selector: 'app-network-page',
  templateUrl: './network-page.component.html',
  styleUrls: ['./network-page.component.css'],
})
export class NetworkPageComponent implements OnInit {
  users: Users[];
  constructor(
    private postLoginService: PostLoginService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.postLoginService.getAllUsers().subscribe(
      (response) => {
        this.alertService.clear();
        this.users = response;
      },
      (error) => {
        this.alertService.clear();
        this.alertService.error('error occurred while fetching all users');
      }
    );
  }
}
