import { Component, OnInit } from '@angular/core';
import { PostLoginService } from 'src/app/services/post-login.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent implements OnInit {
  imageBlobUrl: any;
  constructor(private postLoginService: PostLoginService) {}

  ngOnInit(): void {
    this.postLoginService.getImage().subscribe(
      (response) => {
        console.log(response);
        this.createImageFromBlob(response);
      },
      (error) => {
        console.error(error);
      }
    );
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

    if (image) {
      reader.readAsDataURL(image);
    }
  }
}
