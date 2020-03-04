import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userId = '';
  userPassword = '';
  loginErrorMessage = '';

  constructor() { }

  ngOnInit() {
  }

  login(){
    console.log('Login Data: ', this.userId, this.userPassword)
  }

}
