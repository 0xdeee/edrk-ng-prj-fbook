import { Component, OnInit } from '@angular/core';
import { LoginResponse } from 'src/app/models/login-response/login-response.module';
import { ApiService } from 'src/app/services/api.service';
import { PostLoginService } from 'src/app/services/post-login.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent implements OnInit {
  imageBlobUrl: any;
  currentUser: LoginResponse;
  isImageLoaded = false;
  userPosts: number;
  NewtworkCount: number;
  constructor(
    private postLoginService: PostLoginService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.isImageLoaded = false;
    this.getLoggedInUser();
    this.postLoginService.getImage(this.currentUser.photoId).subscribe(
      (response) => {
        console.log(response);
        this.createImageFromBlob(response);
      },
      (error) => {
        console.error(error);
      }
    );
    this.postLoginService
      .getUserSpecificPosts(this.currentUser._id)
      .subscribe((response) => {
        this.userPosts = response.length;
      });

    this.postLoginService.getAllUsers().subscribe(
      (allUsers) => {
        this.postLoginService.getFriendsList().subscribe(
          (allFriends) => {
            const filteredRequests = allFriends.filter((req) => {
              return this.apiService.currentUserValue._id === req.userId;
            });
            this.NewtworkCount = allUsers.filter((user) => {
              return filteredRequests.some((friend) => {
                return friend.friendId === user._id;
              });
            }).length;
          },
          (error) => {}
        );
      },
      (error) => {}
    );
  }

  getLoggedInUser(): void {
    this.apiService.currentUser.subscribe((loggedInUser) => {
      this.currentUser = loggedInUser;
    });
  }

  createImageFromBlob(image: Blob): void {
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.imageBlobUrl = reader.result;
      },
      false
    );
    this.isImageLoaded = true;
    if (image) {
      reader.readAsDataURL(image);
    }
  }
}
