import { Component, OnInit, Input } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-active-switch',
  template: `
  <div *ngIf="action == 'active'" class="custom-control custom-switch">
    <input type="checkbox" (change)="onValueChange()" class="custom-control-input" id="customSwitch{{user.user_id}}" [checked]="user.is_active" />
    <label class="custom-control-label" style="width: 55px;" for="customSwitch{{user.user_id}}">{{user.is_active ? 'Active' : 'InActive'}}</label>
  </div>
  <div *ngIf="action == 'admin'" class="custom-control custom-switch text-align-center">
    <input type="checkbox" (change)="onValueChange()" class="custom-control-input" id="customAdmin{{user.user_id}}" [checked]="user.is_admin" />
    <label class="custom-control-label" for="customAdmin{{user.user_id}}">{{user.is_admin ? '' : ''}}</label>
  </div>
  `,
  styles: []
})
export class ActiveSwitchComponent implements OnInit {
  user: any;
  action: any;

  constructor(private restApi: RestApiService, 
              private toasterService: ToasterService,
              private adminService: AdminService) { }

  @Input() value: any = {};

  ngOnInit() {
    this.user = this.value['data']
    this.action = this.value['action']
  }

  onValueChange() {    
    if (this.value && this.value.action && this.value.data && this.value.data.user_id) {
      let data = {}
      if (this.value.action === 'admin') {
        this.value.data['is_admin'] = !this.value.data['is_admin'];
        data = { 'user_id': this.value.data.user_id, is_admin: this.value.data.is_admin }
        this.adminService.updateConfirmDialogue(data);
        // this.updateIsAdminUser(data)
      } else {
        this.value.data['is_active'] = !this.value.data['is_active'];
        data = { 'user_id': this.value.data.user_id, is_active: this.value.data.is_active }
        this.adminService.updateConfirmDialogue(data);
        // this.updateIsActiveUser(data)
      }   
    }
  }
}
