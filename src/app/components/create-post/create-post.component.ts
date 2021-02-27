import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginResponse } from 'src/app/models/login-response/login-response.module';
import { NewPost } from 'src/app/models/posts/posts.model';
import { AlertService } from 'src/app/services/alert.service';
import { PostLoginService } from 'src/app/services/post-login.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  @Output() postSuccessEmitter = new EventEmitter();
  postDataObj: FormGroup;
  isSubmitted = false;
  currentUser: LoginResponse;
  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private postLoginService: PostLoginService
  ) {
    this.postDataObj = this.formBuilder.group({
      postData: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.currentUser = this.postLoginService.currentUser;
  }

  onSubmit(): void {
    this.alertService.clear();
    this.isSubmitted = true;
    if (!this.postDataObj.valid && this.postDataObj.invalid) {
      return;
    }
    const newPost = new NewPost(
      this.postDataObj.value.postData,
      this.currentUser._id,
      this.currentUser.firstName + ' ' + this.currentUser.lastName,
      this.currentUser.photoId,
      '',
      this.currentUser.isActive,
      this.currentUser.isAdmin,
      'Developer'
    );
    console.log(newPost);
    this.postLoginService.createPost(newPost).subscribe(
      () => {
        this.alertService.success('your post is successful');
        this.postSuccessEmitter.emit(Date.now());
        this.isSubmitted = false;
        newPost.post = '';
      },
      () => {
        this.alertService.error('error occured while trying to post');
      }
    );
  }
}
