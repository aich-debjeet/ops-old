import { Component, OnInit, EventEmitter, Input, AfterViewInit, Output, OnChanges, ViewChild, Inject} from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../../../environments/environment';
import { ModalService } from '../../../shared/modal/modal.component.service';

import FilesHelper from '../../../helpers/fileUtils';

import { PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

// Action
import { MediaActions } from '../../../actions/media.action';
import { ProfileActions } from '../../../actions/profile.action';
import { initialMedia, Media } from '../../../models/media.model';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';

import { UtcDatePipe } from './../../../pipes/utcdate.pipe';

@Component({
  selector: 'app-media-block',
  templateUrl: './media-block.component.html',
  providers: [ ModalService, UtcDatePipe ],
  styleUrls: ['./media-block.component.scss']
})
export class MediaBlockComponent implements OnInit {

  public metaShow: Meta;
  imageLink: string = environment.API_IMAGE;
  domainLink: string = environment.API_DOMAIN;
  chosenChannel: any = 0;
  @Input() userChannels;
  @Input() profileImage;
  @Output() onComment: EventEmitter<any> = new EventEmitter<any>();
  @Output() onMediaNext: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('firstModal') modal: any;
  messageText: string;
  statusForm: FormGroup;
  private mediaStateSubscription: Subscription;
  mediaState$: Observable<Media>;
  mediaStore = initialMedia;
  mediaId: string;
  mediaType: string;
  sub: any;
  data: any;
  comments: any;
  commentCount: number;
  spot: boolean;
  spotCount: number;
  message: boolean;
  channelId: string;
  deleteMsg: boolean;
  isEdit: boolean;
  editMsg: boolean;

  constructor(
    private meta: Meta,
    title: Title,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private store: Store<Media>
  ) {
    this.spot = false;
    this.mediaState$ = store.select('mediaStore');

    this.mediaState$.subscribe((state) => {
      this.mediaStore = state;
      this.channelId = this.mediaStore.channel_detail['channelId']
      this.data = this.mediaStore.media_detail;
      this.spotCount = this.mediaStore.media_detail.spotsCount;
      this.mediaType = this.mediaStore.media_detail.mtype;
      this.mediaId = this.mediaStore.media_detail.id;
      this.spot = this.mediaStore.media_detail.isSpotted;
      this.comments = this.mediaStore.media_comment;
      if (state['media_edit_msg'] && this.editMsg) {
       this.store.dispatch({ type: MediaActions.GET_CHANNEL_DETAILS, payload: this.channelId });
       this.toastr.success('Post Edited');
       this.doClose(event);
       this.editMsg = false;
     }
    });

    store.select('mediaStore').take(6).subscribe((state) => {
      this.commentCount = this.mediaStore.media_detail.commentsCount;
      if (state['media_delete_msg'] && this.deleteMsg) {
        this.store.dispatch({ type: MediaActions.GET_CHANNEL_DETAILS, payload: this.channelId });
        this.toastr.warning('Post Deleted');
        this.doClose(event);
        this.deleteMsg = false;
      }
    });

    title.setTitle('OPS - Media');

    this.store.select('mediaStore')
    .first(media => media['media_detail'].channelId)
    .subscribe( data => {
      this.meta.updateTag({ name: 'description', content: data['media_detail'].description });
      this.meta.updateTag({ property: 'og:image', content: this.imageLink + data['media_detail'].thumbNails.large });
      this.meta.updateTag({ property: 'og:url', content: this.domainLink + 'media/' + data['media_detail'].id });
      this.meta.updateTag({ property: 'og:type', content: 'Media' });
      this.meta.updateTag({ property: 'og:title', content: 'OPS - Media' });
      this.meta.updateTag({ property: 'og:description', content: data['media_detail'].description });
      this.meta.updateTag({ property: 'og:image:width', content: '640' });
      this.meta.updateTag({ property: 'og:image:height', content: '442'});
      this.meta.updateTag({ property: 'fb:app_id', content: '678678015828014' });
    });
    this.loadMedia();
  }

  ngOnInit() {
    // this.meta.addTags([
    //     { name: 'description', content: 'Media Title working' },
    //     { property: 'og:image', content: 'https://cdn.onepagespotlight.com/images/N_79749C80_8FD1_4048_942A_75B6BDF7090F/9450954a-c7f6-45d4-8931-eea4a8bc63f2_lar.jpeg' }
    //   ]);
    //   this.metaShow = this.meta;
  }

  closeFunction() {
    this.doClose(event);
  }

  mediaNext(value) {
    this.onMediaNext.emit(value);
  }

  checkEmpty(obj: Object) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  /**
   * Load Particular Media
   */
  loadMedia() {
    this.sub = this.route.params.subscribe(params => {
      if (!this.checkEmpty(params)) {
        this.store.dispatch({ type: MediaActions.MEDIA_DETAILS, payload: params['id']});
        // comment fetch
        const send = {
          'media_id': params['id'],
          'commentType': this.mediaType
        }
        this.store.dispatch({ type: MediaActions.MEDIA_COMMENT_FETCH, payload: send });
      }
    });
  }

  navToprofile() {
    this.router.navigate(['/profile'], { skipLocationChange: false });
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
    this.spot = !this.spot;
    if (this.spot === true) {
      this.spotCount++;
      this.store.dispatch({ type: MediaActions.MEDIA_SPOT, payload: data });
    } else {
      this.spotCount--;
      this.store.dispatch({ type: MediaActions.MEDIA_UNSPOT, payload: data });
    }
  }

  checkFileType(fileName: string, fileType: string) {
    return FilesHelper.fileType(fileName, fileType);
  }

  /**
   * Close
   */
  doClose(event) {
    this.router.navigate(['.', { outlets: { media: null } }], {
      relativeTo: this.route.parent
    });
  }

   /**
   * Submit Comment
   */
  sbComment(param) {
    if (param === 'Del') {
      this.commentCount--
      this.store.dispatch({ type: ProfileActions.COMMENT_COUNT_DECREMENT, payload: this.mediaId });
    } else {
      this.commentCount++
      this.store.dispatch({ type: ProfileActions.COMMENT_COUNT_INCREMENT, payload: this.mediaId });
    }
  }
  deletePost(data) {
    this.deleteMsg = true;

    if (data.id !== 'undefined') {
      const id = data.id;
      this.store.dispatch({ type: MediaActions.MEDIA_POST_DELETE, payload: id});
    }
  }

  onContentEdit() {
    this.isEdit = true;
  }

  onCommentEdit(message) {
    this.isEdit = false;
    this.editMsg = true;

    const data = {
      'id' : this.data.id,
      'description' : message
    }
    this.store.dispatch({ type: MediaActions.MEDIA_EDIT, payload: data});
  }

  

}
