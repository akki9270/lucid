import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { LoginService } from './login.service';
import { TOKEN, USER } from '../constants';
import { StorageService } from '../shared/storage.service';
import { ToasterService } from 'angular2-toaster';

// import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  loginErrorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private loginService: LoginService,
    private storageService: StorageService,
    private toasterService: ToasterService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    let data = this.loginForm.value;
    this.loginService.login(data.username,data.password)
    .subscribe(result => {
      if (result && result['token']) {
        sessionStorage[TOKEN] = result['token'];
        sessionStorage[USER] = JSON.stringify(result['user']);
        this.storageService.setUserData(result['user']);
        let userName = result['user'].first_name + ' ' + result['user'].last_name
        this.toasterService.pop('success','WelCome ' + userName);
        this.authService.setLogin();
      }
    });
    // console.log('Login Data: ')
  }

}
