import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LocalStorageService {

  accountStatusValue = new Subject();
  constructor() { }

  set theAccountStatus(value) {
    // console.log('local storage SET called');
    this.accountStatusValue.next(value); // this will make sure to tell every subscriber about the change.
    localStorage.setItem('accountStatus', value);
  }

  get theAccountStatus() {
    // console.log('local storage GET called');
    return localStorage.getItem('accountStatus');
  }

}
