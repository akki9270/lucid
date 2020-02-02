import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-accordion',
  templateUrl: './service-accordion.component.html',
  styleUrls: ['./service-accordion.component.css']
})
export class ServiceAccordionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('Loade service accord')
  }

}
