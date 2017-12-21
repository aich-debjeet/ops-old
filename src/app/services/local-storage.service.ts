import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LocalStorageService {

  accountStatusValue = new Subject();
  constructor() { }

  set theAccountStatus(value) {
    this.accountStatusValue.next(value); // this will make sure to tell every subscriber about the change.
    localStorage.setItem('active_profile', value);
  }

  get theAccountStatus() {
    return localStorage.getItem('active_profile');
  }

}
