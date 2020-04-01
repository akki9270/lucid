import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { DatepickerRangePopupComponent } from "../../components/datepicker-range-popup/datepicker-range-popup.component";

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit, AfterViewInit {

  @ViewChild(DatepickerRangePopupComponent) child;

  constructor(private restAPI: RestApiService) { }

  ngOnInit() {

  }

  model: NgbDateStruct;

  urgent: number = 0;
  facilityDischarge: number = 0;
  escalations: number = 0;
  potentialMsoc: number = 0;
  callCount: number = 0;


  ngAfterViewInit() {
    console.log('------------ngAfterViewInit-------------')
    // console.log('---parent-fromDate: ', this.child.fromDate)
    // console.log('---parent-toDate: ', this.child.toDate)    
    if (this.child && this.child.fromDate && this.child.toDate) {
      console.log('---parent-fromDate: ', new Date(this.child.fromDate.year, this.child.fromDate.month, this.child.fromDate.day))
      console.log('---parent-toDate: ', new Date(this.child.toDate.year, this.child.toDate.month, this.child.toDate.day))
      const fromDate = new Date(this.child.fromDate.year, this.child.fromDate.month, this.child.fromDate.day)
      const toDate = new Date(this.child.toDate.year, this.child.toDate.month, this.child.toDate.day)
      this.getPatientsAnalytics(fromDate, toDate)
    }
  }

  receiveDates($event) {
    console.log('---receiveDates: ', $event)
    if ($event && $event.fromDate && $event.toDate) {
      const fromDate = new Date($event.fromDate.year, $event.fromDate.month, $event.fromDate.day)
      const toDate = new Date($event.toDate.year, $event.toDate.month, $event.toDate.day)
      this.getPatientsAnalytics(fromDate, toDate)
    }
  }

  getPatientsAnalytics(fromDate, toDate) {
    this.restAPI.getPatientsAnalyticsData(fromDate, toDate).subscribe(result => {
      console.log('Res---getPatientsAnalytics---result---: ', result)
    })
  }

}
