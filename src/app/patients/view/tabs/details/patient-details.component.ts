import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Patient } from 'src/app/models/patient';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class PatientDetailsComponent implements OnInit {

  constructor(
    private activeRoute: ActivatedRoute,
    public restApi: RestApiService
  ) { }

  @Input('patientDetails') patientDetails: Patient
  ngOnInit() {
    console.log('-----patientDetails: ', this.patientDetails);
    this.activeRoute.paramMap.subscribe(data => {
      console.log(' pramas ', data['params']);
      let patientId = data.get('patientId');
      if (patientId && !Object.keys(this.patientDetails).length) {
        this.getPatientDetails(data.get('patientId'));
      }
    })
  }

  getPatientDetails(patientId) {
    this.restApi.getPatients(patientId)
    .subscribe(data => {
      if (data && data['length']) {
        this.patientDetails = data[0];
      }
    });
  }

  trackByFn(index, item) {
    return item.id;
  }

}
