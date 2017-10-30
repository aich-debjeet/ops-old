import { Component, Output, Input, OnInit, EventEmitter} from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/from';

import { ProfileModal, initialTag } from '../../../models/profile.model';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

import { ProfileActions } from '../../../actions/profile.action';

@Component({
  selector: 'app-channel-selector',
  templateUrl: './channel-selector.component.html',
  styleUrls: ['./channel-selector.component.scss']
})

export class ChannelSelectorComponent implements OnInit {
  addChannel: boolean;
  chosenChannel: any;
  tagState$: Observable<ProfileModal>;
  private tagStateSubscription: Subscription;
  profileChannel = initialTag ;
  channelForm: FormGroup;
  isChosen: boolean;
  @Output() onSelection: EventEmitter<any> = new EventEmitter();
  @Output() onChannelCreate: EventEmitter<any> = new EventEmitter();
  @Output() onPostMedia: EventEmitter<any> = new EventEmitter();
  @Input() userChannels: any;
  @Input() settingDisable: boolean;
  counter: number;
  channelCreatebtn: boolean = false;
  baseUrl = environment.API_IMAGE;

  channelName: String;
  channelPrivacy: any = 0;

  mediaPrivacy: any = 0;


  constructor(
    private fb: FormBuilder,
    private profileStore: Store<ProfileModal>
  ) {
      this.chosenChannel = null;
      this.counter = 0;
      // this.createChannelForm();
  }

  /**
   * Choose a channela
   * @param channel
   */

  chooseChannel(channel: any) {
    this.chosenChannel = channel;
    this.onSelection.emit(channel);
    console.log(this.chosenChannel);
  }

  choosePrivacy(value) {
    this.channelPrivacy = value
  }

  mediaPrivacyToggle(value) {
    this.mediaPrivacy = value
    console.log(value);
  }

  postMedia(value) {
    const data = {
      privacy: this.mediaPrivacy,
    }
    this.onPostMedia.emit(data);
  }

  /**
   * Make Channel
   */
  showChannelForm() {
    this.addChannel = !this.addChannel;
  }

  channelButton() {
    if (this.channelCreatebtn === true) {
      this.channelCreatebtn = false;
    }else {
      this.channelCreatebtn = true;
    }
  }

  /**
   * Status Form
   */
  createChannelForm() {
    this.channelForm = this.fb.group({
      title: ['', Validators.required ],
      type: ['', Validators.required ],
      desc: ['', Validators.required ],
      privacy: [0, Validators.required ],
      openess: [0]
    })
  }

  /**
   * Form Builder
   */
  createChannel() {
    const name = (this.channelName || '').trim().length === 0;

    if (!name) {
      const channelObj = {
        name: this.channelName,
        access: Number(this.channelPrivacy),
        // description: value.desc,
        superType: 'channel',
        accessSettings : { access : Number(this.channelPrivacy) },
        owner: '',
        // industryList: [ value.type ]
      }
      this.channelName = '';
      this.channelPrivacy = 0;
      this.onChannelCreate.emit(channelObj);
      this.channelCreatebtn = false;
    }
  }

  /**
   *
   */
  ngOnInit() {
    //
  }

  /**
   * Helper classes
   * @param file
   */
  isChosenChannel(channel: any) {
    if (this.chosenChannel === null) {
      return false;
    }else {
      if (this.chosenChannel.spotfeedId === channel.spotfeedId) {
        return true;
      } else {
        return false;
      }
    }
  }
}
