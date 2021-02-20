import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class LoginResponse {
  isAdmin: boolean;
  isActive: boolean;
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: Date;
  gender: string;
  photoId: string;
  createdDate: Date;
  __v: number;
  token: string;
}
