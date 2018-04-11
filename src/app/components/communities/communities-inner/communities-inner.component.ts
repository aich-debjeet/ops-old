import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

// Action
import { AuthActions } from '../../../actions/auth.action';
import { CommunitiesActions } from '../../../actions/communities.action';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription, ISubscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-communities-inner',
  templateUrl: './communities-inner.component.html',
  styleUrls: ['./communities-inner.component.scss']
})
export class CommunitiesInnerComponent implements OnInit {
  basePath = environment.API_IMAGE;
  id: any;
  tagState$: Observable<any>;
  private subscription: ISubscription;
  details: any;
  listInvitePeople: any;
  relatedCommunity: any;
  constructor(
    private fb: FormBuilder,
    private store: Store<any>,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.id = params['communitiesId'];
      this.communityDetails();
    });

    this.tagState$ = this.store.select('communitiesTags');
    this.subscription = this.tagState$.subscribe((state) => {
      if (typeof state !== 'undefined') {
        if (state['communityDetails']) {
          this.details = state['communityDetails'];
        }
        if (state['communityInvitePeople']) {
          this.listInvitePeople = state['communityInvitePeople'];
        }
        if (state['communityRelated']) {
          this.relatedCommunity = state['communityRelated'];
        }
      }
    });
  }

  ngOnInit() {
  }

  userJoin(join) {
    if (join === true) {
      const data = {
        communityId: this.id
      }
      this.store.dispatch({ type: CommunitiesActions.COMMUNITY_UNJOIN, payload: data });
    }else {

    }
  }

  communityDetails() {
    this.store.dispatch({ type: CommunitiesActions.COMMUNITY_DETAILS, payload: this.id });
    this.store.dispatch({ type: CommunitiesActions.COMMUNITY_INVITE_PEOPLE_LIST, payload: this.id });
    this.store.dispatch({ type: CommunitiesActions.COMMUNITY_RELATED, payload: this.id });
  }

}
