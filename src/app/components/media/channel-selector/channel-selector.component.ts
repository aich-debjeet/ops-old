import { Component, Output, Input, OnInit, EventEmitter} from '@angular/core';
import { Store } from '@ngrx/store';

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
  @Input() userChannels: any;
  counter: number;

  constructor(
    private fb: FormBuilder,
    private profileStore: Store<ProfileModal>
  ) {
      this.chosenChannel = null;
      this.counter = 0;
      this.createChannelForm();
  }

  /**
   * Choose a channela
   * @param channel
   */

  chooseChannel(channel: any) {
    this.chosenChannel = channel;
    this.onSelection.emit(channel);
  }

  /**
   * Make Channel
   */
  showChannelForm() {
    this.addChannel = !this.addChannel;
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
  createChannel(value: any) {
    const channelObj = {
      name: value.title,
      access: Number(value.privacy),
      description: value.desc,
      superType: 'channel',
      accessSettings : { access : Number(value.privacy) },
      owner: '',
      industryList: [ value.type ]
    }

    console.log('CREATE__CHANNEL', channelObj);

    this.onChannelCreate.emit(channelObj);
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

// On the Blog, part I met Aami, last Night, he was exploring options for the font, been collecting fonts in TypeKit, and MyFonts
