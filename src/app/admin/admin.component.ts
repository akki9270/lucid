import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LocalDataSource } from 'ng2-smart-table';
import { RestApiService } from 'src/app/shared/rest-api.service';
import { ActiveSwitchComponent } from './active-switch/active-switch.component';
import { PasswordInputComponent } from './password-input/password-input.component';
import { ActionButtonComponent } from './action-button/action-button.component';
import { USER } from '../constants';
import { StorageService } from '../shared/storage.service';
import { ToasterService } from 'angular2-toaster';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {
  // myData = [];
  newUser: any = {};
  user: any;
  myData: LocalDataSource;
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
        valuePrepareFunction: (value, row) => {
          return { action: 'password', data: row };
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
        valuePrepareFunction: (value, row) => {
          return { action: 'active', data: row };
        }
      },
      is_admin: {
        title: 'Admin',
        sort: false,
        filter: false,
        editable: true,
        type: 'custom',
        renderComponent: ActiveSwitchComponent,
        valuePrepareFunction: (value, row) => {
          return { action: 'admin', data: row };
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
    centered: true,
    size: 'lg'
  }
  @ViewChild('confirmModal') confimModalElementRef
  confirmModalRef: NgbModalRef;

  userModalRef: NgbModalRef;
  selectedData: any = {};
  sourceData: any;
  activeNote: string = `This will make ${this.selectedData.user_id} Active`;
  inActiveNote: string = `This will make ${this.selectedData.user_id} InActive`;

  adminNote: string = `This will make ${this.selectedData.user_id} Admin`;
  adminFalseNote: string = `This will make ${this.selectedData.user_id} Non Admin`;
  isActiveConfirm: boolean;
  isAdminConfirm: boolean;
  subscriptions: any[] = [];
  constructor(public restApi: RestApiService,
    private modalService: NgbModal,
    private storageService: StorageService,
    private restAPI: RestApiService,
    private toasterService: ToasterService,
    private adminService: AdminService) { }

  ngOnInit() {
    this.getUserList();
    let user = sessionStorage[USER];
    this.user = user ? JSON.parse(user) : {};
    this.storageService.getUserData().subscribe(user => {
      this.user = user;
    });
   let sub = this.adminService.showConfirmDialogue().subscribe(data => {
      // console.log(' data', data);
      this.selectedData = data;
      this.isActiveConfirm = typeof data.is_active == "boolean";
      this.isAdminConfirm = typeof data.is_admin == "boolean";
      this.updateConfirmNotes();
      this.openConfirmModal(this.confimModalElementRef);
    });
    this.subscriptions.push(sub);
  }

  ngOnDestroy() {
    if (this.subscriptions && this.subscriptions.length) {
      this.subscriptions.forEach(subscr => {
        subscr.unsubscribe();
      })
    }
  }

  updateConfirmNotes() {
    this.activeNote = `This will make ${this.selectedData.user_id} Active`;
    this.inActiveNote = `This will make ${this.selectedData.user_id} InActive`;
  
    this.adminNote = `This will make ${this.selectedData.user_id} Admin`;
    this.adminFalseNote = `This will make ${this.selectedData.user_id} Non Admin`;
  }
  getUserList() {
    this.restApi.getUsers()
      .subscribe((result: any) => {
        // console.log(' result ', result);
        if (result && result.length > 0) {
          this.myData = new LocalDataSource(result);
          this.sourceData = result;
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
    let options = Object.assign({ ...this.modalOption }, { size: 'sm', backdrop: true, keyboard: false })
    this.confirmModalRef = this.modalService.open(confirmModal, options);
  }

  cancelConfirmModal() {
    this.sourceData.forEach(item => {
      if (item.user_id == this.selectedData.user_id) {
        if (this.isAdminConfirm) {
          item.is_admin = !this.selectedData.is_admin;
        }
        if (this.isActiveConfirm) {
          item.is_active = !this.selectedData.is_active;
        }
      }
    });
    this.myData.load(this.sourceData);
    this.confirmModalRef.close();
  }

  onConfirm() {
    this.confirmModalRef.close();
    if (this.isAdminConfirm) {
      this.updateIsAdminUser(this.selectedData);
    }
    if (this.isActiveConfirm) {
      this.updateIsActiveUser(this.selectedData);
    }
  }

  addUser() {
    if (!this.newUser.id || !this.newUser.first_name ||
      !this.newUser.last_name || !this.newUser.password) {
      this.toasterService.pop('error', 'All Fields ar mandatory.');
      return;
    }
    this.restAPI.addUsers({ ...this.newUser, user: this.user })
      .subscribe(result => {
        // console.log('result ', result);
        this.toasterService.pop('success', 'User added SuccessFully.');
        this.cancelUserModal();
        this.getUserList();
      })
  }

  updateIsAdminUser(data) {
    this.restApi.toggleAdminUser(data).subscribe(result => {
      // console.log('result ', result);
      this.toasterService.pop('success','User update successfully');
    })
  }

  updateIsActiveUser(data) {
    this.restApi.toggleActiveUser(data).subscribe(result => {
      // console.log('result ', result);
      this.toasterService.pop('success','User update successfully');
    })
  }
}
