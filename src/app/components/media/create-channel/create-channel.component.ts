import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

import { ModalService } from '../../../shared/modal/modal.component.service';

// Action
import { MediaActions } from '../../../actions/media.action';
import { initialMedia, Media } from '../../../models/media.model';
import { AuthActions } from '../../../actions/auth.action';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

// import { FileUploadService } from '../media/fakeService';
import { ProfileModal, initialTag } from '../../../models/profile.model';
import { ProfileActions } from '../../../actions/profile.action';
import { environment } from './../../../../environments/environment';

import { map as _map } from 'lodash';
import { ToastrService } from 'ngx-toastr';

// Blog
import { TokenService } from '../../../helpers/token.service';

@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.component.html',
  providers: [ModalService],
  styleUrls: ['./create-channel.component.scss']
})

export class CreateChannelComponent implements OnInit {
  typeSelected: boolean;
  channelForm: FormGroup;
  tagState$: Observable<ProfileModal>;
  loginTagState$: Observable<any>;
  private tagStateSubscription: Subscription;
  profileChannel = initialTag ;
  channelType: number;
  handle: string;
  channelSavedHere: boolean;
  channelSaved = false;
  people: any;
  tags: any;
  private apiLink: string = environment.API_ENDPOINT;
  industries: any[];
  selectedIndustry = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private http: Http,
    private tokenService: TokenService,
    private store: Store<Media> ) {
      this.createChannelForm();
      this.typeSelected = false;
      this.channelSaved = false;
      this.channelSavedHere = false;
      this.people = [];

      this.handle = '';
      if (this.handle !== '') {
        this.handle = this.tokenService.getHandle();
      }

      this.loginTagState$ = store.select('loginTags');
      this.loginTagState$.subscribe((state) => {
        this.industries = state.industries;
      });

      this.tagState$ = this.store.select('profileTags');
      this.tagState$.subscribe((state) => {
        this.profileChannel = state;
        this.channelSaved = this.profileChannel.channel_saved;

        // Success message
        if (this.channelSavedHere && this.channelSaved === true ) {
          this.toastr.success('Channel Created');
          this.createChannelForm();
          this.channelSavedHere = false;
        }
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
    // Clear All Tags
    this.people = [];
    this.tags = [];

    // Empty initiate form
    this.channelForm = this.fb.group({
      title: ['', Validators.required ],
      type: ['', Validators.required ],
      desc: ['', Validators.required ],
      privacy: [0, Validators.required ],
      openess: [1]
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
        flag = ['image'];
        break;
      case 2:
        flag = ['video'];
        break;
      case 3:
        flag = ['audio'];
        break;
      case 4:
        flag = ['text'];
        break;
      default:
        flag = ['image', 'video', 'audio', 'text'];
        break;
    }
    return flag;
  }

  /**
   * Get people search
   */

  public requestAutocompleteItems = (text: string): Observable<Response> => {
    const url  = this.apiLink + '/portal/searchprofiles/1/' + text + '/0/10';
    return this.http
      .get(url)
      .map(data => data.json());
  };

  handledObject(n) {
    return { handle: n.handle }
  }

  /**
   * Form Builder
   */
  createChannel(value: any) {
    const userHandle = this.profileChannel.profileUser.handle || '';
    const mediaTypeList = this.channelTypeConfig(this.channelType);

    // Get only handles from user list
    const peopleListAll = this.people;
    const peopleList = _map(peopleListAll, 'handle');

    const peopleListList = [];

    for (const i of peopleList) {
      peopleListList.push({ handle: i });
    }

    let otherFields = {};
    if (peopleListList.length > 0 ) {
      otherFields = { contributerList: peopleListList }
    }

    if ( this.channelForm.valid === true && userHandle !== '' ) {

      const channelObj = {
        name: value.title,
        access: Number(value.privacy),
        description: value.desc,
        superType: 'channel',
        accessSettings : { access : Number(value.privacy) },
        owner: userHandle,
        industryList: [ value.type ],
        mediaTypes: mediaTypeList,
        otherFields
      }

      this.channelSavedHere = true;
      this.store.dispatch({ type: ProfileActions.CHANNEL_SAVE, payload: channelObj });
    } else {
      this.toastr.warning('Please fill all required fields');
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

  /**
   * Load List of Skills (High Level)
   */
  industriesList() {
    this.store.dispatch({ type: AuthActions.LOAD_INDUSTRIES});
  }

  ngOnInit() {
      // loading industry list
      this.industriesList();
  }

}

