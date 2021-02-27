import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainNavBarComponent } from './components/main-nav-bar/main-nav-bar.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AlertComponent } from './components/alert/alert.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { NewFeedComponent } from './components/new-feed/new-feed.component';
import { PostSortPipe } from './pipes/post-sort.pipe';
import { NetworkPageComponent } from './components/network-page/network-page.component';
import { FriendsPageComponent } from './components/friends-page/friends-page.component';
import { SettingsPageComponent } from './components/settings-page/settings-page.component';
import { UsersPageComponent } from './components/users-page/users-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavBarComponent,
    HomePageComponent,
    RegisterUserComponent,
    AlertComponent,
    LoginComponent,
    ForgotPasswordComponent,
    UserCardComponent,
    CreatePostComponent,
    NewFeedComponent,
    PostSortPipe,
    NetworkPageComponent,
    FriendsPageComponent,
    SettingsPageComponent,
    UsersPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
