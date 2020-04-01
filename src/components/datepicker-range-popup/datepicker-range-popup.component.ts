import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-datepicker-range-popup',
  templateUrl: './datepicker-range-popup.component.html',
  styleUrls: ['./datepicker-range-popup.component.css']
})
export class DatepickerRangePopupComponent implements OnInit {
  hoveredDate: NgbDate;

  fromDate: NgbDate;
  toDate: NgbDate;

  @Output() dateRangeObj = new EventEmitter<any>();

  ngOnInit() {
  }

  constructor(private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) {
    // this.fromDate = calendar.getToday();
    // this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.fromDate = null;
    this.toDate = null;
  }

  sendDates(fromDate, toDate) {
    this.dateRangeObj.emit({ 'fromDate': fromDate, 'toDate': toDate })
  }

  onDateSelection(date: NgbDate, datepicker) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    // console.log('---child-fromDate: ', this.fromDate)
    // console.log('---child-toDate: ', this.toDate)
    if (this.fromDate && this.toDate) {
      this.sendDates(this.fromDate, this.toDate);
      datepicker.close();
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate, input: string): NgbDate {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

}
