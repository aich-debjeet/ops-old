import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { SearchActions } from '../actions/search.action';
import { SearchService } from '../services/search.service';
import { OpportunityService } from '../services/opportunity.service';
import { EventService } from '../services/event.service';

@Injectable()
export class SearchEffect {

  @Effect()
  getWikiProfiles$ = this.actions$
    .ofType(SearchActions.SEARCH_WIKI_PROFILES)
    .debounceTime(500)
    .map(toPayload)
    .switchMap((payload) => this.apiService.getWikiProfiles(payload)
      .map(res => ({ type: SearchActions.SEARCH_WIKI_PROFILES_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: SearchActions.SEARCH_WIKI_PROFILES_FAILED, payload: res }))
    );

  @Effect()
  allSearch$ = this.actions$
    .ofType(SearchActions.SEARCH_ALL)
    .debounceTime(500)
    .map(toPayload)
    .switchMap((payload) => this.apiService.getAllSearchResult(payload)
      .map(res => ({ type: SearchActions.SEARCH_ALL_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: SearchActions.SEARCH_ALL_FAILED, payload: res }))
    );

  @Effect()
  peopleSearch$ = this.actions$
    .ofType(SearchActions.SEARCH_PEOPLE)
    .debounceTime(500)
    .map(toPayload)
    .switchMap((payload) => this.apiService.getPeople(payload)
      .map(res => ({ type: SearchActions.SEARCH_PEOPLE_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: SearchActions.SEARCH_PEOPLE_FAILED, payload: res }))
    );

  @Effect()
  postSearch$ = this.actions$
    .ofType(SearchActions.SEARCH_POST)
    .debounceTime(500)
    .map(toPayload)
    .switchMap((payload) => this.apiService.getPosts(payload)
      .map(res => ({ type: SearchActions.SEARCH_POST_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: SearchActions.SEARCH_POST_FAILED, payload: res }))
    );

  @Effect()
  channelSearch$ = this.actions$
    .ofType(SearchActions.SEARCH_CHANNEL)
    .debounceTime(500)
    .map(toPayload)
    .switchMap((payload) => this.apiService.getChannels(payload)
      .map(res => ({ type: SearchActions.SEARCH_CHANNEL_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: SearchActions.SEARCH_CHANNEL_FAILED, payload: res }))
    );

  @Effect()
  opportunitySearch$ = this.actions$
    .ofType(SearchActions.SEARCH_OPPORTUNITY)
    .debounceTime(500)
    .map(toPayload)
    .switchMap((payload) => this.opportunityService.searchOpportunities(payload)
      .map(res => ({ type: SearchActions.SEARCH_OPPORTUNITY_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: SearchActions.SEARCH_OPPORTUNITY_FAILED, payload: res }))
    );

  @Effect()
  eventSearchData$ = this.actions$
    .ofType(SearchActions.SEARCH_EVENT)
    .debounceTime(500)
    .map(toPayload)
    .switchMap((payload) => this.eventService.eventSearchData(payload)
      .map(res => ({ type: SearchActions.SEARCH_EVENT_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: SearchActions.SEARCH_EVENT_FAILED, payload: res }))
    );

  constructor(
      private actions$: Actions,
      private apiService: SearchService,
      private eventService: EventService,
      private opportunityService: OpportunityService
  ) {}
}
