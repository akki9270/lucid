import { Component, OnInit } from '@angular/core';
import { StorageService } from '../shared/storage.service';
import { USER, TOKEN } from '../constants';
import { User } from '../models/users';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: any;
  isLoggedIn: boolean;

  constructor(private storageService: StorageService,
       private authService: AuthService) {
    // console.log('--load Navbar: ')
  }

  ngOnInit() {
    let user = sessionStorage[USER];
    this.user = user ? JSON.parse(user) : {};
    this.storageService.getUserData().subscribe((user: User) => {
      this.user = user;
    });
    this.authService.isLoggedIn.subscribe(
      isLoggedIn => {
        this.isLoggedIn = isLoggedIn;
      }
    )
  }

  signOut() {
    sessionStorage.clear();
    this.authService.logout();
  }
}
