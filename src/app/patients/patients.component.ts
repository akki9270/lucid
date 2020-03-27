import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import _ from 'underscore';
import moment from 'moment';
import { RestApiService } from "../shared/rest-api.service";
import { USER } from '../constants';
// import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit, AfterViewInit {
  myData = [];
  source: LocalDataSource;
  query: string;
  count: number = 1;
  // direction: string = 'asc';
  columns: any[] = [
    {
      title: 'intake id',
      column: 'intake_id',
      filter: true,
      sort: false,
      direction: ''
    },
    {
      title: 'patient id',
      column: 'patient_id',
      filter: true,
      sort: false
    },
    {
      title: 'first name',
      column: 'first_name',
      filter: true,
      sort: false
    },
    {
      title: 'last name',
      column: 'last_name',
      filter: true,
      sort: false
    }, {
      title: 'health plan',
      column: 'insurance_name',
      filter: true,
      sort: false
    },
    {
      title: 'days to soc',
      column: 'days_to_soc',
      filter: false,
      sort: true,
      direction: ''
    }
  ]
  // @HostListener('document:click',['$event'])
  // onclick(e) {
  //   if (e && e.target) {
  //     let text = e.target.innerHTML;
  //     if (text.includes("DAYS TO SOC")) {
  //       this.getPatientSortedData(e.target);
  //     }
  //   }
  //   // console.log(' e ', e.target);
  // }

  settings = {
    columns: {
      intake_id: {
        title: 'INTAKE ID',
        sort: false,
        filter: false,
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
        filter: false,
      },
      first_name: {
        title: 'FIRST NAME',
        sort: false,
        filter: false
      },
      last_name: {
        title: 'LAST NAME',
        sort: false,
        filter: false
      },
      insurance_name: {
        title: 'HEALTH PLAN',
        sort: false,
        filter: false,
        width: '300px',
      },
      // last_seen: {
      //   title: 'Last_seen',
      //   sort: false
      // },
      days_to_soc: {
        title: 'DAYS TO SOC',
        class: 'cursor-pointer',
        sort: false,
        filter: false,
        // sortDirection: this.direction
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

  ngOnInit() {
    // this.myData = data.slice(0,10)
    this.getPatientData();
  }

  ngAfterViewInit() {
    let ele = $("span:contains('DAYS TO SOC')")[0];
    $(ele).addClass('cursor-pointer');
  }
  getPatientData() {
    this.restApi.getPatients().subscribe((data: any) => {
      // console.log('data: ', data)
      this.myData = this.addDaysToSoc(data);
    });
  }

  getPatientFilterData(query, field) {
    if (!query) {
      this.getPatientData();
      return;
    }
    this.restApi.getPatientFilterData(query,field).subscribe((data: any) => {
      // console.log('data: ', data)
      this.myData = this.addDaysToSoc(data);
    });
  }

  getPatientSortedData(headData) {
    console.log('headData ', headData);
    let direction = headData.direction == '' || headData.direction == 'asc' ? 'desc' : 'asc';
    // this.direction = this.direction && this.direction == 'asc' ? 'desc' : 'asc';
    this.columns.forEach(item => {
      if (item.column == headData.column) {
        item.direction = direction;
      }
    })
    //  console.log('this.direction ', this.direction)
    this.restApi.getPatientSortedData(direction).subscribe((data: any) => {
      this.myData = this.addDaysToSoc(data);
      this.myData = _.sortBy(this.myData, 'days_to_soc');
      if (direction == 'desc') {
        this.myData = this.myData.reverse();
      }
      // this.source.load(this.myData);
      // let ascending = `<i class="fa fa-arrow-circle-up ml-2"></i>`
      // let descending = `<i class="fa fa-arrow-circle-down ml-2"></i>`
      // // $(parentEle).addClass('d-flex');
      // $(parentEle).empty();
      // $(parentEle).text('DAYS TO SOC');
      // $(parentEle).append(this.direction == 'asc' ? $(ascending) : $(descending));
    })
  }

  onPatientView(data) {
    if (data) {
      // console.log('-data: ', )      
      let user = sessionStorage[USER];
      if (user) {
        user = JSON.parse(user)
      } else {
        // AuthService.logout()
      }
      // console.log('-user: ', user)      
      if (data.intake_id && data.patient_id) {
        let obj = {
          'user_id': user.id, patient_id: data.patient_id,
          intake_id: data.intake_id, 'last_Seen': new Date()
        }
        this.restApi.addPatientLastseen(obj).subscribe(result => {
          // console.log('result ', result);
        })
      }
      this.router.navigate([`patients/${data.patient_id}/view`], { state: { patientDetails: data } });
    }
  }

  addDaysToSoc(data) {
    data.forEach(row => {
      if (row && row.service && row.service.length > 0) {
        row.days_to_soc = this.calculateMinDaysToSoc(row);
      }
    });
    return data;
  }

  calculateMinDaysToSoc(row) {
    let rowsHavingStartDate = _.chain(row.service).map('start_date').uniq().value();
    if (rowsHavingStartDate && rowsHavingStartDate.length > 0) {
      let filterDays = [];
      _.each(rowsHavingStartDate, function (date) {
        let duration: number = moment(date).diff(moment(),'days');
        if (duration > 0) {
          filterDays.push(duration);
        }
      });
      return filterDays.length == 0 ? 0 : Math.min.apply(Math, filterDays);
    }
    return 0;
  }

  // sarchPatients() {
  //   if (!this.query) {
  //     this.getPatientData();
  //   } else {
  //     this.getPatientFilterData(this.query);
  //   }
  // }
}
