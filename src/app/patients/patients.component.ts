import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { data } from './patients.json';
import { RestApiService } from "../shared/rest-api.service";
import { Patient } from '../models/patient'

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  myData = []
  settings = {
    columns: {
      intake_id: {
        title: 'INTAKE ID',
        sort: false
      },     
      patient_id: {
        title: 'PATIENT ID',
        sort: false
      },
      first_name: {
        title: 'FIRST NAME',
        sort: false
      },
      last_name: {
        title: 'LAST NAME',
        sort: false
      },
      health_plan: {
        title: 'HEALTH PLAN',
        sort: false
      },
      last_seen: {
        title: 'Last_seen',
        sort: false
      },
      days_of_soc: {
        title: 'DAYS TO SOC'
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

  constructor(
    public restApi: RestApiService,
    private router: Router
  ) {
  }

  ngOnInit() {
    // this.myData = data.slice(0,10)
    this.getPatientData()
  }

  getPatientData() {
    this.restApi.getPatients().subscribe((data: any) => {
      // console.log('data: ', data)
      this.myData = data.map(item => {
        return new Patient(
          item.patient_id,
          item.intake_id,
          item.first_name,
          item.last_name,
          item.health_plan,
          item.days_to_soc,
          item.dob,
          item.gender,
          item.phone_number,
          item.address,
          item.city,
          item.state,
          item.zipcode,
          item.insurance_name,
          item.subscribe_id,
          item.last_seen,
          item.createdAt,
          item.updatedAt,
          item.deletedAt,
          item.key_indicator,
          item.service
        );
      });
    });
  }

  onPatientView(event) {
    if (event && event.data) {
      // console.log('-data: ', event)
      this.router.navigate([`patients/${event.data.patient_id}/view`], { state: { patientDetails: event.data } });
    }
  }

}
