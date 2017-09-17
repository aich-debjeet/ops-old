import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../../../environments/environment';

import FilesHelper from '../../../helpers/fileUtils';
import { ModalService } from '../../../shared/modal/modal.component.service';

// Action
import { MediaActions } from '../../../actions/media.action';
import { initialMedia, Media } from '../../../models/media.model';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-media-view',
  templateUrl: './media-view.component.html',
  providers: [ ModalService ],
  styleUrls: ['./media-view.component.scss']
})

export class MediaViewComponent {
  imageLink: string = environment.API_IMAGE;
  chosenChannel: any = 0;
  @Input() userChannels;
  statusForm: FormGroup;
  private mediaStateSubscription: Subscription;
  mediaState$: Observable<Media>;
  mediaStore = initialMedia;
  mediaId: string;
  sub: any;
  data: any;
  spot: boolean;
  spotCount: number;
  message: boolean;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<Media>
  ) {
    this.spot = false;
    this.mediaState$ = store.select('mediaStore');
    this.mediaState$.subscribe((state) => {
      this.mediaStore = state;
      this.data = this.mediaStore.media_detail;
      this.spotCount = this.mediaStore.media_detail.spotsCount;
    });

    this.loadMedia();
  }

  checkEmpty(obj: Object) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  /**
   * Load Particular Media
   */
  loadMedia() {
    this.sub = this.route.params.subscribe(params => {
      console.log(params);
      if (!this.checkEmpty(params)) {
        this.store.dispatch({ type: MediaActions.MEDIA_DETAILS, payload: params['id']})
      }
    });
  }

  // keyDownFunction() {
  //   if (this.message !== null || this.message !== ' ') {
  //     this.onComment.emit(this.message);
  //     this.message = null;
  //   }
  // }

  /**
   * Spot a Media
   * @param mediaId
   */
  spotMedia(mediaId: string) {
    this.spot = !this.spot;
    if (this.spot === true) {
      this.spotCount++;
      this.store.dispatch({ type: MediaActions.MEDIA_SPOT, payload: mediaId });
    }else {
      this.spotCount--;
      this.store.dispatch({ type: MediaActions.MEDIA_UNSPOT, payload: mediaId });
    }
  }

  checkFileType(fileName: string, fileType: string) {
    return FilesHelper.fileType(fileName, fileType);
  }

  /**
   * Close
   */
  doClose() {
    this.router.navigate(['.', { outlets: { media: null } }], {
      relativeTo: this.route.parent
    });
  }
}
