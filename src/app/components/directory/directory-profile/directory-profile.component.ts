import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DirectoryModel } from '../../../models/directory.model';
import { DirectoryActions } from '../../../actions/directory.action';
import { Observable } from 'rxjs/Observable';
import { GeneralUtilities } from '../../../helpers/general.utils';

@Component({
  selector: 'app-directory-profile',
  templateUrl: './directory-profile.component.html',
  styleUrls: ['./directory-profile.component.scss']
})
export class DirectoryProfileComponent implements OnInit, OnDestroy {

  routerSub: ISubscription;
  profileId: string;
  showPreloader = true;
  dirState$: Observable<DirectoryModel>;
  dirState: any;
  dirSub: ISubscription;
  profileDetails: any;
  // profileFound: boolean;
  defaultImage = 'https://s3-us-west-2.amazonaws.com/ops.defaults/user-avatar-male.png';

  constructor(
    private dirStore: Store<DirectoryModel>,
    private route: ActivatedRoute,
    private router: Router,
    private gUtils: GeneralUtilities
  ) {
    this.dirState$ = this.dirStore.select('directoryTags');
    this.dirSub = this.dirState$.subscribe((state) => {
      this.dirState = state;
      if (state) {
        if (
          this.gUtils.checkNestedKey(state, ['getDirectoryProfile']) && state['getDirectoryProfile'] === false &&
          this.gUtils.checkNestedKey(state, ['getDirectoryProfileSuccess']) && state['getDirectoryProfileSuccess'] === true
        ) {
          this.showPreloader = false;
          if (this.gUtils.checkNestedKey(state, ['getDirectoryProfileData'])) {
            if (state['getDirectoryProfileData'] === null) {
              // this.profileFound = false;
              // this.router.navigateByUrl('/page-not-found');
            } else {
              // this.profileFound = true;
              this.profileDetails = state['getDirectoryProfileData'];
            }
          }
        }
      }
    });
  }

  ngOnInit() {
    this.routerSub = this.route.params.subscribe(params => {
      if (params['id']) {
        this.profileId = params['id'];
        this.dirStore.dispatch({ type: DirectoryActions.GET_PROFILE, payload: this.profileId });
      }
    });
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
  }

}
