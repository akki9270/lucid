import { Component, OnInit, Input } from '@angular/core';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-admin-switch',
  template: `
  <div class="custom-control custom-switch">
    <input type="checkbox" (change)="onValueChange()" class="custom-control-input" id="customSwitch" [checked]="value.is_admin" />    
    <label class="custom-control-label" for="customSwitch">{{value.is_admin ? '': ''}}</label>
  </div>`,
  styles: []
})
export class AdminSwitchComponent implements OnInit {

  constructor(private restAPI: RestApiService) { }

  @Input() value = {};

  ngOnInit() { }

  onValueChange() {
    this.value['is_admin'] = !this.value['is_admin'];
    // this.restAPI
    // console.log('onValueChange: ',  this.value)
  }

}
