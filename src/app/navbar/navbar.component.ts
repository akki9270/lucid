import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../shared/storage.service';
import { USER, TOKEN } from '../constants';
import { User } from '../models/users';
import { AuthService } from '../auth/auth.service';
import { ToasterService } from 'angular2-toaster';
import { RestApiService } from "../shared/rest-api.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: any;
  isLoggedIn: boolean;
  isError: boolean;
  newUser: any = {};
  errorMessage: string = '';

  constructor(private storageService: StorageService,
    private toasterService: ToasterService,
    private modalService: NgbModal,
    private restApi: RestApiService,
    private authService: AuthService) {
    // console.log('--load Navbar: ')
  }

  modalOption: NgbModalOptions = {
    backdrop: true,
    size: 'lg'
  }

  profileModalRef: NgbModalRef;

  ngOnInit() {
    let user = sessionStorage[USER];
    this.user = user ? JSON.parse(user) : {};
    this.storageService.getUserData().subscribe((user: User) => {
      this.user = user;
      console.log('User: ', user)
    });
    this.authService.isLoggedIn.subscribe(
      isLoggedIn => {
        this.isLoggedIn = isLoggedIn;
      }
    )
  }

  signOut() {
    this.restApi.logout().subscribe((result: any) => {
      sessionStorage.clear();
      this.authService.logout();
      // console.log('=----Result: ', result)
    })
  }

  openProfile(profileModal) {
    this.profileModalRef = this.modalService.open(profileModal, Object.assign({...this.modalOption},
       {keyboard: false, backdrop: 'static', centered: true, size: ''}));
  }

  closeProfileModal(){
    this.profileModalRef.close();
  }

  updateProfile() {
    // console.log('new user: ', this.newUser);    
    let { first_name, last_name, password, newPassword, confPassword } = this.newUser;
    let data = {};
    if (password) {
      if (newPassword !== confPassword) {
        this.isError = true;
        this.errorMessage = 'Password and Retype Password Must Match';
        return;
      } else {
        this.isError = false;
        data = { ...data, password, newPassword };
      }
    } else if (!password) {
      if (newPassword || confPassword) {
        this.isError = true;
        this.errorMessage = 'Must Type Current Password';
        return;
      }
    }

    if (first_name) {
      data = { ...data, first_name };
    }
    if (last_name) {
      data = { ...data, last_name };
    }
    if (!first_name && !last_name && !password) {
      return this.toasterService.pop('info', 'Please fill the field you want to update.');;
    }
    data = {
      ...data, is_admin: this.user.is_admin,
      id: this.user.id, user: this.user
    };
    // console.log('Data: ', data);
    this.updateUserProfile(data);
  }

  updateUserProfile(userData) {
    this.restApi.updateUser(userData).subscribe(result => {
      console.log('result ', result);
      this.newUser = {};
      this.isError = false;
      // delete result.user;
      // this.user = {...this.user, ...result};
      // sessionStorage.setItem('user', JSON.stringify(this.user));
      this.closeProfileModal()
      this.toasterService.pop('success', 'Profile update successfully');
    })
  }
}
