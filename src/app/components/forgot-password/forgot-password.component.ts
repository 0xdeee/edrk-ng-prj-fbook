import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmPasswordValidator } from 'src/app/services/confirm-password.validator';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  passwordResetValidateObj: FormGroup;
  passwordResetNewPasswordObj: FormGroup;
  fetchedUser: any;
  isValidated = false;
  isSubmitted = false;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private apiService: ApiService,
    private router: Router
  ) {
    this.passwordResetValidateObj = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
    });
    this.passwordResetNewPasswordObj = this.formBuilder.group(
      {
        password: ['', [Validators.required, Validators.minLength(5)]],
        passwordConfirm: ['', Validators.required],
      },
      {
        validator: ConfirmPasswordValidator.MatchPassword,
      }
    );
  }

  get f(): any {
    return this.passwordResetValidateObj.controls;
  }

  get r(): any {
    return this.passwordResetNewPasswordObj.controls;
  }

  ngOnInit(): void {
    this.apiService.currentUser.subscribe((response) => {
      this.isValidated = response ? true : false;
      this.fetchedUser = response;
    });
  }

  onSubmitValidate(): void {
    this.alertService.clear();
    this.isSubmitted = true;
    if (
      !this.passwordResetValidateObj.valid &&
      this.passwordResetValidateObj.invalid
    ) {
      this.alertService.error('form data is invalid/empty', false);
      return;
    }
    this.loading = true;
    console.table(this.passwordResetValidateObj.value);
    const validationRequest = {
      email: this.passwordResetValidateObj.value.email,
    };
    this.apiService
      .resetPasswordValidate(validationRequest)
      .pipe(first())
      .subscribe((response) => {
        console.table(response);
        if (
          response[0] &&
          response[0].dob.slice(0, 10) ===
            this.passwordResetValidateObj.value.dob
        ) {
          this.fetchedUser = response[0];
          console.log(this.fetchedUser);
          this.isValidated = true;
          this.isSubmitted = false;
          this.loading = false;
        } else {
          this.alertService.clear();
          this.alertService.error('email or dob is incorrect');
          this.loading = false;
        }
      });
  }

  onSubmitReset(): void {
    this.alertService.clear();
    this.isSubmitted = true;
    if (
      !this.passwordResetNewPasswordObj.valid &&
      this.passwordResetNewPasswordObj.invalid
    ) {
      this.alertService.error('form data is invalid/empty', false);
      return;
    }
    this.loading = true;
    console.table(this.passwordResetNewPasswordObj.value);
    const passwordResetRequest = {
      password: this.passwordResetNewPasswordObj.value.password,
    };
    this.apiService
      .updateUserDetails(this.fetchedUser._id, passwordResetRequest)
      .pipe(first())
      .subscribe(
        (response) => {
          console.log(response);
          this.alertService.clear();
          this.alertService.success(
            'you have successfully reset the password',
            true
          );
          if (this.apiService.currentUserValue) {
            this.apiService.logout();
          }
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error(error);
          this.alertService.clear();
          this.alertService.error('password reset was not successful');
        }
      );
  }
}
