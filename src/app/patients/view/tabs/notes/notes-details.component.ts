import { Component, OnInit, Input } from '@angular/core';
// import * as data from '../timeline/event.json'
import _ from 'underscore';
import * as uuid from 'uuid';
import { HighlightSearch, SafeHtmlPipe } from 'src/CustomPipes/HighlightSearch/HighlightSearch.js';
import { RestApiService } from 'src/app/shared/rest-api.service.js';
import { Tag } from '../../../../models/tag'
import { Patient } from 'src/app/models/patient';

@Component({
  selector: 'app-notes-details',
  templateUrl: './notes-details.component.html',
  styleUrls: ['./notes-details.component.css'],
  providers: [HighlightSearch, SafeHtmlPipe]
})
export class NotesDetailsComponent implements OnInit {

  title = 'app';

  patientEvents: any  // = (data as any).default;
  tags: []
  htmlContent = null
  search = ''
  @Input('patientDetails') patientDetails: Patient;
  constructor(public highlightText: HighlightSearch,
     public safeHtml: SafeHtmlPipe, public restApi: RestApiService) { }

  ngOnInit() {
    this.getTags()
    this.getInitNotes();
  }

  getTags() {
    this.restApi.getTags().subscribe((data: any) => {
      this.tags = data
      console.log('--Tag data: ', this.tags)
    });
  }

  getInitNotes() {
    let patientId = this.patientDetails.patient_id;
    let intakeId = this.patientDetails.intake_id;
    this.restApi.getTimeline(patientId, intakeId).subscribe((result: any) => {
      // this.tags = data
      console.log('--Notes data: ', result)
      result.forEach(element => {
        element.datetime = new Date(element.datetime);
        element.groupDate = this.getDate(element.datetime);
        element.event_id = element.id;
      });
      let groupedData = _.groupBy(result, 'groupDate');
      console.log('groupedData ', groupedData);
      let eventsData = [];
      for (let d in groupedData) {
        let obj = {
          ...groupedData[d][0],
          data: groupedData[d]
        }
        eventsData.push(obj);
      }
      eventsData.forEach(eve => {
        eve.data.forEach(subEve => {
          subEve.event_id = uuid.v4()
        });
      });
      this.patientEvents = eventsData; 
    // });


    let htmlContent = ''
    for (let i = 0; i < this.patientEvents.length; i++) {
      htmlContent += `<div class="my-2" id="${this.patientEvents[i].event_id}">
        <div>
          <p class="m-0"><b>Event: </b><b><u>${this.patientEvents[i].event_name}</u></b></p>        
        </div>`
      for (let j = 0; j < this.patientEvents[i].data.length; j++) {
        if (this.patientEvents[i].data[j].event_name === 'Be sure to staff') {
          htmlContent += `<div class="my-1" id="${this.patientEvents[i].data[j].event_id}">        
        <p class="m-0"><b style="color: #007bff;">${this.patientEvents[i].data[j].event_name}</b></p>     
        <p>THE ABOVE Alt Start Of Care REQUEST WAS ROUTED TO THE HIT QUEUE WITH A ROUTE REASON OF Portal -
            Clin Rev BECAUSE OF THE FOLLOWING RULE FAILURES:</p>     
      </div>`
        } else if (this.patientEvents[i].data[j].event_name === 'Working on staffing') {
          htmlContent += `<div class="my-1" id="${this.patientEvents[i].data[j].event_id}">        
        <p class="m-0"><b style="color: #17a2b8;">${this.patientEvents[i].data[j].event_name}</b></p>     
        <p>THE ABOVE Alt Start Of Care REQUEST WAS ROUTED TO THE HIT QUEUE WITH A ROUTE REASON OF Portal -
            Clin Rev BECAUSE OF THE FOLLOWING RULE FAILURES:</p>     
      </div>`
        } else if (this.patientEvents[i].data[j].event_name === 'PT was requesting') {
          htmlContent += `<div class="my-1" id="${this.patientEvents[i].data[j].event_id}">        
          <p class="m-0"><b style="color: #28a745;">${this.patientEvents[i].data[j].event_name}</b></p>     
          <p>THE ABOVE Alt Start Of Care REQUEST WAS ROUTED TO THE HIT QUEUE WITH A ROUTE REASON OF Portal -
              Clin Rev BECAUSE OF THE FOLLOWING RULE FAILURES:</p>     
        </div>`
        } else {
          htmlContent += `<div class="my-1" id="${this.patientEvents[i].data[j].event_id}">        
        <p class="m-0"><b>${this.patientEvents[i].data[j].event_name}</b></p>     
        <p>THE ABOVE Alt Start Of Care REQUEST WAS ROUTED TO THE HIT QUEUE WITH A ROUTE REASON OF Portal -
            Clin Rev BECAUSE OF THE FOLLOWING RULE FAILURES:</p>     
      </div>`
        }
      }
      htmlContent += `</div>`
    }
    this.htmlContent = htmlContent
  });
    // console.log('this.htmlContent: ', this.htmlContent)
  }

  getDate(date: Date) {
    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
  }

  onKeyUp($event) {
    // this.htmlContent = this.highlightText.transform(this.htmlContent, this.search);
  }
}