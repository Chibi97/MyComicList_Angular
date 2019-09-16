import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminActivator {
    constructor(
      private router: Router,
      private auth: AuthService) {

    }
    canActivate() {
        if (!this.auth.isAdmin()) {
           this.router.navigate(['/']);
        }
        return this.auth.isAdmin();
    }
}
