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
  scrollingLoad = 2000;
  baseUrl = environment.API_IMAGE;
  searchText: string;
  profileType: any = 1;

  constructor(
    private _store: Store<ProfileModal>,
    private route: ActivatedRoute,
  ) {
      this.tagState$ = this._store.select('profileTags');
      this.tagState$.subscribe((state) => {
        console.log(state);
        this.dirList = state['dir_list']
      });
      this.loadDir();
  }

  ngOnInit() {
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
  profileTypeOption() {
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
      offset: this.page_start,
      limit: this.page_end
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

}
