import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-notes-details',
  templateUrl: './notes-details.component.html',
  styleUrls: ['./notes-details.component.css']
})
export class NotesDetailsComponent implements OnInit {

  title = 'app';

  form: FormGroup;

  htmlContent = '<b>Notes</b>' + 
  '<p><b>Was the service or item for which you are now requesting authorization initiated prior to submitting this request for authorization?: No</b></p>' +
  '<p><b>Notes:- </b><b style="color: #007bff">Be sure to staff</b></p>' +
  '<p><b>HCPCS9501/SERVICE CODE 1017/ANTIBIOTIC THERAPY Q12 - PHARMACY ONLY - PD,SQ FROM 03/08/2018 TO 03/19/2018</b><p>' +
  '<p><b>Notes:- </b><b style="color: #007bff">PT was requesting</b></p>' +
  '<p><b>THE ABOVE PROVIDER PORTAL REFERRAL REQUEST WAS ROUTED TO THE HIT QUEUE WITH A ROUTE REASON OF Portal - Clin Rev BECAUSE OF THE FOLLOWING RULE FAILURES:</b><p>' +
  '<p><b style="color: #007bff">Working on staffing</b><p>' +
  '<p><ul><li><b style="color: #007bff">PT was requesting</b></li></ul><p>' +
  '<p><b>THE ABOVE PROVIDER PORTAL REFERRAL REQUEST WAS ROUTED TO THE HIT QUEUE WITH A ROUTE REASON OF Portal - Clin Rev BECAUSE OF THE FOLLOWING RULE FAILURES:</b></p>';
  
  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    sanitize: true,
    toolbarPosition: 'top',
    // toolbarHiddenButtons: [
    //   ['bold', 'italic'],
    //   ['fontSize']
    // ]
  };

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      signature: ['', Validators.required]
    });
    // console.log('this.htmlContent: ', this.htmlContent);
  }

  // onChange(event) {
  //   console.log('changed: ', event);
  // }
}
