import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-service-accordion',
  templateUrl: './service-accordion.component.html',
  styleUrls: ['./service-accordion.component.css']
})
export class ServiceAccordionComponent implements OnInit {

  constructor() { }

  @Input('serviceDetails') serviceDetails
  ngOnInit() {
    // console.log('Loade service accord: ', this.serviceDetails)
  }

}
