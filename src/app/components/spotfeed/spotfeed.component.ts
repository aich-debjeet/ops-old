import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { ProfileActions } from './../../actions/profile.action';
import { Spotfeed } from './../../models/profile.model';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { environment } from './../../../environments/environment'

@Component({
  selector: 'app-spotfeed',
  templateUrl: './spotfeed.component.html',
  styleUrls: ['./spotfeed.component.scss']
})
export class SpotfeedComponent implements OnInit {

  baseUrl: string;
  spotfeedId: string;
  spotfeedDetails: any;
  userState$: Observable<Spotfeed>;

  constructor(
    private route: ActivatedRoute,
    private _store: Store<Spotfeed>,
  ) {

    this.baseUrl = environment.API_IMAGE;

    this.userState$ = this._store.select('profileTags');

    this.spotfeedId = route.snapshot.params['id'];
    console.log(this.spotfeedId);
    this.userState$.subscribe((state) => {
      // this.spotfeedDetails = state.spotfeed_detail;
      console.log('this.spotfeedDetails');
      console.log(this.spotfeedDetails);
    });

    this._store.dispatch({ type: ProfileActions.GET_SPOTFEED_DETAILS, payload: this.spotfeedId });
  }

  ngOnInit() {
    this.spotfeedDetails = JSON.parse('{"SUCCESS":{"spotfeedImage":"images/J_6494D893_44ED_4C7C_9CF4_1903C2014498VIJILIN_KV_AEIONE_COM/2a507ecd-aa84-4cc9-b51b-0299b2ed65d8.jpg","spotfeedName":"dance","spotfeedCode":"DANCE","spotfeedDescription":"super","spotfeedTags":["#stage","#dance","#dance","#photography","#fitness","#dance","#dance","#dance","#dance","#dance","#dance","#dance"],"spotfeedProfiles":[{"image":"","name":"Yaswanth Raja","username":"YASWANTH","isFollowing":false},{"image":"","name":"Sindhu Dont know","username":"SINDHU","isFollowing":false}],"spotfeedMedia":[{"id":"q-22bf1360-77ac-41c8-97e3-a31a4658b8b6","mtype":"image","title":"Dancing","description":"super","contentType":"image","repopath":"images/J_6494D893_44ED_4C7C_9CF4_1903C2014498VIJILIN_KV_AEIONE_COM/fe4ddcd8-19ec-4098-b16a-de78d1979ff3.jpg","ownerHandle":"D_C16A5975_F110_4CE3_9D18_766B179B0285","ownerImage":"","ownerName":"Yaswanth Raja","spotsCount":0,"commentsCount":1,"channelName":"","channelId":""},{"id":"q-889a986e-edb0-4ebf-9d74-88b793976078","mtype":"image","title":"Fitness","description":"super","contentType":"image","repopath":"images/J_6494D893_44ED_4C7C_9CF4_1903C2014498VIJILIN_KV_AEIONE_COM/2a507ecd-aa84-4cc9-b51b-0299b2ed65d8.jpg","ownerHandle":"M_C0C76A20_5549_403B_A016_2EBF43B6B821","ownerImage":"","ownerName":"Sindhu Dont know","spotsCount":1,"commentsCount":0,"channelName":"","channelId":""}]}}');
    console.log(this.spotfeedDetails);
  }

}
