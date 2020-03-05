import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import AppConfig from '../../assets/config.json';

import { User } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // Define API
  apiURL = AppConfig.apiURL;

  constructor(private http: HttpClient) {
    // console.log('this.apiURL: ', this.apiURL)
  }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  login(user_id, password) {
    let url = this.apiURL + '/login';
    // console.log('----this.apiURL: ', url)
    return this.http.post(url,{user_id, password})
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

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
