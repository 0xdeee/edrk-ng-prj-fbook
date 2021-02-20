import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/user/user.module';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
})
export class RegisterUserComponent implements OnInit {
  registerFormObj: FormGroup;
  registerFormData: User;
  isSubmitted = false;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerFormObj = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  get f(): any {
    return this.registerFormObj.controls;
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (!this.registerFormObj.valid && this.registerFormObj.invalid) {
      this.alertService.error('form data is invalid/empty', false);
      return;
    }
    this.loading = true;
    this.registerFormData = this.registerFormObj.value;
    console.table(this.registerFormData);
    this.apiService
      .register(this.registerFormData)
      .pipe(first())
      .subscribe(
        (response) => {
          console.log('registration successful');
          this.alertService.success(response.message, true);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error(error);
          this.alertService.error(error.error.message);
          this.loading = false;
        }
      );
  }

  onClear(): void {
    this.isSubmitted = false;
    this.alertService.clear();
    this.loading = false;
    this.registerFormObj.reset();
  }
}
