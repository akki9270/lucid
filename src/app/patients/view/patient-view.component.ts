import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { PATIENT_TAB } from '../../constants'
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-patient-view',
  templateUrl: './patient-view.component.html',
  styleUrls: ['./patient-view.component.css']
})
export class PatientViewComponent implements OnInit {
  currentTab = PATIENT_TAB
  patientDetails: any;
  patientId: string;
  constructor(
    private location: Location, 
    private router: Router,
    private activeRoute: ActivatedRoute,
    private restApi: RestApiService
    ) { }

  ngOnInit() {
    this.currentTab = PATIENT_TAB;
    this.activeRoute.paramMap.subscribe(data => {
      let patientId = data.get('patientId');
      if (patientId) {
        this.patientId = patientId;
        this.getPatientDetails(this.patientId);
      }
    })
    if (this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras) {
      this.patientDetails = this.router.getCurrentNavigation().extras.state;
    } else if (history.state && history.state.patientDetails) {
      this.patientDetails = history.state.patientDetails;
    }
  }

  getPatientDetails(patientId) {
    this.restApi.getPatients(patientId)
    .subscribe(data => {
      if (data && data['length']) {
        this.patientDetails = data[0];
      }
    });
  }

  onSelectTab(event, tab) {
    this.currentTab = tab;
    // console.log('---tab: ', this.currentTab)
  }

  onBackClicked() {
    this.location.back();
  }

}
