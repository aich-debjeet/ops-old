import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Modal } from '../../../shared/modal-new/Modal';

// pipes
import { TruncatePipe } from 'app/pipes/truncate.pipe';


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
  styleUrls: ['./communities-inner.component.scss'],
  providers: [ TruncatePipe ]
})
export class CommunitiesInnerComponent implements OnInit, OnDestroy {
  @ViewChild('searchInput') searchInput;
  searchString = '';
  basePath = environment.API_IMAGE;
  id: any;
  industries: any[];
  tagState$: Observable<any>;
  @ViewChild('communityCreateModal') CommunityUpdate: Modal;
  @ViewChild('communityLeaveModal') CommuityLeaveModal: Modal;
  @ViewChild('communityLeaveConfirmModal') CommunityLeaveConfirmModal: Modal;

  private subscription: ISubscription;
  private routerSubscription: ISubscription;
  details: any;
  list: any;
  listInvitePeople: any;
  relatedCommunity: any;
  memeberList: any;
  communityPost: any;
  postLoader: boolean = false;
  inviteBtnActive: boolean = true;
  public communityForm: FormGroup;
  public communityAdminForm: FormGroup;
  selectedIndustry = '';
  isMemeberLoading: boolean = false;
  communityLoading: boolean = false;
  updateCommunityLoading: boolean = false;
  industryState$: Observable<any>;
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

    this.industryState$ = store.select('loginTags');
    this.industryState$.subscribe((state) => {
      if (typeof state !== 'undefined') {
        this.industries = state.industries;
      }
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
        if (state['invite_button']) {
          this.inviteBtnActive = state['invite_button'];
        }
        if (state['communityList']) {
          this.list = state['communityList'];
        }
        if (state['community_member_list']) {
          this.memeberList = state['community_member_list']
        }
        this.isMemeberLoading = state['community_ismember_loading'];
        this.communityLoading = state['community_loding'];
        this.updateCommunityLoading = state['community_update_loading'];
        this.postLoader = state['post_loading'];
      }
    });

    // Member admin change form init
    this.communityAdminFormInit();
  }

  ngOnInit() {
    this.buildForm();
    this.store.dispatch({ type: AuthActions.LOAD_INDUSTRIES });

    // this.searchInput.valueChanges
    // .debounceTime(500)
    // .subscribe(() => {
    //   // this.loadCommunity();
    //   console.log('test');
    // });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    // this.routerSubscription.unsubscribe();
  }

  // Comunity member to admin form
  communityAdminFormInit() {
    this.communityAdminForm = this.fb.group({
      'handle': ['', [Validators.required]],
    });
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
      const data = {
        communityId: this.id
      }
      this.store.dispatch({ type: CommunitiesActions.COMMUNITY_JOIN, payload: data });
    }
  }

  communityEdit() {
    this.CommunityUpdate.open();
    this.communityForm.patchValue({
      community_name: this.details.title,
      brief: this.details.brief,
      access: this.details.access,
      industry: this.details.industryList[0]
    });
  }

  communityLeave() {
    const data = {
      id: this.id,
      text: ''
    }
    this.store.dispatch({ type: CommunitiesActions.COMMUNITY_MEMBER_LIST, payload: data });
    this.communityAdminFormInit();
    this.CommuityLeaveModal.open();
  }

  /**
   * submit member form
   */
  submitMemberAdmin(value) {
    if ( this.communityAdminForm.valid === true ) {
      this.CommuityLeaveModal.close();
      this.CommunityLeaveConfirmModal.open();
    }else {
      this.toastr.warning('Please select admin');
    }
  }

  adminLeaveSucess() {
    const handle = this.communityAdminForm.value.handle
    const data = {
      memberHandle: handle,
      communityId: this.id
    }

    this.store.dispatch({ type: CommunitiesActions.COMMUNITY_ADMIN_CHANGE, payload: data});

    this.toastr.success('successfully Update', 'Success!');
    this.CommunityLeaveConfirmModal.close();
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
      'community_name' : [ this.details.title, [Validators.required]],
      'brief': ['', [Validators.required]],
      'access': [0, [Validators.required]],
      'industry': ['', [Validators.required]]
    })

  }

  /**
   * Community Update
   * @param value 
   */
  submitForm(value) {
    if ( this.communityForm.valid === true ) {
      const data = {
        id: this.details.communityId,
        body: {
          title: value.community_name,
          brief: value.brief,
          accessSettings: {
            access: Number(value.access)
          },
          industryList: [ value.industry ]
        }
      }
      this.store.dispatch({ type: CommunitiesActions.COMMUNITY_UPDATE, payload: data });

      this.store.select('communitiesTags')
      .first(channel => channel['community_update_success'] === true)
      .subscribe( datas => {
        this.toastr.success('successfully Update', 'Success!');
        this.CommunityUpdate.close();
        return
      });
    }else {
      this.toastr.warning('Please fill all required fields');
    }
  }

}
