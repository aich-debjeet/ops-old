import { Component, OnInit, EventEmitter, Input, AfterViewInit, Output } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../../../environments/environment';
import { ModalService } from '../../../shared/modal/modal.component.service';

import { Http, Headers, Response } from '@angular/http';

import FilesHelper from '../../../helpers/fileUtils';

// Action
import { MediaActions } from '../../../actions/media.action';
import { initialMedia, Media } from '../../../models/media.model';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-channel-edit',
  templateUrl: './channel-edit.component.html',
  providers: [ ModalService ],
  styleUrls: ['./channel-edit.component.scss']
})

export class EditChannelComponent implements OnInit{
  imageLink: string = environment.API_IMAGE;
  messageText: string;
  channelForm: FormGroup;
  private mediaStateSubscription: Subscription;
  mediaState$: Observable<Media>;
  editState$: Observable<any>;
  mediaStore = initialMedia;
  editValues: any;
  people: any;
  tags: any;
  private apiLink: string = environment.API_ENDPOINT;
  constructor(
    private fb: FormBuilder,
    private http: Http,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<Media>
  ) {

    this.mediaState$ = store.select('mediaStore');
    this.editState$ = store.select('mediaStore').take(5);

    this.mediaState$.subscribe((state) => {
      this.mediaStore = state;
    });
  }

  checkEmpty(obj: Object) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  ngOnInit() {
    this.store.dispatch({ type: MediaActions.GET_CHANNEL_DETAILS, payload: 'f_d910bb3c-da2d-4be8-b8f0-bbbfc0a3a7bf' });

    // Watch for Changes
    this.editState$.subscribe(event => {
      console.log('[WATCHER]');
      this.editValues = event;

      const channel = event.channel_detail;
      console.log('CHANNEL', channel);

      this.channelForm = this.fb.group({
        title: [channel.channelName, Validators.required ],
        type: ['', Validators.required ],
        desc: [channel.description, Validators.required ],
        privacy: [0, Validators.required ],
        openess: [1]
      })
    });
  }

  /**
   * Close
   */
  doClose(event) {
    console.log('do close');
    this.router.navigate(['.', { outlets: { media: null } }], {
      relativeTo: this.route.parent
    });
  }

  /**
   * Upate Form
   * @param formValue
   */
  updateChannel(formValue: any) {
    //
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
   * Get people search
   */

  public requestAutocompleteItems = (text: string): Observable<Response> => {
    const url  = this.apiLink + '/portal/searchprofiles/1/' + text + '/0/10';
    return this.http
      .get(url)
      .map(data => data.json());
  };
}
