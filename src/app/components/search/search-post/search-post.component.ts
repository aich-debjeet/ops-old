import { Component, OnInit } from '@angular/core';

import { SearchActions } from './../../../actions/search.action';
import { SearchModel } from './../../../models/search.model';
import { MediaActions } from '../../../actions/media.action';

import { Media, initialMedia  } from '../../../models/media.model';

import { environment } from './../../../../environments/environment.prod';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';

@Component({
  selector: 'app-search-post',
  templateUrl: './search-post.component.html',
  styleUrls: ['./search-post.component.scss']
})
export class SearchPostComponent implements OnInit {

  searchState$: Observable<SearchModel>;
  baseUrl: string;

  posts: any[];

  constructor(
    private _store: Store<Media>,
    private store: Store<SearchModel>
  ) {

    this.baseUrl = environment.API_IMAGE;
    this.searchState$ = this.store.select('searchTags');

  }

  ngOnInit() {

    // observe the store value
    this.searchState$.subscribe((state) => {
      // console.log('searchState', state);
      if (state && state.search_post_data) {
        this.posts = state.search_post_data;
      }
    });

  }

  // Media Popup
  mediaOpenPopup(id) {
    this._store.dispatch({ type: MediaActions.MEDIA_DETAILS, payload: id});
    this._store.dispatch({ type: MediaActions.MEDIA_COMMENT_FETCH, payload: id});
  }

  /**
   * Delete Post
   */
  deletePost(post) {
    const posts = this.posts;
    const index: number = posts.indexOf(post);
    if (index !== -1) {
      posts.splice(index, 1);
      const id = post.id;
      this._store.dispatch({ type: MediaActions.MEDIA_POST_DELETE, payload: id});
    }
  }

}
