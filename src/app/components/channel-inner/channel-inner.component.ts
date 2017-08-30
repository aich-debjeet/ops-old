import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {ActivatedRoute} from '@angular/router';
import { Store } from '@ngrx/store';
import { Media, initialMedia  } from '../../models/media.model';
import { ModalService } from '../../shared/modal/modal.component.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

// action
import { MediaActions } from '../../actions/media.action';
import { SharedActions } from '../../actions/shared.action';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-channel-inner',
  templateUrl: './channel-inner.component.html',
  providers: [ModalService, DatePipe],
  styleUrls: ['./channel-inner.component.scss']
})
export class ChannelInnerComponent implements OnInit {
  tagState$: Observable<Media>;
  private tagStateSubscription: Subscription;
  public editForm: FormGroup;
  channel = initialMedia ;
  channelId: string;

  constructor(
    private http: Http,
    private channelStore: Store<Media>,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private modalService: ModalService
  ) {
    this.channelId = route.snapshot.params['id'];
    this.tagState$ = this.channelStore.select('mediaStore');
    this.tagState$.subscribe((state) => {
      console.log(state);
      this.channel = state;
    });
    this.channelStore.dispatch({ type: MediaActions.GET_CHANNEL_DETAILS, payload: this.channelId });
    this.buildEditForm();
  }
  // 'b_53f49036-15dd-407c-9c31-db09abe742d0'
  ngOnInit() {
  }

   /**
   * Form initial value
   */
  buildEditForm(): void {
    this.editForm = this.fb.group({
      'name' : ['' , [Validators.required]],
      'bio' : ['' , [Validators.required]],
      // 'access' : ['' , [Validators.required]],
      // 'industry' : ['' , [Validators.required]],
    })
  }

  editPopup(data) {
    console.log(data);
    this.editForm.patchValue({
      name: data.channelName,
      bio: data.description,
      access: '',
      industry: ''
    });
    this.modalService.open('editform');
  }

  closePopup() {
    console.log('close form');
    this.modalService.close('editform');
  }

}
