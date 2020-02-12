import { Component, OnInit } from '@angular/core';
import * as data from '../timeline/event.json'
import { HighlightSearch, SafeHtmlPipe } from 'src/CustomPipes/HighlightSearch/HighlightSearch.js';

@Component({
  selector: 'app-notes-details',
  templateUrl: './notes-details.component.html',
  styleUrls: ['./notes-details.component.css'],
  providers: [HighlightSearch, SafeHtmlPipe]
})
export class NotesDetailsComponent implements OnInit {

  title = 'app';

  patientEvents: any = (data as any).default;

  htmlContent = null

  search = ''

  constructor(public highlightText: HighlightSearch, public safeHtml: SafeHtmlPipe) { }

  ngOnInit() {
    this.getInitNotes();
  }

  getInitNotes() {
    let htmlContent = ''
    for (let i = 0; i < this.patientEvents.length; i++) {
      htmlContent += `<div class="my-2" id="${this.patientEvents[i].event_id}">
        <div>
          <p class="m-0"><b>Event: </b><b style="color: #007bff">${this.patientEvents[i].event_name}</b></p>        
        </div>`
      for (let j = 0; j < this.patientEvents[i].data.length; j++) {
        htmlContent += `<div class="my-1" id="${this.patientEvents[i].data[j].event_id}">
        <p class="m-0"><b>Sub Event: </b><b style="color: #007bff">${this.patientEvents[i].data[j].event_name}</b></p>     
        <p>THE ABOVE Alt Start Of Care REQUEST WAS ROUTED TO THE HIT QUEUE WITH A ROUTE REASON OF Portal -
            Clin Rev BECAUSE OF THE FOLLOWING RULE FAILURES:</p>     
      </div>`
      }
      htmlContent += `</div>`
    }
    this.htmlContent = htmlContent
    // console.log('this.htmlContent: ', this.htmlContent)
  }  
  onKeyUp($event) {
    // this.htmlContent = this.highlightText.transform(this.htmlContent, this.search);
  }
}