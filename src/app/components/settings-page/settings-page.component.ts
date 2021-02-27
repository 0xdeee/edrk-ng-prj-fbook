import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { LoginResponse } from 'src/app/models/login-response/login-response.module';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css'],
})
export class SettingsPageComponent implements OnInit {
  updateProfileObj: FormGroup;
  isSubmitted = false;
  loading = false;
  isPasswordChange = false;
  currentUser: LoginResponse;
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private alertService: AlertService
  ) {
    this.apiService.currentUser.subscribe((response) => {
      this.currentUser = response;
      this.updateProfileObj = this.formBuilder.group({
        firstName: [this.u.firstName, Validators.required],
        lastName: [this.u.lastName, Validators.required],
        email: [this.u.email, [Validators.required, Validators.email]],
        dob: [new Date(this.u.dob), Validators.required],
        gender: [this.u.gender, Validators.required],
      });
    });
  }

  get f(): any {
    return this.updateProfileObj.controls;
  }
  get u(): any {
    return this.currentUser
      ? this.currentUser
      : { firstName: '', lastName: '', email: '', dob: '', gender: '' };
  }
  ngOnInit(): void {}

  onSubmit(): void {
    this.isSubmitted = true;
    const formData = this.updateProfileObj.value;
    console.log(formData);
    if (!this.updateProfileObj.valid && this.updateProfileObj.invalid) {
      this.alertService.error('form data is invalid/empty', false);
      return;
    }
    const updatedProfile = {};
    for (const key in formData) {
      if (key === 'dob') {
        if (
          new Date(formData.dob).getTime() !== new Date(this.u.dob).getTime()
        ) {
          updatedProfile[key] = formData[key];
        }
      } else if (formData[key].toString() !== this.u[key].toString()) {
        updatedProfile[key] = formData[key];
      }
    }
    console.log(updatedProfile);
    this.apiService
      .updateUserDetails(this.u._id, updatedProfile)
      .pipe(first())
      .subscribe(
        () => {
          this.alertService.clear();
          this.alertService.success('details updated successfully');
        },
        () => {
          this.alertService.clear();
          this.alertService.error('error occurred while updating user profile');
        }
      );
  }
  goToPasswordReset(): void {
    this.router.navigate(['/passwordreset']);
  }
}
