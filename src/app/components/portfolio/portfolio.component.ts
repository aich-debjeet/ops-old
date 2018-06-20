import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileModal } from '../../models/profile.model';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { ISubscription } from 'rxjs/Subscription';
import { ModalService } from '../../shared/modal/modal.component.service';
import { ProfileActions } from '../../actions/profile.action';
import { GeneralUtilities } from '../../helpers/general.utils';
import { environment } from 'environments/environment.dev2';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit, OnDestroy {

  profileState$: Observable<ProfileModal>;
  profileSub: ISubscription;
  profileState: any;
  userProfile: any;
  channels = [];
  portfolioEmpty = true;
  baseImageUrl = environment.API_IMAGE;
  ownProfile: boolean;

  // router subscription
  routerSub: any;
  medias = [{
    type: 'image',
    repoPath: ''
  }, {
    type: 'audio',
    repoPath: ''
  }, {
    type: 'video',
    repoPath: ''
  }];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profileStore: Store<ProfileModal>,
    public modalService: ModalService,
    private generalUtils: GeneralUtilities
  ) {
    this.profileState$ = this.profileStore.select('profileTags');
    this.profileSub = this.profileState$.subscribe((state) => {
      this.profileState = state;
      if (state) {
        if (this.generalUtils.checkNestedKey(state, ['portfolio_user_profile'])) {
          this.userProfile = state['portfolio_user_profile'];
          const loggedInProfileHandle = localStorage.getItem('loggedInProfileHandle');
          if (typeof this.ownProfile === 'undefined' && loggedInProfileHandle) {
            if (state['portfolio_user_profile']['handle'] === loggedInProfileHandle) {
              this.ownProfile = true;
            } else {
              this.ownProfile = false;
            }
          }
        }
      }
    });
  }

  ngOnInit() {
    this.routerSub = this.route.params.subscribe((params) => {
      // load user profile by username
      if (this.generalUtils.checkNestedKey(params, ['username'])) {
        this.profileStore.dispatch({ type: ProfileActions.PROFILE_LOAD, payload: params['username'] });
      } else {
        this.router.navigateByUrl('/');
      }
    });
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
  }

  /**
   * show modal and popuplate the media
   */
  addWork() {
    this.modalService.open('addWorkModal');
  }

}
