import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { NetworkPageComponent } from './components/network-page/network-page.component';
import { FriendsPageComponent } from './components/friends-page/friends-page.component';
import { SettingsPageComponent } from './components/settings-page/settings-page.component';
import { UsersPageComponent } from './components/users-page/users-page.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterUserComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'passwordreset',
    component: ForgotPasswordComponent,
  },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    component: UsersPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'network',
    component: NetworkPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'friends',
    component: FriendsPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'settings',
    component: SettingsPageComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
