import { Component, OnInit } from '@angular/core';
import { data } from './patients.json';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  myData = []
  settings = {
    columns: {
      patientId: {
        title: 'Patient Id'
      },
      intakeId: {
        title: 'Intake Id'
      },
      firstName: {
        title: 'First Name'
      },
      lastName: {
        title: 'Last Name'
      },
      healthPlan: {
        title: 'Health Plan'
      },
      daysOfSoc: {
        title: 'Days Of Soc'
      }
    },
    actions: {
      add: false,
      edit: false,
      delete: false
    },
    filter: false,
    pager: {
      perPage: 5
    },
    rowClassFunction: (row) => {
      // console.log('row: ', row)
      if (row.index % 2 === 0) {
        return 'even-row';
      } else {
        return 'odd-row';
      }
    }
  };

  constructor() { }

  ngOnInit() {
    this.myData = data
  }

  render(data){
    console.log('-data: ', data)
  }

}
