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
export class CommunitiesInnerComponent implements OnInit, OnDestroy {
  basePath = environment.API_IMAGE;
  id: any;
  tagState$: Observable<any>;
  private subscription: ISubscription;
  private routerSubscription: ISubscription;
  details: any;
  list: any;
  listInvitePeople: any;
  relatedCommunity: any;
  communityPost: any;
  postLoader: boolean;
  inviteBtnActive: boolean = true;
  public communityForm: FormGroup;
  selectedIndustry = '';
  constructor(
    private fb: FormBuilder,
    private store: Store<any>,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.routerSubscription = this.route.params.subscribe(params => {
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
        if (state['community_post']) {
          this.communityPost = state['community_post'];
        }
        if (state['post_loader']) {
          this.postLoader = state['post_loader'];
        }
        if (state['invite_button']) {
          this.inviteBtnActive = state['invite_button'];
        }
        if (state['communityList']) {
          this.list = state['communityList'];
        }
      }
    });
  }

  ngOnInit() {
    this.buildForm();
    this.store.dispatch({ type: AuthActions.LOAD_INDUSTRIES });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    // this.routerSubscription.unsubscribe();
  }

  /**
   * Join to community
   */
  userJoin(join) {
    if (join === true) {
      const data = {
        communityId: this.id
      }
      this.store.dispatch({ type: CommunitiesActions.COMMUNITY_UNJOIN, payload: data });
    }else {

    }
  }

  /**
   * Get All Community Details
   */
  communityDetails() {
    this.store.dispatch({ type: CommunitiesActions.COMMUNITY_DETAILS, payload: this.id });
    this.store.dispatch({ type: CommunitiesActions.COMMUNITY_INVITE_PEOPLE_LIST, payload: this.id });
    this.store.dispatch({ type: CommunitiesActions.COMMUNITY_RELATED, payload: this.id });
    this.store.dispatch({ type: CommunitiesActions.COMMUNITY_POST_GET, payload: this.id });
  }

  /**
   * Delete community
   */
  communityDelete() {
    this.store.dispatch({ type: CommunitiesActions.COMMUNITY_DELETE, payload: this.id });
    this.store.select('communitiesTags')
    .first(channel => channel['communnity_delete'] === true)
    .subscribe( datas => {
          this.toastr.success('successfully Delete', 'Success!');
          this.router.navigateByUrl('/communities');
          return
    });
  }

  /**
   * Invite people to community
   */
  inviteToCommunity(handle) {
    console.log(handle)
    const sender = {
      id: this.id,
      data: {
        membersHandles: [handle]
      }
    }
    this.store.dispatch({ type: CommunitiesActions.COMMUNITY_INVITE_PEOPLE, payload: sender });
  }

  buildForm() {
    this.communityForm = this.fb.group({
      'community_name' : ['', [Validators.required]],
      'brief': ['', [Validators.required]],
      'access': [0, [Validators.required]],
      'industry': ['', [Validators.required]]
    })

  }

}
