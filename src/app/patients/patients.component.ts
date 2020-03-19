import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import _ from 'underscore';
import * as moment from 'moment';
import { RestApiService } from "../shared/rest-api.service";
import { USER } from '../constants';
// import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  myData = [];
  source: LocalDataSource;

  settings = {
    columns: {
      intake_id: {
        title: 'INTAKE ID',
        sort: false,
        // filter: {
        //   type: 'completer',
        //   config: {
        //     completer: {
        //       data: this.myData,
        //       searchFields: 'intake_id',
        //       titleField: 'intake_id',
        //     },
        //   },
        // },
        // filterFunction: (cell?: any, search?: string) => {
        //   // cell? is the value of the cell, in this case is a timeStamp          
        //   if (search.length > 0) {
        //     console.log('search: ', search)
        //     this.getPatientFilterData(search, 'intake_id')
        //     return search
        //   }
        // }
      },
      patient_id: {
        title: 'PATIENT ID',
        sort: false,
        // filter: false,
      },
      first_name: {
        title: 'FIRST NAME',
        sort: false,
        // filter: false
      },
      last_name: {
        title: 'LAST NAME',
        sort: false,
        // filter: false
      },
      insurance_name: {
        title: 'HEALTH PLAN',
        sort: false,
        // filter: false
      },
      // last_seen: {
      //   title: 'Last_seen',
      //   sort: false
      // },
      days_to_soc: {
        title: 'DAYS TO SOC',
        valuePrepareFunction: (value, row) => {
          if (row && row.service && row.service.length > 0) {
            let rowsHavingStartDate = _.chain(row.service).map('start_date').uniq().value();
            if (rowsHavingStartDate && rowsHavingStartDate.length > 0) {
              let filterDays = [];
              _.each(rowsHavingStartDate, function (date) {
                let duration = moment.duration(moment(new Date()).diff(moment(date)));
                let days = Math.floor(duration.asDays());
                filterDays.push(days);
              })
              return Math.min.apply(Math, filterDays);
            }
            return 0;
          }
        }
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
    this.source = new LocalDataSource(this.myData);
  }

  // onSearch(query: string = '') {
  //   this.source.setFilter([
  //     // fields we want to include in the search
  //     {
  //       field: 'intake_id',
  //       search: query
  //     },
  //     {
  //       field: 'patient_id',
  //       search: query
  //     },
  //     {
  //       field: 'first_name',
  //       search: query
  //     },
  //     {
  //       field: 'last_name',
  //       search: query
  //     },
  //     {
  //       field: 'insurance_name',
  //       search: query
  //     }
  //   ], false);
  //   // second parameter specifying whether to perform 'AND' or 'OR' search 
  //   // (meaning all columns should contain search query or at least one)
  //   // 'AND' by default, so changing to 'OR' by setting false here
  // }

  ngOnInit() {
    // this.myData = data.slice(0,10)
    this.getPatientData()
  }

  getPatientData() {
    this.restApi.getPatients().subscribe((data: any) => {
      // console.log('data: ', data)
      this.myData = data
    });
  }

  getPatientFilterData(query, field) {
    this.restApi.getPatientFilterData({ [field]: query }).subscribe((data: any) => {
      // console.log('data: ', data)
      this.myData = data
    });
  }

  onPatientView(event) {
    if (event && event.data) {
      // console.log('-data: ', event)      
      let user = sessionStorage[USER];
      if (user) {
        user = JSON.parse(user)
      } else {
        // AuthService.logout()
      }
      // console.log('-user: ', user)      
      if (event.data.intake_id && event.data.patient_id) {
        let data = {
          'user_id': user.id, patient_id: event.data.patient_id,
          intake_id: event.data.intake_id, 'last_Seen': new Date()
        }
        this.restApi.addPatientLastseen(data).subscribe(result => {
          // console.log('result ', result);
        })
      }
      this.router.navigate([`patients/${event.data.patient_id}/view`], { state: { patientDetails: event.data } });
    }
  }

}
