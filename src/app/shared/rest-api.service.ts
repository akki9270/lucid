import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/users';
import { Patient } from '../models/patient';
import { Tag } from '../models/tag';
import { Notes } from '../models/notes';
import { Timeline } from '../models/timeline';
import { UserLastseen } from '../models/userLastseen';
import { Observable, throwError, of } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import AppConfig from '../../assets/config.json';

@Injectable({
  providedIn: 'root'
})

export class RestApiService {

  // Define API
  apiURL = AppConfig.apiURL;

  constructor(private http: HttpClient) {
    // console.log('this.apiURL: ', this.apiURL)
  }

  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getUsers(): Observable<User> {
    let url = this.apiURL + '/getUsers';
    // console.log('----this.apiURL: ', url)
    return this.http.get<User>(url)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  addUsers(data): Observable<User> {
    let url = this.apiURL + '/user/add';
    // console.log('----this.apiURL: ', url)
    return this.http.post<User>(url, data)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  
  updateUser(data): Observable<User> {
    let url = this.apiURL + '/user/update';
    // console.log('----this.apiURL: ', url)
    return this.http.post<User>(url, data)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  toggleActiveUser(data): Observable<User> {
    let url = this.apiURL + '/user/isactivate';
    // console.log('----this.apiURL: ', url)
    return this.http.post<User>(url, data)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  
  toggleAdminUser(data): Observable<User>{
    let url = this.apiURL + '/user/isadmin';
    // console.log('----this.apiURL: ', url)
    return this.http.post<User>(url, data)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // HttpClient API get() method => Fetch employees list
  getPatients(patientId?: string): Observable<Patient> {
    let url = this.apiURL + '/getPatients' + (patientId ? '/' + patientId : '');
    // console.log('----this.apiURL: ', url)
    return this.http.get<Patient>(url)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  addPatientLastseen(data): Observable<UserLastseen> {
    let url = this.apiURL + '/addPatientLastseen';
    // console.log('----this.apiURL: ', url)
    // console.log('---.data: ', data)    
    // return of();
    return this.http.post<UserLastseen>(url, data)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getTags(): Observable<Tag> {
    let url = this.apiURL + '/getTags';
    // console.log('----this.apiURL: ', url)
    return this.http.get<Tag>(url)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
    
  getNotes(patientId: string, intakeId: string): Observable<Notes> {
    let url = this.apiURL + '/getNotes/' + patientId + '/' + intakeId;
    // console.log('----this.apiURL: ', url)
    return this.http.get<Notes>(url)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
 
  getTimeline(patientId: string, intakeId: string): Observable<Timeline> {
    let url = this.apiURL + '/getTimeline/' + patientId + '/' + intakeId;
    // console.log('----this.apiURL: ', url)
    return this.http.get<Timeline>(url)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  logout(): Observable<User> {
    let url = this.apiURL + '/logout';
    // console.log('----this.apiURL: ', url)
    return this.http.get<User>(url)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  //   // HttpClient API get() method => Fetch employee
  //   getEmployee(id): Observable<Employee> {
  //     return this.http.get<Employee>(this.apiURL + '/employees/' + id)
  //     .pipe(
  //       retry(1),
  //       catchError(this.handleError)
  //     )
  //   }  

  //   // HttpClient API post() method => Create employee
  //   createEmployee(employee): Observable<Employee> {
  //     return this.http.post<Employee>(this.apiURL + '/employees', JSON.stringify(employee), this.httpOptions)
  //     .pipe(
  //       retry(1),
  //       catchError(this.handleError)
  //     )
  //   }  

  //   // HttpClient API put() method => Update employee
  //   updateEmployee(id, employee): Observable<Employee> {
  //     return this.http.put<Employee>(this.apiURL + '/employees/' + id, JSON.stringify(employee), this.httpOptions)
  //     .pipe(
  //       retry(1),
  //       catchError(this.handleError)
  //     )
  //   }

  //   // HttpClient API delete() method => Delete employee
  //   deleteEmployee(id){
  //     return this.http.delete<Employee>(this.apiURL + '/employees/' + id, this.httpOptions)
  //     .pipe(
  //       retry(1),
  //       catchError(this.handleError)
  //     )
  //   }

  // Error handling 
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}