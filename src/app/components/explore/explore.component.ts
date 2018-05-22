import { ChangeDetectionStrategy, Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription, ISubscription } from 'rxjs/Subscription';

// actions
import { ExploreActions } from 'app/actions/explore.action';
import { ProfileActions } from 'app/actions/profile.action';

// store
import { Store } from '@ngrx/store';

// models
import { ExploreModel, initialExploreTag } from 'app/models/explore.model';

// pipes
import { TruncatePipe } from 'app/pipes/truncate.pipe';

// services

// rx
import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment';



@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
  providers: [ TruncatePipe ],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExploreComponent implements OnInit, AfterViewInit, OnDestroy {

  userState$: Observable<any>;
  userProfile: any;
  exploreState$: Observable<any>;
  profileSpotfeeds: any;
  mergedSpotfeeds: any;
  baseUrl: string;
  showPreloader = true;
  recordsPerPage = 8;
  pagination = [];
  private profileSubscription: ISubscription;
  private exploreSubscription: ISubscription;

  constructor(
    private store: Store<ExploreModel>
  ) {
    this.baseUrl = environment.API_IMAGE;

    this.userState$ = this.store.select('profileTags');
    this.profileSubscription = this.userState$.subscribe((state) => {
      // get current profiles spotfeeds
      if (state && state.home_spotfeeds && state.home_spotfeeds.SUCCESS) {
        this.profileSpotfeeds = state.home_spotfeeds.SUCCESS;
      }
    });

    /**
     * check explore state
     */
    this.exploreState$ = this.store.select('exploreTags');
    this.exploreSubscription = this.exploreState$.subscribe((state) => {
      // get all spotfeeds
      if (state && state.explore_spotfeeds && state.explore_spotfeeds) {
        this.mergedSpotfeeds = state.explore_spotfeeds
      }
      // check if loaded
      if (state && state.searching_spotfeeds === false && state.search_complete === true) {
        this.showPreloader = false;
      }
    })
  }

  ngAfterViewInit() {
    const params = {
      industryType: '',
      offset: 0,
      limit: this.recordsPerPage
    };
    this.store.dispatch({ type: ExploreActions.LOAD_SPOTFEEDS, payload: params });

    this.store.dispatch({ type: ProfileActions.LOAD_HOME_PAGE_SPOTFEEDS });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.profileSubscription.unsubscribe();
    this.exploreSubscription.unsubscribe();
  }
}
