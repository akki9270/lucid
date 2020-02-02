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

  constructor(private router: Router) {    
  }

  ngOnInit() {
    this.myData = data
  }

  onPatientView(event){
    console.log('-data: ', event)    
    this.router.navigateByUrl(`patients/${event.data.patientId}/view`);
  }

}
