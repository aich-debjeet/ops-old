import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import FilesHelper from '../../helpers/fileUtils';
import { initialMedia, Media } from '../../models/media.model';
import { MediaActions } from '../../actions/media.action';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { ModalService } from '../../shared/modal/modal.component.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  providers: [ ModalService, DatePipe ],
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() mediaData;
  @Input() className: string;
  @Input() type: string;
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() postDelete = new EventEmitter();
  dotMenuState: boolean;
  comments: any;
  userData: any;
  following: boolean;
  followingCount: any;
  commentCount: any;
  mediaId: any;
  mediaType: any;
  mediaStore = initialMedia;
  mediaState$: Observable<Media>;
  reportId: string;

  userImage: string;

  imageLink: string = environment.API_IMAGE;
  questions: any;
  reportType: string;

  constructor(
    private router: Router,
    private store: Store<Media>,
    public modalService: ModalService,
  ) {
    this.dotMenuState = false;
    this.mediaState$ = store.select('mediaStore');

    this.mediaState$.subscribe((state) => {
      this.mediaStore = state;
      if (state['reports']) {
        this.questions = state['reports'];
        this.reportType = 'post';
        // console.log(this.questions)
      }
    });

  }

  ngOnInit() {
    if (!this.mediaData.ownerImage) {
      this.userImage = 'https://s3-us-west-2.amazonaws.com/ops.defaults/user-avatar-male.png';
    } else {
      this.userImage = this.imageLink + this.mediaData.ownerImage;
    }

    this.following = this.mediaData.isSpotted;
    this.followingCount = this.mediaData.spotsCount;
    this.mediaId = this.mediaData.id;
    this.mediaType = this.mediaData.mtype;
    this.commentCount = this.mediaData.commentsCount;
    this.comments = this.mediaData.commentsList;
    // console.log(this.mediaId)
  }

  /**
   * Delete Media from Channel
   * @param event
   */
  deleteMedia(channel: any) {
  }

  handleClick(id) {
    this.router.navigateByUrl('/media/' + id);
  }

  checkFileType(fileName: string, fileType: string) {
    return FilesHelper.fileType(fileName, fileType);
  }

  dotMenuOpen() {
    this.dotMenuState = !this.dotMenuState;
  }

  onContentDelete(content) {
    this.postDelete.next(content);
  }

  /**
   * Spot a Media
   * @param mediaId
   */
  spotMedia(mediaId: string) {
    const data = {
      'mediaType': this.mediaType,
      'id': this.mediaId
    }
    if (this.following === false) {
      this.following = true;
      this.followingCount++;
      this.store.dispatch({ type: MediaActions.MEDIA_SPOT, payload: data });
    }else {
      this.store.dispatch({ type: MediaActions.MEDIA_UNSPOT, payload: data });
      this.following = false
      this.followingCount--;
    }
  }

  /**
   * Submit Comment
   */
  sbComment(param) {
    if (param === 'Del') {
      this.commentCount--
    }else {
      this.commentCount++
    }
  }

    /** 
   * open report modal
  */
 reportModalOpen(id: string){
  //  console.log(id)
   this.reportId = id;
  this.modalService.open('reportPopUp');
  this.store.dispatch({ type: MediaActions.MEDIA_POST_REPORT, payload: 'post' });
}
closeReport(){
  // console.log('comming')
  this.modalService.close('reportPopUp');
}

}
