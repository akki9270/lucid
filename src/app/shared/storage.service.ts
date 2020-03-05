import { Injectable } from '@angular/core';
import { User } from '../models/users';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { USER } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { 
    let userData = sessionStorage[USER];
    if (userData) {
      this.setUserData(JSON.parse(userData));
    }
  }

   private getUser = new Subject<User>();

   getUserData(): Observable<User> {
      return this.getUser.asObservable();
   };

   setUserData(user: User) {
     this.getUser.next(user);
   }
}
