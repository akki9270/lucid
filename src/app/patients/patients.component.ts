import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
        title: 'Patient Id',
        sort: false
      },
      intakeId: {
        title: 'Intake Id',
        sort: false
      },
      firstName: {
        title: 'First Name',
        sort: false
      },
      lastName: {
        title: 'Last Name',
        sort: false
      },
      healthPlan: {
        title: 'Health Plan',
        sort: false
      },
      daysOfSoc: {
        title: 'Days to SOC'        
      }
    },
    actions: {
      add: false,
      edit: false,
      delete: false
    },
    filter: false,
    // pager: {
    //   perPage: 10
    // },
    rowClassFunction: (row) => {
      // console.log('row: ', row)
      if (row.index % 2 === 0) {
        return 'even-row font-styles';
      } else {
        return 'odd-row font-styles';
      }
    }
  };

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.myData = data.slice(0,10)
  }

  onPatientView(event) {
    if (event && event.data) {
      // console.log('-data: ', event)
      this.router.navigate([`patients/${event.data.patientId}/view`], { state: { patientDetails: event.data } });
    }
  }

}
