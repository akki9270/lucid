import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import _ from 'underscore';
import * as uuid from 'uuid';
// import * as $ from 'jquery';
// import { timeModule } from '../../../../../assets/timeline.js/index.js'; 
import * as data from './event.json'
import { Patient } from 'src/app/models/patient';
import { ToasterService } from 'angular2-toaster';
import { RestApiService } from 'src/app/shared/rest-api.service';
import moment from 'moment';
import { fromEvent } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-timeline-details',
  templateUrl: './timeline-details.component.html',
  styleUrls: ['./timeline-details.component.css', './jquery/timeline.scss']
})
export class TimelineDetailsComponent implements OnInit, AfterViewInit {
  timeline: any;
  elH: NodeListOf<Element>;
  arrows: NodeListOf<Element>;
  arrowPrev: any;
  arrowNext: any;
  firstItem: any;
  lastItem: any;
  xScrolling: number;
  disabledClass: string;
  currentEvent: any;
  clickedChildEvent: any;
  isFirstEleVisible: any;
  isLastEleVisible: any;
  constructor(private modalService: NgbModal,
       private toasterService: ToasterService,
       public restApi: RestApiService) { }

  patientEvents: any // = (data as any).default;
  showChildEvents: boolean = false; 
  childEvents = []
  @Input('patientDetails') patientDetails: Patient;

  ngOnInit() {
    fromEvent(document.querySelector('.timeline .arrows .arrow__next'), 'click').pipe(delay(800))
    .subscribe( _ => {
      this.isElementVisible(0);
      this.isElementVisible(this.patientEvents.length);
    });
    fromEvent(document.querySelector('.timeline .arrows .arrow__prev'), 'click').pipe(delay(800))
    .subscribe( _ => {
      this.isElementVisible(0);
      this.isElementVisible(this.patientEvents.length);
    });

    // this.loadScript();
    // START
    // console.log('-----data: ', data)
    // console.log('this.patientDetails ', this.patientDetails);
    this.getTimeLineData();
    this.showChildEvents = false;
  }

  isElementVisible(position: number) {
    let parentPos = document.querySelector('.timeline ol').getBoundingClientRect();
    let elementLeft = document.querySelector('.timeline ol').children[position]['offsetLeft'];
    let boxWidth = document.querySelector('.timeline')['offsetWidth'];
    if (position == 0) {
      this.isFirstEleVisible = parentPos['x'] > 0;
    } else {
      let totalLeft = parentPos['x'] + elementLeft;
      this.isLastEleVisible = totalLeft < boxWidth;
    }
  }

  getTimeLineData(){
    let patient_id = this.patientDetails.patient_id;
    let intake_id = this.patientDetails.intake_id;
    if (!patient_id || !intake_id) {
      return;
    }
    this.restApi.getNotes(patient_id, intake_id)
    .subscribe((result: any) => {
      // console.log(' result ', result);
      // let resultData: Timeline[] = result;
      result.forEach(element => {
        element.date = moment(element.date)
        // .format('MM/DD/YYYY');
        element.groupDate = moment(element.date).format('MM/DD/YYYY');
        // element.note_id = element.note_id;
      });
      result = _.sortBy(result, 'date')
      // result.forEach(element => {
      //   element.date = moment(element.date).format('MM/DD/YYYY');        
      // });
      let groupedData = _.groupBy(result, 'date');
      // console.log('groupedData ', groupedData);
      let eventsData = [];
      for (let d in groupedData) {
        let obj = {
          ...groupedData[d][0],
          'date': moment(groupedData[d][0]['date']).format('MM/DD/YYYY'),
          data: groupedData[d]
        }
        eventsData.push(obj);
      }
      eventsData.forEach(eve => {
        eve.data.forEach(subEve => {
          subEve.note_id = uuid.v4()
        });
      });
      this.patientEvents = eventsData;
      setTimeout(() => {
        this.isElementVisible(0);
        this.isElementVisible(this.patientEvents.length)
      }, 500);
      // console.log('patientEvents ', this.patientEvents);
    });
  }

  getDate(date: Date) {
    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
  }
  
  ngAfterViewInit() {    
    this.loadScript();
  }

  loadScript(){
    this.timeline = document.querySelector(".timeline ol");
    this.elH = document.querySelectorAll(".timeline li > div");
    this.arrows = document.querySelectorAll(".timeline .arrows .arrow");
    this.arrowPrev = document.querySelector(".timeline .arrows .arrow__prev");
    this.arrowNext = document.querySelector(".timeline .arrows .arrow__next");
    this.firstItem = document.querySelector(".timeline li:first-child");
    this.lastItem = document.querySelector(".timeline li:last-child");
    this.xScrolling = 280;
    this.disabledClass = "disabled";
    window.addEventListener("load", this.init);
    this.init();
  }

