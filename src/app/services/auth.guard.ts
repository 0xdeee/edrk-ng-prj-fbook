import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AlertService } from './alert.service';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private apiService: ApiService,
    private alertService: AlertService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const currentUser = this.apiService.currentUserValue;

    if (currentUser) {
      // authorised so return true
      return true;
    }
    // not logged in so redirect to login page
    this.alertService.error('Please login first', true);
    this.router.navigate(['/login']);
    return false;
  }
}
