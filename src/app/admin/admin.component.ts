import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/shared/rest-api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  myData = []
  settings = {
    columns: {      
      first_name: {
        title: 'FIRST NAME',
        sort: false
      },
      last_name: {
        title: 'LAST NAME',
        sort: false
      },
      email: {
        title: 'EMAIL',
        sort: false
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

  constructor(public restApi: RestApiService) { }

  ngOnInit() {
    this.getUserList()
  }

  getUserList(){
    this.restApi.getUsers()
    .subscribe((result: any) => {
      console.log(' result ', result);
      if(result && result.length > 0){
        this.myData = result
      }
    });
  }

  onUserView(event) {
    if (event && event.data) {
      // console.log('-data: ', event)      
    }
  }

}
