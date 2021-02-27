import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/models/user/user.module';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { PostLoginService } from 'src/app/services/post-login.service';

@Component({
  selector: 'app-friends-page',
  templateUrl: './friends-page.component.html',
  styleUrls: ['./friends-page.component.css'],
})
export class FriendsPageComponent implements OnInit {
  friends: Users[];
  friendRequests: any[];
  filteredRequests: any[];
  allUsers: Users[];
  constructor(
    private postLoginService: PostLoginService,
    private alertService: AlertService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.postLoginService.getAllUsers().subscribe(
      (response) => {
        this.allUsers = response;
        this.postLoginService.getFriendsList().subscribe(
          (response) => {
            this.alertService.clear();
            this.friendRequests = response;
            this.filteredRequests = this.friendRequests.filter((req) => {
              return this.apiService.currentUserValue._id === req.userId;
            });
            this.friends = this.allUsers.filter((user) => {
              return this.filteredRequests.some((friend) => {
                return friend.friendId === user._id;
              });
            });
          },
          (error) => {
            this.alertService.clear();
            this.alertService.error('error occurred while fetching all users');
          }
        );
      },
      (error) => {
        console.error(error);
        this.alertService.error('unexpected error occurred');
      }
    );
  }
}
