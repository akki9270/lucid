import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { ActiveSwitchComponent } from './active-switch/active-switch.component';
import { PasswordInputComponent } from './password-input/password-input.component';
import { ActionButtonComponent } from './action-button/action-button.component';
import { USER } from '../constants';
import { StorageService } from '../shared/storage.service';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  myData = [];
  newUser: any = {};
  user: any;
  settings = {
    columns: {
      user_id: {
        title: 'User ID',
        sort: false
      },
      first_name: {
        title: 'FIRST NAME',
        sort: false,
        // width: '20%'
      },
      last_name: {
        title: 'LAST NAME',
        sort: false,
        // width: '20%'
      },
      password: {
        title: 'PASSWORD*',
        sort: false,
        filter: false,
        editable: true,
        type: 'custom',
        renderComponent: PasswordInputComponent,
        valuePrepareFunction:(value, row)=>{
          return {action: 'password', data: row};
        }
      },
      is_active: {
        title: 'Active',
        sort: false,
        filter: false,
        editable: true,
        type: 'custom',
        // width: '10%',
        defaultValue: 'HI Again!!!!!',
        renderComponent: ActiveSwitchComponent,
        valuePrepareFunction:(value, row)=>{
          return {action: 'active', data: row};
        }
      },
      is_admin: {
        title: 'Admin',
        sort: false,
        filter: false,
        editable: true,
        type: 'custom',        
        renderComponent: ActiveSwitchComponent,
        valuePrepareFunction:(value, row)=>{          
          return {action: 'admin', data: row};
        }
      },
      // Action: {
      //   title: 'Action',
      //   sort: false,
      //   filter: false,
      //   type: 'custom',
      //   renderComponent: ActionButtonComponent,
      //   valuePrepareFunction:(value, row)=>{
      //     return row;
      //   }
      // }
      // email: {
      //   title: 'EMAIL',
      //   sort: false
      // }     
    },
    actions: {
      add: false,
      edit: false,
      delete: false
    },
    filter: false,
    pager: {
      perPage: 8
    },
    rowClassFunction: (row) => {
      // console.log('row: ', row)
      if (row.index % 2 === 0) {
        return 'even-row font-styles';
      } else {
        return 'odd-row font-styles';
      }
    }
  };  

  modalOption: NgbModalOptions = {
    backdrop: true,
    size: 'lg'
  }

  confirmModalRef: NgbModalRef;
  
  userModalRef: NgbModalRef;

  constructor(public restApi: RestApiService, 
              private modalService: NgbModal,
              private storageService: StorageService,
              private restAPI: RestApiService,
              private toasterService: ToasterService) { }

  ngOnInit() {
    this.getUserList();
    let user = sessionStorage[USER];
    this.user = user ? JSON.parse(user) : {};
    this.storageService.getUserData().subscribe(user => {
      this.user = user;
    })
  }

  getUserList() {
    this.restApi.getUsers()
      .subscribe((result: any) => {
        // console.log(' result ', result);
        if (result && result.length > 0) {
          this.myData = result
        }
      });
  }

  onUserView(event) {
    if (event && event.data) {
      // console.log('-data: ', event)      
    }
  }

  openUserModal(userModal) {
    this.userModalRef = this.modalService.open(userModal, this.modalOption);
  }
  
  cancelUserModal() {
    this.userModalRef.close();
  }

  openConfirmModal(confirmModal) {
    this.confirmModalRef = this.modalService.open(confirmModal, this.modalOption);
  }

  cancelConfirmModal() {
    this.confirmModalRef.close();
  }

  onConfirm(){
    
  }
     
  addUser() {
    if (!this.newUser.id || !this.newUser.first_name || 
        !this.newUser.last_name || !this.newUser.password) {
          this.toasterService.pop('error', 'All Fields ar mandatory.');
          return;
      }
    this.restAPI.addUsers({...this.newUser, user: this.user})
    .subscribe(result => {
      // console.log('result ', result);
      this.toasterService.pop('success', 'User added SuccessFully.');
      this.cancelUserModal();
      this.getUserList();
    })
  }
}
