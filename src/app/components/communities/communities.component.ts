import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Modal } from '../../shared/modal-new/Modal';

// Action
import { AuthActions } from '../../actions/auth.action';
import { CommunitiesActions } from '../../actions/communities.action';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription, ISubscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-communities',
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.scss']
})
export class CommunitiesComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('searchInput') searchInput;
  @ViewChild('communityCreateModal') CommunityCreate: Modal;
  searchString = '';
  industries: any[];
  basePath = environment.API_IMAGE;
  public communityForm: FormGroup;
  industryState$: Observable<any>;
  tagState$: Observable<any>;
  private subscription: ISubscription;
  selectedIndustry = '';
  status: string;
  query: string;
  list: any;
  community_load: boolean;
  communityTag: any;
  scrolling = 0;
  scrollingLoad = 700;
  community_scroll_id: any = null;
  constructor(
    private fb: FormBuilder,
    private store: Store<any>,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.status = 'recommended';
    this.query = '';

    this.industryState$ = store.select('loginTags');
    this.industryState$.subscribe((state) => {
      if (typeof state !== 'undefined') {
        this.industries = state.industries;
      }
    });

    this.tagState$ = this.store.select('communitiesTags');
    this.subscription = this.tagState$.subscribe((state) => {
      if (typeof state !== 'undefined') {
        if (state['communityList']) {
          this.list = state['communityList'];
        }

        this.communityTag = state['communityTags'];
        this.community_scroll_id = state['community_scrollId'];

        if (state['community_loading'] !== null) {
          this.community_load = state['community_loading'];
        }
      }
    });

    this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        if (params['status']) {
          this.status = params['status'];
          this.scrollingLoad = 0;
          this.loadCommunity(null);
        }
        // this.serachApi();
      });

      this.loadCommunity(null);
  }

  ngOnInit() {
    this.buildForm();
    this.store.dispatch({ type: AuthActions.LOAD_INDUSTRIES });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  createForm() {
    this.buildForm();
    this.CommunityCreate.open();
  }

  loadCommunity(scrollId: any) {
    const list = {
      scrollId: scrollId,
      searchText: this.searchString,
      searchType: this.status,
    }

    this.store.dispatch({ type: CommunitiesActions.COMMUNITY_LIST, payload: list });
  }

  buildForm() {
    this.communityForm = this.fb.group({
      'community_name' : ['', [Validators.required]],
      'brief': ['', [Validators.required]],
      'access': [0, [Validators.required]],
      'industry': ['', [Validators.required]]
    })

  }

  submitForm(value) {
    if ( this.communityForm.valid === true ) {
      const data = {
        title: value.community_name,
        brief: value.brief,
        accessSettings: {
          access: Number(value.access)
        },
        industryList: [ value.industry ]
      }
      this.store.dispatch({ type: CommunitiesActions.COMMUNITY_CREATE, payload: data });

      this.store.select('communitiesTags')
      .first(channel => channel['community_create_success'] === true)
      .subscribe( datas => {
          if (datas['completed']) {
            const id = datas['completed']['SUCCESS'].id;
            this.toastr.success('successfully created', 'Success!');
            this.router.navigateByUrl('/communities/' + id);
            return
          }
      });
    }else {
      this.toastr.warning('Please fill all required fields');
    }
  }

  onScroll(e) {
    console.log(e);
    this.scrolling = e.currentScrollPosition;
    if (this.scrollingLoad <= this.scrolling) {
      this.scrollingLoad += 700
      this.loadCommunity(this.community_scroll_id)
      // this.profileStore.dispatch({ type: ProfileActions.LOAD_USER_FOLLOWING_POSTS, payload: data });
    }
  }

  ngAfterViewInit() {

    /**
     * Observing the search input change
     */
    this.searchInput.valueChanges
    .debounceTime(500)
    .subscribe(() => {
      this.loadCommunity(null);
    });

  }
}
