import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { RestApiService } from 'src/app/shared/rest-api.service';
// import { USER } from '../../constants';

@Component({
  selector: 'days-to-soc',
  template: `
  <div id="daysToSoc{{patient.patient_id}}">
    <div style="min-width: 162px; min-height: 30px; line-height: 24px; background-color: red">    
      {{patient.patient_id}}
    </div>
  </div>`,
  styles: []
})
export class DaysToSocComponent implements OnInit {  
  patient: any;

  constructor(private restApi: RestApiService, private toasterService: ToasterService) { }

  @Input() value: any = {};
 
  ngOnInit() {
      console.log('this.value: ', this.value)
    this.patient = this.value['data']
  }
}