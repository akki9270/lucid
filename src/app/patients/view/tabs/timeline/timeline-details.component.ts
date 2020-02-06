import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
// import * as $ from 'jquery';

@Component({
  selector: 'app-timeline-details',
  templateUrl: './timeline-details.component.html',
  styleUrls: ['./timeline-details.component.css', './jquery/timeline.scss']
})
export class TimelineDetailsComponent implements OnInit {
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }
  modalOption: NgbModalOptions = {
    backdrop: true,
    size: 'lg'
  }
  onEventClick(longContent, $scrollElementId) {
    this.modalService.open(longContent, this.modalOption);
    setTimeout(() => {
      let scrollPosition = $('#myModal div' + $scrollElementId).position().top;
      $('#myModal').animate({
        scrollTop: scrollPosition
      }, 1000);
    }, 0);
  }
}


