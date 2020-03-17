import { Component, OnInit, Input } from '@angular/core';
// import * as data from '../timeline/event.json'
import _ from 'underscore';
import { HighlightSearch } from 'src/CustomPipes/HighlightSearch/HighlightSearch.js';
import { RestApiService } from 'src/app/shared/rest-api.service.js';
import { Patient } from 'src/app/models/patient';

@Component({
  selector: 'app-notes-details',
  templateUrl: './notes-details.component.html',
  styleUrls: ['./notes-details.component.css'],
  providers: [HighlightSearch]
})
export class NotesDetailsComponent implements OnInit {
  tags = []
  matchTags = []
  htmlContent = null
  search = ''
  notesData: any;
  selectedIntakeId: string;
  intakeIdArr: any[] = [];
  @Input('patientDetails') patientDetails: Patient;
  constructor(public highlightText: HighlightSearch, public restApi: RestApiService) { }

  ngOnInit() {
    this.getTags()
    // console.log('patientDetails: ', this.patientDetails)
  }

  getTags() {
    this.restApi.getTags().subscribe((data: any) => {
      this.tags = data
      this.getInitNotes();
    });
  }

  onChangeIntakeIdDropdown(selectdIntakeId) {
    if (selectdIntakeId !== this.selectedIntakeId) {
      this.matchTags = []
      this.selectedIntakeId = selectdIntakeId
      this.setCurrentNoteContent(selectdIntakeId)
    }
  }

  setCurrentNoteContent(intakeId) {
    this.htmlContent = '';
    let result = _.filter(this.notesData, item => item.intake_id == intakeId);
    let htmlContent = _.map(result, 'note_data').join('\n');
    this.tags.forEach((tag: any) => {
      if (htmlContent.indexOf(tag.tag_name) > -1) {
        var regExp = new RegExp(`${tag.tag_name}`, 'gi');
        tag.matchCount = htmlContent.match(regExp).length;
        this.matchTags.push(tag);
        let replaceContent = `<span style="background-color:${tag.tag_color}; color: white;" class='p-1'><b>${tag.tag_name}</b></span>`
        htmlContent = htmlContent.replace(regExp, replaceContent);
      }
    });
    this.htmlContent = htmlContent;
  }

  getInitNotes() {
    let patientId = this.patientDetails.patient_id;
    // let intakeId = this.patientDetails && this.patientDetails.intake_id;
    this.selectedIntakeId = this.patientDetails && this.patientDetails.intake_id;
    this.restApi.getNotes(patientId).subscribe((result: any) => {
      // console.log('result: ', result);
      this.notesData = result;
      this.intakeIdArr = _.chain(result).map('intake_id').uniq().value();
      if (this.intakeIdArr.indexOf(this.selectedIntakeId) == -1) {
        this.selectedIntakeId = this.intakeIdArr[0];
      }
      this.setCurrentNoteContent(this.selectedIntakeId);
    });
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