import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  lastAddedPost: number;
  constructor() {}

  ngOnInit(): void {}

  newPostAdded(event): void {
    this.lastAddedPost = event;
  }
}
