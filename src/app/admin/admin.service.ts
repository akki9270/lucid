import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor() { }
  private confirmDialogue = new Subject<any>();

  updateConfirmDialogue(data) {
    this.confirmDialogue.next(data);
  }

  showConfirmDialogue() {
    return this.confirmDialogue.asObservable();
  }
  
}