  init() {
    this.setEqualHeights(this.elH);
    this.animateTl(this.xScrolling, this.arrows, this.timeline);
    this.setSwipeFn(this.timeline, this.arrowPrev, this.arrowNext);
    this.setKeyboardFn(this.arrowPrev, this.arrowNext);
  }

  // SET EQUAL HEIGHTS
  setEqualHeights(el) {
    let counter = 0;
    for (let i = 0; i < el.length; i++) {
      const singleHeight = el[i].offsetHeight;

      if (counter < singleHeight) {
        counter = singleHeight;
      }
    }

    for (let i = 0; i < el.length; i++) {
      el[i].style.height = `${counter}px`;
    }
  }

  // CHECK IF AN ELEMENT IS IN VIEWPORT
  isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // SET STATE OF PREV/NEXT ARROWS
  setBtnState(el, flag = true) {
    if (flag) {
      // el.classList.add(this.disabledClass);
    } else {
      if (el.classList.contains(this.disabledClass)) {
        // el.classList.remove(this.disabledClass);
      }
      // el.disabled = false;
    }
  }

  // ANIMATE TIMELINE
  animateTl(scrolling, el, tl) {
    let counter = 0;
    let that = this;
    for (let i = 0; i < el.length; i++) {
      el[i].addEventListener("click", function () {
        if (!that.arrowPrev['disabled']) {
          // that.arrowPrev.disabled = true;
        }
        if (!that.arrowNext['disabled']) {
          // that.arrowNext.disabled = true;
        }
        const sign = (this.classList.contains("arrow__prev")) ? "" : "-";
        if (counter === 0) {
          tl.style.transform = `translateX(-${scrolling}px)`;
        } else {
          const tlStyle = getComputedStyle(tl);
          // add more browser prefixes if needed here
          const tlTransform = tlStyle.getPropertyValue("-webkit-transform") || tlStyle.getPropertyValue("transform");
          const values = parseInt(tlTransform.split(",")[4]) + parseInt(`${sign}${scrolling}`);
          tl.style.transform = `translateX(${values}px)`;
        }

        setTimeout(() => {
          // that.isElementInViewport(that.firstItem) ? that.setBtnState(that.arrowPrev) : that.setBtnState(that.arrowPrev, false);
          // that.isElementInViewport(that.lastItem) ? that.setBtnState(that.arrowNext) : that.setBtnState(that.arrowNext, false);
        }, 1100);

        counter++;
      });
    }
  }

  // ADD SWIPE SUPPORT FOR TOUCH DEVICES
  setSwipeFn(tl, prev, next) {
    //   const hammer = new Hammer(tl);
    //   hammer.on("swipeleft", () => next.click());
    //   hammer.on("swiperight", () => prev.click());
  }

  // ADD BASIC KEYBOARD FUNCTIONALITY
  setKeyboardFn(prev, next) {
    document.addEventListener("keydown", (e) => {
      if ((e.which === 37) || (e.which === 39)) {
        const timelineOfTop = this.timeline['offsetTop'];
        const y = window.pageYOffset;
        if (timelineOfTop !== y) {
          window.scrollTo(0, timelineOfTop);
        }
        if (e.which === 37) {
          prev.click();
        } else if (e.which === 39) {
          next.click();
        }
      }
    });
  }

  modalOption: NgbModalOptions = {
    backdrop: true,
    size: 'lg'
  }
  
  onEventClick(longContent, $scrollElementId, event) {
    // this.clickedChildEvent = event;
    // console.log('$event click: ', $scrollElementId)
    this.modalService.open(longContent, this.modalOption);
    setTimeout(() => {
      // let parentId = $('#'+$scrollElementId).parent().attr('id');
      // console.log('parentId: ', parentId)
      // let parentPos = $('#myModal div#'+parentId).position().top;
      // console.log('parentPos: ', parentPos)
      let scrollPosition = $('#myModal div#' + $scrollElementId).position().top;
      // console.log('scrollPosition: ', scrollPosition)
      $('#myModal').animate({
        scrollTop: scrollPosition
      }, 1000);
    }, 0);
  }

  trackByFn(index, item) {
    return item.id;
  }

  // onParentEventClick(event){
  //   this.childEvents = event.data;
  //   this.currentEvent = event;
  //   this.showChildEvents = true;
  //   setTimeout(()=>{
  //     this.loadScript();
  //   },500)
  // }

  onBackButtonClick(showHideFlag){
    // this.showChildEvents = showHideFlag;
    setTimeout(()=>{
      this.loadScript();
    },1000)
  }
}
