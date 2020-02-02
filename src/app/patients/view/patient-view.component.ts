import { Component, OnInit } from '@angular/core';
import { PATIENT_TAB } from '../../constants'
@Component({
  selector: 'app-patient-view',
  templateUrl: './patient-view.component.html',
  styleUrls: ['./patient-view.component.css']
})
export class PatientViewComponent implements OnInit {
  currentTab = PATIENT_TAB
  constructor() { }

  ngOnInit() {
    this.currentTab = PATIENT_TAB
  }

  onSelectTab(event, tab){
    this.currentTab = tab
    // console.log('---tab: ', this.currentTab)
  }

}
