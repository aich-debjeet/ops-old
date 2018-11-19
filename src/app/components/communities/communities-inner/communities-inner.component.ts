import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgxfUploaderService, UploadEvent, FileError } from 'ngxf-uploader';
import { TokenService } from '../../../helpers/token.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Modal } from '../../../shared/modal-new/Modal';
import { SharedActions } from '../../../actions/shared.action';

// pipes
import { TruncatePipe } from 'app/pipes/truncate.pipe';


// Action
import { AuthActions } from '../../../actions/auth.action';
import { MediaActions } from '../../../actions/media.action';
import { CommunitiesActions } from '../../../actions/communities.action';

// rx
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';
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
  private profileSubscription: ISubscription;
  private industrySubscription: ISubscription;

  searchField: FormControl;
  memberSearch: FormControl;


  page_start = 0;
  page_end = 20;
  scrolling = 0;
  scrollingLoad = 100;

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
  profileState$: Observable<any>;
  fileData: File;
  api_path = environment.API_ENDPOINT;
  base = this.api_path + '/portal/cdn/media/upload/multiple';
  token: any;
  handle: any;
  userData: any;
  reportId: string;
  constructor(
    private fb: FormBuilder,
    private store: Store<any>,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private Upload: NgxfUploaderService,
    private api: TokenService
  ) {
    this.token = this.api.getToken();

    this.routerSubscription = this.route.params.subscribe(params => {
      this.id = params['communitiesId'];
      this.communityDetails();
    });

    this.industryState$ = store.select('loginTags');
    this.industrySubscription = this.industryState$.subscribe((state) => {
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

      this.profileState$ = store.select('profileTags');
      this.profileSubscription = this.profileState$.subscribe(event => {
        this.userData = event['profile_navigation_details']
        if (event.profile_navigation_details && event.profile_navigation_details.handle) {
          this.handle = event.profile_navigation_details.handle;
        }
      });
    });

    // Member admin change form init
    this.communityAdminFormInit();
  }

  ngOnInit() {
    this.buildForm();
    this.store.dispatch({ type: AuthActions.LOAD_INDUSTRIES });

    // Search leave popup
    this.searchField = new FormControl();
    this.searchField.valueChanges
      .debounceTime(400)
      .subscribe(name => {
        this.comunityMemberFetch(name);
      });

    // Member search invite people
      this.memberSearch = new FormControl();
      this.memberSearch.valueChanges
        .debounceTime(400)
        .subscribe(name => {
          this.comunityInvitePeopleFetch(name);
        });

    // this.searchInput.valueChanges
    // .debounceTime(500)
    // .subscribe(() => {
    //   // this.loadCommunity();
    // });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.routerSubscription.unsubscribe();
    this.profileSubscription.unsubscribe();
    this.industrySubscription.unsubscribe();
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
    } else {
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
    this.searchField.setValue('');
    this.communityAdminFormInit();
    this.CommuityLeaveModal.open();
  }

  reportModalOpen(id: string){
    // console.log(id)
    this.reportId = id;
  //  this.modalService.open('reportPopUp');
  console.log('calling api');
   this.store.dispatch({ type: SharedActions.GET_OPTIONS_REPORT, payload: 'community' });
 }

  comunityMemberFetch(text = '', page = 0, page_limit = 20) {
    const data = {
      id: this.id,
      text: text,
      page: page,
      page_limit: page_limit
    }
    this.store.dispatch({ type: CommunitiesActions.COMMUNITY_MEMBER_LIST, payload: data });
  }

  onScroll(e) {
    this.scrolling = e.currentScrollPosition;
    if (this.scrollingLoad <= this.scrolling) {
      this.scrollingLoad += 100
      this.page_start = this.page_start + 20;
      this.comunityMemberFetch(this.searchField.value, this.page_start)

    }
  }

  /**
   * submit member form
   */
  submitMemberAdmin(value) {
    if ( this.communityAdminForm.valid === true ) {
      this.CommuityLeaveModal.close();
      this.CommunityLeaveConfirmModal.open();
    } else {
      this.toastr.warning('Please select admin', '', {
        timeOut: 3000
      });
    }
  }

  adminLeaveSucess() {
    const handle = this.communityAdminForm.value.handle
    const data = {
      memberHandle: handle,
      communityId: this.id
    }

    this.store.dispatch({ type: CommunitiesActions.COMMUNITY_ADMIN_CHANGE, payload: data});
    this.toastr.success('You have successfully left this community', 'Success!', {
      timeOut: 3000
    });
    this.CommunityLeaveConfirmModal.close();
  }

  /**
   * Get All Community Details
   */
  communityDetails() {
    this.store.dispatch({ type: CommunitiesActions.COMMUNITY_DETAILS, payload: this.id });
    this.comunityInvitePeopleFetch();
    this.store.dispatch({ type: CommunitiesActions.COMMUNITY_RELATED, payload: this.id });
    this.store.dispatch({ type: CommunitiesActions.COMMUNITY_POST_GET, payload: this.id });
  }

  /**
   * Get Inivite people
   */
  comunityInvitePeopleFetch(text = '', page = 0, page_limit = 20) {
    const data = {
      id: this.id,
      text: text,
      page: page,
      page_limit: page_limit
    }
    this.store.dispatch({ type: CommunitiesActions.COMMUNITY_INVITE_PEOPLE_LIST, payload: data });
  }

  /**
   * Delete community
   */
  communityDelete() {
    this.store.dispatch({ type: CommunitiesActions.COMMUNITY_DELETE, payload: this.id });
    this.store.select('communitiesTags')
    .first(channel => channel['communnity_delete'] === true)
    .subscribe( datas => {
        this.toastr.success('Your community has been successfully deleted', 'Success!', {
          timeOut: 3000
        });
        this.router.navigateByUrl('/communities');
        return
    });
  }

  /**
   * Delete Post
   */
  deletePost(media) {
    const posts = this.communityPost;
    const index: number = posts.indexOf(media);
    if (index !== -1) {
      posts.splice(index, 1);
      const id = media.id;
      this.store.dispatch({ type: MediaActions.MEDIA_POST_DELETE, payload: id});
    }
  }

  /**
   * Invite people to community
   */
  inviteToCommunity(handle) {
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
      'community_name' : [ this.details.title, [Validators.required, Validators.maxLength(50)]],
      'brief': ['', [Validators.required, Validators.maxLength(150)]],
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
        this.toastr.success('Your community has been successfully updated', 'Update', {
          timeOut: 3000
        });
        this.CommunityUpdate.close();
        return
      });
    } else {
      this.toastr.warning('Please fill all required fields', '', {
        timeOut: 3000
      });
    }
  }

  /**
   * Multiple File Upload
   * @param files
   */
  uploadFileList(file: File | FileError): void {
    if (!(file instanceof File)) {
      this.alertError(file);
      return;
    }

    this.Upload.upload({
      url: this.base,
      headers: { Authorization: 'Bearer ' + this.token },
      params: { handle: this.handle },
      files: file,
    }).subscribe(
      (event: UploadEvent) => {
        if (event.data) {
          // @TODO__URGENT Make list appendable for files
          const latestUploaded = event.data['SUCCESS'];
          if (latestUploaded) {
            const data = {
              id: this.details.communityId,
              body: {
                image: latestUploaded[0].repoPath
              }
            }
            this.store.dispatch({ type: CommunitiesActions.COMMUNITY_UPDATE, payload: data });
          }
        }
      },
      (err) => {
        //
      },
      () => {
        //
      });
  }

  // Do something you want when file error occur.
  alertError(msg: FileError) {
    switch (msg) {
      case FileError.NumError:
        alert('Number Error');
        break;
      case FileError.SizeError:
        alert('Size Error');
        break;
      case FileError.TypeError:
        alert('Type Error');
        break;
    }
  }
}
