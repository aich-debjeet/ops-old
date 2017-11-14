import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Store } from '@ngrx/store';
import { ProfileModal, initialTag  } from '../../models/profile.model';

import { ModalService } from '../../shared/modal/modal.component.service';

import { environment } from '../../../environments/environment';

// action
import { ProfileActions } from '../../actions/profile.action';
import { SharedActions } from '../../actions/shared.action';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AngularMasonry, MasonryOptions } from 'angular2-masonry';
@Component({
  selector: 'app-directory-list',
  templateUrl: './directory-list.component.html',
  styleUrls: ['./directory-list.component.scss']
})
export class DirectoryListComponent implements OnInit {
  tagState$: Observable<ProfileModal>;
  dirList: any;
  page_start = 0;
  page_end = 20;
  scrolling = 0;
  scrollingLoad = 1800;
  baseUrl = environment.API_IMAGE;
  searchText: string;
  profileType: any = 1;
  selectedOption = [];
  options = [
    {name: 'Inactive', value: 'inactive', checked: false},
    {name: 'Active', value: 'active', checked: false},
    {name: 'verified', value: 'verified', checked: false}
  ]

  constructor(
    private _store: Store<ProfileModal>,
    private route: ActivatedRoute,
  ) {
      this.tagState$ = this._store.select('profileTags');
      this.tagState$.subscribe((state) => {
        this.dirList = state['dir_list']
      });
      this.loadDir();
  }

  ngOnInit() {
  }

  updateCheckedOptions(option, event) {
    console.log(option)
    this.selectedOption = this.options.filter(opt => opt.checked).map(opt => opt.value);
    this.page_start = 0
    this.loadDir();
  }

  /**
   * While Typing Search
   */
  search() {
    this.page_start = 0
    this.loadDir();
  }


  /**
   * Organation and People select option
   */
  profileTypeOption(value) {
    this.page_start = 0
    this.loadDir();
  }

  /**
   * Call Directory API
   */
  loadDir() {
    const data = {
      isHuman: String(this.profileType),
      searchText: this.searchText,
      status: this.selectedOption,
      offset: this.page_start,
      limit: 20
    }
    this._store.dispatch({ type: ProfileActions.LOAD_DIRECTORY, payload: data });
  }

  /**
   * While Scrolling trigger directory api
   */
  onScroll(e) {
    this.scrolling = e.currentScrollPosition;
    if (this.scrollingLoad <= this.scrolling) {
      this.scrollingLoad += 1500
      this.page_start = this.page_end + 1;
      this.page_end += 15;
      this.loadDir();
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
      this._store.dispatch({ type: ProfileActions.PROFILE_UNFOLLOW, payload: handle });
    }else {
      this.dirList[index].extra.isFollowing = true;
      this._store.dispatch({ type: ProfileActions.PROFILE_FOLLOW, payload: handle  });
    }
  }



}
