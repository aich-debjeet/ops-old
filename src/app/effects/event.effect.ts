import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {Observable} from 'rxjs/Rx'
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';

import { EventService } from '../services/event.service';
import { EventActions } from '../actions/event.action';

@Injectable()
export class EventEffect {
  constructor(
    private actions$: Actions,
    private router: Router,
    private eventService: EventService
  ) { }

}
