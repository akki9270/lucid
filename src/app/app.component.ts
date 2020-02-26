import { Component } from '@angular/core';

import { NgxUiLoaderServices } from './ngx-ui-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'lucid';
  constructor(public demoService: NgxUiLoaderServices) {
  }
}