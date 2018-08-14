import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Store } from '@ngrx/store';

// rx
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';
import { ProfileModal } from '../../../models/profile.model';
import { environment } from 'environments/environment';
import { ProfileActions } from '../../../actions/profile.action';
import { DirectoryActions } from '../../../actions/directory.action';
import { DirectoryModel } from '../../../models/directory.model';

@Component({
  selector: 'app-directory-list',
  templateUrl: './directory-list.component.html',
  styleUrls: ['./directory-list.component.scss']
})
export class DirectoryListComponent implements OnInit, OnDestroy {
  profileState$: Observable<ProfileModal>;
  directoryState$: Observable<DirectoryModel>;
  dirList: any;
  page_start = 0;
  page_end = 20;
  scrolling = 0;
  scrollingLoad = 1400;
  baseUrl = environment.API_IMAGE;
  searchText: string;
  profileType: any = 1;
  selectedOption = [];
  dir_scroll_id: any = '';
  options = [
    {name: 'Inactive', value: 'inactive', checked: false},
    {name: 'Active', value: 'active', checked: false},
    {name: 'verified', value: 'verified', checked: false}
  ]

  private profSub: ISubscription;
  private dirSub: ISubscription;

  constructor(
    private profileStore: Store<ProfileModal>,
    private directoryStore: Store<DirectoryModel>,
    private route: ActivatedRoute,
  ) {
    this.profileState$ = this.profileStore.select('profileTags');
    this.profSub =  this.profileState$.subscribe((state) => {});
    this.directoryState$ = this.directoryStore.select('directoryTags');
    this.dirSub =  this.directoryState$.subscribe((state) => {
      if (state) {
        if (state.dir_list_loaded) {
          this.dir_scroll_id = state.user_directory_scroll_id;
          this.dirList = state.dir_list;
        }
      }
    });
    this.loadDir('');
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  updateCheckedOptions(option, event) {
    this.scrollingLoad = 1400;
    this.selectedOption = this.options.filter(opt => opt.checked).map(opt => opt.value);
    this.page_start = 0
    this.loadDir('');
  }

  /**
   * While Typing Search
   */
  search() {
    this.page_start = 0
    this.loadDir('');
  }


  /**
   * Organation and People select option
   */
  profileTypeOption(value) {
    this.scrollingLoad = 1400;
    this.page_start = 0
    this.loadDir('');
  }

  /**
   * Call Directory API
   */
  loadDir(scroll_id: any) {
    const data = {
      isHuman: String(this.profileType),
      searchText: this.searchText,
      status: this.selectedOption,
      offset: this.page_start,
      limit: 20,
      name: {
        scrollId: scroll_id
      }
    }
    this.directoryStore.dispatch({ type: DirectoryActions.LOAD_DIRECTORY, payload: data });
  }

  /**
   * While Scrolling trigger directory api
   */
  onScroll(e) {
    this.scrolling = e.currentScrollPosition;
    if (this.scrollingLoad <= this.scrolling) {
      this.scrollingLoad += 1000
      this.page_start = this.page_end + 1;
      this.page_end += 15;
      this.loadDir(this.dir_scroll_id );
    }
  }

  /**
   * User Follow function
   * @param dir List of current user
   * @param index Index of array
   */
  userFollow(dir, index) {
    const handle = this.dirList[index].handle;
    if (this.dirList[index].extra.isFollowing) {
      this.dirList[index].extra.isFollowing = false;
      this.profileStore.dispatch({ type: ProfileActions.PROFILE_UNFOLLOW, payload: handle });
    }else {
      this.dirList[index].extra.isFollowing = true;
      this.profileStore.dispatch({ type: ProfileActions.PROFILE_FOLLOW, payload: handle  });
    }
  }

  ngOnDestroy() {
    this.profSub.unsubscribe();
    this.dirSub.unsubscribe();
  }

}
