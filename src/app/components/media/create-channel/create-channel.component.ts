import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

import { ModalService } from '../../../shared/modal/modal.component.service';

// Action
import { MediaActions } from '../../../actions/media.action';
import { initialMedia, Media } from '../../../models/media.model';
// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

// import { FileUploadService } from '../media/fakeService';
import { ProfileModal, initialTag } from '../../../models/profile.model';
import { ProfileActions } from '../../../actions/profile.action';

// Blog
import { TokenService } from '../../../helpers/token.service';

@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.component.html',
  providers: [ModalService],
  styleUrls: ['./create-channel.component.scss']
})

export class CreateChannelComponent {
  typeSelected: boolean;
  channelForm: FormGroup;
  tagState$: Observable<ProfileModal>;
  private tagStateSubscription: Subscription;
  profileChannel = initialTag ;
  channelType: number;
  handle: string;
  channelSaved = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private tokenService: TokenService,
    private store: Store<Media> ) {
      this.createChannelForm();
      this.typeSelected = false;
      this.channelSaved = false;

      this.handle = '';
      if (this.handle !== '') {
        this.handle = this.tokenService.getHandle();
      }

      this.tagState$ = this.store.select('profileTags');
      this.tagState$.subscribe((state) => {
        this.profileChannel = state;
        this.channelSaved = this.profileChannel.channel_saved;
      });
    }


  showCreatechannelform(channelType: number) {
    this.channelType = channelType;
    this.typeSelected = true;
  }

  /**
   * Status Form
   */
  createChannelForm() {
    this.channelForm = this.fb.group({
      title: ['New Channel', Validators.required ],
      type: ['', Validators.required ],
      desc: ['Soem rand desc', Validators.required ],
      privacy: [0, Validators.required ],
      openess: [0]
    })
  }

  /**
   * Limit Channel Media Type based on Selection
   * @param type
   */
  channelTypeConfig(type: number) {
    let flag;
    switch (type) {
      case 1:
        flag = 'Image';
        break;
      case 2:
        flag = 'Audio';
        break;
      case 3:
        flag = 'Video';
        break;
      case 4:
        flag = 'Text';
        break;
      default:
        flag = 'All';
        break;
    }
    return flag;
  }

  /**
   * Form Builder
   */
  createChannel(value: any) {
    const userHandle = this.profileChannel.profileUser.handle || '';
    if ( this.channelForm.valid === true && userHandle !== '' ) {
      const channelObj = {
        name: value.title,
        access: Number(value.privacy),
        description: value.desc,
        superType: 'channel',
        accessSettings : { access : Number(value.privacy) },
        owner: userHandle,
        industryList: [ value.type ]
      }

      this.store.dispatch({ type: ProfileActions.CHANNEL_SAVE, payload: channelObj });
    }
  }

  /**
   * Close
   */
  doClose(input: any) {
    this.router.navigate(['.', { outlets: { media: null } }], {
      relativeTo: this.route.parent
    });
  }
}
