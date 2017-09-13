import { Component, EventEmitter, Input, Output, OnInit, HostListener } from '@angular/core';
import { environment } from './../../../environments/environment';
import { DatePipe } from '@angular/common';
import FilesHelper from '../../helpers/fileUtils';

// Action
import { MediaActions } from '../../actions/media.action';
import { initialMedia, Media } from '../../models/media.model';
// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-media-popup',
  templateUrl: './media-popup.component.html',
  styleUrls: ['./media-popup.component.scss'],
  providers: [DatePipe]
})

export class MediaPopupComponent {
  imageLink: string = environment.API_IMAGE;
  @Input() data;
  @Input() comment;
  @Input() profileImage;
  @Output() onComment: EventEmitter<any> = new EventEmitter<any>();
  message: string;
  spot: boolean;
  private mediaStateSubscription: Subscription;
  mediaState$: Observable<Media>;
  mediaStore = initialMedia;
  private isDisplay = true;
  constructor(
    private store: Store<Media>
  ) {
    this.mediaState$ = store.select('mediaStore');
    this.mediaState$.subscribe((state) => {
      this.mediaStore = state;
      this.spot = false;
    });
  }

  keyDownFunction() {
    if (this.message !== null || this.message !== ' ') {
      this.onComment.emit(this.message);
      this.message = null;
    }
  }

  /**
   * Spot a Media
   * @param mediaId
   */
  spotMedia(mediaId: string) {
    this.spot = !this.spot;

    if (this.spot === true) {
      this.store.dispatch({ type: MediaActions.MEDIA_SPOT, payload: mediaId });
    }else {
      this.store.dispatch({ type: MediaActions.MEDIA_UNSPOT, payload: mediaId });
    }
  }

  checkFileType(fileName: string, fileType: string) {
    return FilesHelper.fileType(fileName, fileType);
  }

  beginEdit(el: HTMLElement): void {
    this.isDisplay = false;

    setTimeout(() => {
        el.focus();
    }, 100);
  }

  editDone(newText: string): void {
      this.isDisplay = true;
      // this.text = newText;
      // this.edit.emit(this.text);
  }
}
