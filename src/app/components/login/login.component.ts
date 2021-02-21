import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginFormObj: FormGroup;
  loginFormData: any;
  isSubmitted = false;
  loading = false;
  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private router: Router,
    private apiService: ApiService
  ) {
    this.loginFormObj = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  get f(): any {
    return this.loginFormObj.controls;
  }

  onSubmit(): void {
    this.alertService.clear();
    this.isSubmitted = true;
    if (!this.loginFormObj.valid && this.loginFormObj.invalid) {
      this.alertService.error('form data is invalid/empty', false);
      return;
    }
    this.loading = true;
    this.loginFormData = this.loginFormObj.value;
    console.table(this.loginFormData);
    this.apiService
      .login(this.loginFormData)
      .pipe(first())
      .subscribe(
        (response) => {
          console.table(response);
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error(error);
          this.alertService.error(error.error.message);
          this.loading = false;
        }
      );
  }

  forgotPassword(): void {
    this.loginFormObj.reset();
    this.router.navigate(['/passwordreset']);
  }
}
