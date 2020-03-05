import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/users';
import { TOKEN } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router
  ) {
    let hastoken = sessionStorage[TOKEN];
    this.loggedIn.next(!!hastoken);
  }

  setLogin() {
    // if (user.email !== '' && user.password !== '' ) {
      this.loggedIn.next(true);
      this.router.navigate(['/']);
    // }
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}