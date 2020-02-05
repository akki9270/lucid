import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

  onEventClick(longContent, $scrollElementId) {
    this.modalService.open(longContent);
    $('html, body').animate({
      scrollTop: $scrollElementId.offset().top
    }, 1000);
    return false;
  }
}
