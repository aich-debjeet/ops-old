import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Media, initialMedia  } from '../../../models/media.model';

import { ModalService } from '../../../shared/modal/modal.component.service';
import { environment } from '../../../../environments/environment';

// action
import { MediaActions } from '../../../actions/media.action';
import { SharedActions } from '../../../actions/shared.action';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-recent-list',
  templateUrl: './recent-list.component.html',
  styleUrls: ['./recent-list.component.scss']
})
export class RecentListComponent implements OnInit {
  tagState$: Observable<Media>;
  userState$: Observable<Media>;
  private tagStateSubscription: Subscription;
  channel = initialMedia ;
  channelId: string;
  pageLoading: boolean;
  page_start = 0;
  page_end = 20;
  scrolling = 0;
  scrollingLoad = 1500;
  mediaType = 'all';
  imageBaseUrl = environment.API_IMAGE;
  delMedia: any;

  constructor(
    private _store: Store<Media>,
    private modalService: ModalService) {
      this.pageLoading = false;
      this.tagState$ = this._store.select('mediaStore');
      this.tagState$.subscribe((state) => {
        console.log('state', state)
        this.channel = state;
        this.pageLoading = this.channel.channel_loading;
        if (state['channel_detail']) {
          console.log(state.channel_detail)
          console.log(this.channel.channel_detail['channelId'])
        }
      });

      // Get my media status
      this.getMedia();
  }

  ngOnInit() {
  }

  onScroll(e) {
    this.scrolling = e.currentScrollPosition;
    if (this.scrollingLoad <= this.scrolling) {
      this.scrollingLoad += 1500
      this.page_start = this.page_end + 1;
      this.page_end += 15;
      this.getMedia();
    }
  }

  // Media Popup
  mediaOpenPopup(id) {
    this._store.dispatch({ type: MediaActions.MEDIA_DETAILS, payload: id});
    this._store.dispatch({ type: MediaActions.MEDIA_COMMENT_FETCH, payload: id});
  }

  /**
   * Delete Post
   */
  deletePost(media) {
    console.log('deleting media', media)
    this.channelId = media.channelId;
    this.delMedia = media;
    this._store.dispatch({ type: MediaActions.GET_CHANNEL_DETAILS, payload: this.channelId });
    // const posts = this.channel.channel_detail['media']
    // console.log('posts', posts)
    // const index: number = posts.indexOf(media);
    // console.log('index', index)
    // if (index !== -1) {
    //   posts.splice(index, 1);
    //   const id = media.id;
    //   this._store.dispatch({ type: MediaActions.MEDIA_POST_DELETE, payload: id});
    // }
  }

  mediaClosePopup() {
    this.modalService.close('mediaPopup');
  }

  filter(filter: string) {
    this.page_start = 0;
    this.page_end = 20;
    this.scrolling = 0;
    this.scrollingLoad = 1500;
    this.mediaType = filter;
    this.getMedia();
  }


  getMedia() {
    let data: any;
    if (this.mediaType === 'all') {
      data = {
        mediaCategory: 'recent',
        offset: this.page_start,
        limit: this.page_end
      }
    }else {
      data = {
        mediaType: this.mediaType,
        mediaCategory: 'recent',
        offset: this.page_start,
        limit: this.page_end
      }
    }
    this._store.dispatch({ type: MediaActions.LOAD_MY_MEDIA, payload: data });
  }
}
