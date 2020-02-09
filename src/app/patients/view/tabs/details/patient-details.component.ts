import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class PatientDetailsComponent implements OnInit {

  constructor() { }

  @Input('patientDetails') patientDetails
  ngOnInit() {
    // console.log('-----patientDetails: ', this.patientDetails)
  }

}
