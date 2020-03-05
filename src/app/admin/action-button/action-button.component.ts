import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-action-button',
  template: `
   <div class="d-flex justify-content-around align-items-center">
      <i class="fa fa-trash-alt text-danger px-3" (click)="OnDeleteClick()">
      </i><i class="fa fa-edit px-3" (click)="onEditClick()"></i>
   </div>
  `,
  styles: []
})
export class ActionButtonComponent implements OnInit {

  constructor() { }
  @Input() value;

  ngOnInit() {
  }
  onEditClick() {
    console.log('Edit ', this.value);
  }

  OnDeleteClick() {
    console.log(' DELETE ', this.value);
  }
}
