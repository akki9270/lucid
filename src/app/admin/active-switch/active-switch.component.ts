import { Component, OnInit, Input } from '@angular/core';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-active-switch',
  template: `
  <div class="custom-control custom-switch">
    <input type="checkbox" (change)="onValueChange()" class="custom-control-input" id="customSwitch" [checked]="value.is_active" />
    <label class="custom-control-label" for="customSwitch">{{value.is_active ? 'Active': 'InActive'}}</label>
  </div>`,
  styles: []
})
export class ActiveSwitchComponent implements OnInit {

  constructor(private restAPI: RestApiService) { }

  @Input() value = {};

  ngOnInit() { }

  onValueChange() {
    this.value['is_active'] = !this.value['is_active'];
    // this.restAPI
  }
}
