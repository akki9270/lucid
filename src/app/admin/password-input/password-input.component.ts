import { Component, OnInit, Input } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { USER } from '../../constants';

@Component({
  selector: 'app-password-input',
  template: `
  <div (dblclick)="showHidePasswordInput()" id="passwordContainer{{user.user_id}}">
    <div style="min-width: 162px; min-height: 30px; line-height: 24px">    
      <input type="text" id="passsword{{user.user_id}}" *ngIf="showPasswordInput" [(ngModel)]="password" (change)="onValueChange()">
    </div>
  </div>`,
  styles: []
})
export class PasswordInputComponent implements OnInit {
  showPasswordInput: boolean = false;
  user: any;
  password: any;

  constructor(private restApi: RestApiService, private toasterService: ToasterService) { }

  @Input() value: any = {};

  ngOnInit() {
    this.user = this.value['data']
  }

  showHidePasswordInput() {
    // console.log('showHidePasswordInput: ', this.user)
    this.password = undefined
    this.showPasswordInput = !this.showPasswordInput
    // console.log('showPasswordInput: ', this.showPasswordInput)    
  }

  onValueChange() {    
    // console.log('onValueChange: ', this.password)
    // console.log('onValueChange: ', this.value)
    this.showPasswordInput = !this.showPasswordInput
    if(this.value && this.password && this.value.data && this.value.data.user_id){
      this.updateUserPassword(this.value.data.user_id, this.password)
    }
  }

  updateUserPassword(userId, password) {
    const user = sessionStorage[USER];
    const obj = { id: userId, password: password , user: JSON.parse(user)};
    this.restApi.updateUser(obj).subscribe(result => {
      // console.log('result ', result);
      this.toasterService.pop('success', 'Password update successfully');
    })
  }

}
