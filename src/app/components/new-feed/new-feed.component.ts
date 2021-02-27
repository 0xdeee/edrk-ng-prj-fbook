import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { LoginResponse } from 'src/app/models/login-response/login-response.module';
import { Post } from 'src/app/models/posts/posts.model';
import { ApiService } from 'src/app/services/api.service';
import { PostLoginService } from 'src/app/services/post-login.service';

@Component({
  selector: 'app-new-feed',
  templateUrl: './new-feed.component.html',
  styleUrls: ['./new-feed.component.css'],
})
export class NewFeedComponent implements OnInit, OnChanges {
  @Input() newPostAdded;
  posts: Post[];
  currentUser: LoginResponse;
  constructor(
    private postLoginService: PostLoginService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.refreshNewFeed();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.refreshNewFeed();
  }

  refreshNewFeed(): void {
    this.postLoginService.getPosts().subscribe(
      (response) => {
        // console.log(response);
        response.sort((a: any, b: any) => {
          return (
            new Date(b.createdDate).getTime() -
            new Date(a.createdDate).getTime()
          );
        });
        this.posts = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getDiff(createdOn: string): string {
    const createdDate = new Date(createdOn);
    const now = new Date();
    const diff = now.getTime() - createdDate.getTime();
    let timeElapsed = Math.round(diff / (1000 * 60));
    if (timeElapsed < 60) {
      return timeElapsed === 1
        ? `${timeElapsed.toString()} minute`
        : `${timeElapsed.toString()} minutes`;
    } else if (timeElapsed > 60 && timeElapsed < 24 * 60) {
      timeElapsed = Math.round(timeElapsed / 60);
      return timeElapsed === 1
        ? `${timeElapsed.toString()} hour`
        : `${timeElapsed.toString()} hours`;
    } else {
      timeElapsed = Math.round(timeElapsed / (60 * 24));
      return timeElapsed === 1
        ? `${timeElapsed.toString()} day`
        : `${timeElapsed.toString()} days`;
    }
  }
}
