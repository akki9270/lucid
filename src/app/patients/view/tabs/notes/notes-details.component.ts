import { Component, OnInit, Input } from '@angular/core';
// import * as data from '../timeline/event.json'
import _ from 'underscore';
import { HighlightSearch, SafeHtmlPipe } from 'src/CustomPipes/HighlightSearch/HighlightSearch.js';
import { RestApiService } from 'src/app/shared/rest-api.service.js';
import { Patient } from 'src/app/models/patient';

@Component({
  selector: 'app-notes-details',
  templateUrl: './notes-details.component.html',
  styleUrls: ['./notes-details.component.css'],
  providers: [HighlightSearch, SafeHtmlPipe]
})
export class NotesDetailsComponent implements OnInit {
  tags = []
  matchTags = []
  htmlContent = null
  search = ''
  @Input('patientDetails') patientDetails: Patient;
  constructor(public highlightText: HighlightSearch,
    public safeHtml: SafeHtmlPipe, public restApi: RestApiService) { }

  ngOnInit() {
    this.getTags()
  }

  getTags() {
    this.restApi.getTags().subscribe((data: any) => {
      this.tags = data
      this.getInitNotes();
    });
  }

  getInitNotes() {
    let patientId = this.patientDetails.patient_id;
    let intakeId = this.patientDetails.intake_id;
    this.restApi.getNotes(patientId, intakeId).subscribe((result: any) => {
      let htmlContent = _.map(result, 'note_data').join('\n');
      this.tags.forEach((tag: any) => {
        if (htmlContent.indexOf(tag.tag_name) > -1) {
          var regExp = new RegExp(`${tag.tag_name}`, 'gi');
          tag.matchCount = htmlContent.match(regExp).length;
          this.matchTags.push(tag);
          let replaceContent = `<span style="background-color:${tag.tag_color}" class='p-1'><b>${tag.tag_name}</b></span>`
          htmlContent = htmlContent.replace(regExp, replaceContent);
        }
      })
      this.htmlContent = htmlContent;
    });
    // console.log('this.Tags: ', this.tags);
    // console.log('this.matchTags: ', this.matchTags);
  }

  getDate(date: Date) {
    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
  }

  // trackByFn(index, item) {
  //   return item.tag_code;
  // }

  // onKeyUp($event) {
  // this.htmlContent = this.highlightText.transform(this.htmlContent, this.search);
  // }
}