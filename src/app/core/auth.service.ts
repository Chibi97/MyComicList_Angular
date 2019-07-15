import { Injectable } from '@angular/core';
import { ClientService } from '../api/client.service';
import { Credential, RegisterCredential } from '../types/credential';
import { JWT } from '../types/jwt';
import { User } from '../types/user';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User = null;

  constructor(private client: ClientService) { }

  login(creds: Credential): Observable<JWT> {
    return this.client
    .post<Credential, JWT>('auth/login', creds)
    .pipe(
      tap((r) => {
      const user = {token: r.message, ...creds};
      localStorage.setItem('user', JSON.stringify(user));
      this.sync();
    }));
  }

  register(creds: RegisterCredential): Observable<JWT> {
  return this.client
    .post<Credential, JWT>('auth/register', creds)
    .pipe(
      tap((r) => {
        this.user = { token: r.message, ...creds };
        localStorage.setItem('user', JSON.stringify(this.user));
      }));
  }

  isLogged() {
    return this.user !== null;
  }

  getUser() {
    return this.user;
  }

  logout() {
    localStorage.removeItem('user');
    this.user = null;
  }

  sync() {
    const storageUser = localStorage.getItem('user');
    if (storageUser) {
      this.user = JSON.parse(storageUser);
      this.client.setAuthorizationHeader(this.user.token);
    }
  }
}
