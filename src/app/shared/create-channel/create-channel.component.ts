import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from './../../../environments/environment';

// Action
import { initialMedia, Media } from '../../models/media.model';
// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

// import { FileUploadService } from '../media/fakeService';
import { ProfileModal, initialTag } from '../../models/profile.model';
import { ProfileActions } from '../../actions/profile.action';

// Blog
import { TokenService } from '../../helpers/token.service';

@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.component.html',
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
  imageLink: string = environment.API_IMAGE;

  constructor(
    private fb: FormBuilder,
    private tokenService: TokenService,
    private store: Store<Media> ) {
      this.createChannelForm();
      this.typeSelected = false;
      this.handle = '';
      if (this.handle !== '') {
        this.handle = this.tokenService.getHandle();
      }
      this.tagState$ = this.store.select('profileTags');
      this.tagState$.subscribe((state) => {
        this.profileChannel = state;
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

    if ( this.channelForm.valid === true ) {
      const channelObj = {
        name: value.title,
        access: Number(value.privacy),
        description: value.desc,
        superType: 'channel',
        accessSettings : { access : Number(value.privacy) },
        owner: this.tokenService.getHandle(),
        industryList: [ value.type ] /** @TODO - To be removed! */
      }
// console.log(channelObj)
      this.store.dispatch({ type: ProfileActions.CHANNEL_SAVE, payload: channelObj });
    }
  }

}

