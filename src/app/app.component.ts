import { Component } from '@angular/core';
import { LocalStorageService } from '../services/LocalStorageService';
import { NgxUiLoaderServices } from './ngx-ui-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'lucid';
  constructor(public demoService: NgxUiLoaderServices, private localStorageService: LocalStorageService) {
  }
  
  ngOnInit(): void {
    console.log('appcomponent init: ', this.localStorageService.getUserData());
  }
}