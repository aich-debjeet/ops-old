import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/from';

import { ProfileModal, initialTag } from '../../models/profile.model';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

import { ProfileActions } from '../../actions/profile.action';

@Component({
  selector: 'app-channel-selector',
  templateUrl: './channel-selector.component.html',
  styleUrls: ['./channel-selector.component.scss']
})

export class ChannelSelectorComponent {
  addChannel: boolean;
  chosenChannel: any;
  tagState$: Observable<ProfileModal>;
  private tagStateSubscription: Subscription;
  profileChannel = initialTag ;
  channelForm: FormGroup;
  handle: string;
  token: string;
  isChosen: boolean;

  constructor( private fb: FormBuilder, private profileStore: Store<ProfileModal>) {

      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.handle = localStorage.getItem('currentUserID');
      this.token = currentUser.access_token; // your token

      this.createChannelForm();
      this.chosenChannel = null;
      this.tagState$ = this.profileStore.select('profileTags');

      this.tagState$.subscribe((state) => {
        this.profileChannel = state;
        if (this.handle) {
          console.log(this.handle);
          this.profileStore.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_CHANNEL, payload: this.handle });
        }else {
          console.log('no handle');
        }
      });
  }

  /**
   * Choose a channel
   * @param channel
   */

  chooseChannel(channel: any) {
    this.chosenChannel = channel;
  }

  /**
   * Form Builder
   */
  createChannel(value: any) {
    const accessVal = parseInt(value.privacy, 0);

    if ( this.channelForm.valid === true ) {
      const channelObj = {
        name: value.title,
        access: value.privacy,
        description: value.desc,
        superType: 'channel',
        accessSettings : { access : accessVal },
        owner: this.handle,
        industryList: [ 'DANCE'] /** @TODO - To be removed! */
      }

      this.profileStore.dispatch({ type: ProfileActions.CHANNEL_SAVE, payload: channelObj });
    }
  }

  /**
   * Status Form
   */
  createChannelForm() {
    this.channelForm = this.fb.group({
      title: ['New Channel', Validators.required ],
      desc: ['Soem rand desc', Validators.required ],
      privacy: [0, Validators.required ]
    })
  }

  /**
   * Make Channel
   */
  showChannelForm() {
    this.addChannel = !this.addChannel;
  }

  /**
   * Helper classes
   * @param file
   */
  isChosenChannel(channel: any) {
    if (this.chosenChannel === null && this.chosenChannel.length < 1 ) {
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
