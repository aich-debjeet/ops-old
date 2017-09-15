import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

// Action
import { MediaActions } from '../../../actions/media.action';
import { initialMedia, Media } from '../../../models/media.model';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-status-editor',
  templateUrl: './status-editor.component.html',
  styleUrls: ['./status-editor.component.scss']
})

export class StatusEditorComponent {
  chosenChannel: any = 0;
  @Input() userChannels;
  statusForm: FormGroup;
  private mediaStateSubscription: Subscription;
  mediaState$: Observable<Media>;
  mediaStore = initialMedia;
  constructor(
    private fb: FormBuilder,
    private store: Store<Media>
  ) {
    this.createStatusForm();
    // Reducer Store
    this.mediaState$ = store.select('mediaStore');
    this.mediaState$.subscribe((state) => {
      this.mediaStore = state;
    });
  }
  /**
   * on Channel Selection
   */
  onChannelSelection(channel: any) {
    this.chosenChannel = channel;
  }

  /**
   * Status Form
   */
  submitStatusForm(value: any) {
    if ( this.statusForm.valid === true ) {
      const postStatus = {
        owner: '',
        feed_type: 'status',
        title: '',
        description: value.status,
        access: 0,
        active: true
      };

      this.postStatus( postStatus );
    }
  }
  /**
   * Post Status
   * @param req
   */
  postStatus(req: any) {
    this.store.dispatch({ type: MediaActions.STATUS_SAVE, payload: req });
  }
  /**
   * Status Form
   */
  createStatusForm() {
    this.statusForm = this.fb.group({
      status : ['', Validators.required ],
      privacy: [ 0 ]
    })
  }
}
