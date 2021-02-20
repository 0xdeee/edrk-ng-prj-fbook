import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-main-nav-bar',
  templateUrl: './main-nav-bar.component.html',
  styleUrls: ['./main-nav-bar.component.css'],
})
export class MainNavBarComponent implements OnInit {
  @Input() isLoggedIn: boolean;
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {}

  logout(): void {
    this.apiService.logout();
  }
}
