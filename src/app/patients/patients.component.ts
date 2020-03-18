import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
      insurance_name: {
        title: 'HEALTH PLAN',
        sort: false
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
                let duration = moment.duration(moment(new Date()).diff( moment(date)));
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
  }

  ngOnInit() {
    // this.myData = data.slice(0,10)
    this.getPatientData()
  }

  min_date(all_dates) {
    var min_dt = all_dates[0],
      min_dtObj = new Date(all_dates[0]);
    all_dates.forEach(function (dt, index) {
      if (new Date(dt) < min_dtObj) {
        min_dt = dt;
        min_dtObj = new Date(dt);
      }
    });
    return min_dt;
  }

  getPatientData() {
    this.restApi.getPatients().subscribe((data: any) => {
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
