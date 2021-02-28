import { Component, OnInit } from '@angular/core';
import { FriendRequest, User, Users } from 'src/app/models/user/user.module';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { PostLoginService } from 'src/app/services/post-login.service';

@Component({
  selector: 'app-network-page',
  templateUrl: './network-page.component.html',
  styleUrls: ['./network-page.component.css'],
})
export class NetworkPageComponent implements OnInit {
  users: Users[];
  isLoading = false;
  constructor(
    private postLoginService: PostLoginService,
    private alertService: AlertService,
    private apiService: ApiService
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

  createFriendRequest(user: Users): void {
    const friendRequest = new FriendRequest();
    friendRequest.userId = this.apiService.currentUserValue._id;
    friendRequest.friendId = user._id;
    friendRequest.status = 'Request Pending';
    this.postLoginService.createFriendRequest(friendRequest).subscribe(
      (response) => {
        console.log('friend request create successfully');
        this.alertService.success(
          `Friend request was sent to ${user.email} successfully`
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
