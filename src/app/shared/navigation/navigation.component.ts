import { Component, Directive, OnInit, HostListener, Renderer, ElementRef, HostBinding } from '@angular/core';
import { ModalService } from '../modal/modal.component.service';
import { Store } from '@ngrx/store';
import { ProfileModal, initialTag } from '../../models/profile.model';

// action
import { ProfileActions } from '../../actions/profile.action';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { environment } from '../../../environments/environment';

import { MediaComponent } from '../../components/media/media.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  providers: [ ModalService ],
  styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent implements OnInit {

  topNav = {
    status: { open: false },
    channel: { open: false },
    search: { open: false },
    notification: { open: false },
    message: { open: false },
    profile: { open: false }
  };

  baseUrl: string;
  showMenu: boolean;
  tagState$: Observable<ProfileModal>;
  private tagStateSubscription: Subscription;
  userProfile = initialTag ;

  constructor(
    private store: Store<ProfileModal>,
    public modalService: ModalService,
    private el: ElementRef,
    private renderer: Renderer
  ) {


    this.baseUrl = environment.API_IMAGE;
    this.tagState$ = this.store.select('profileTags');

    this.tagState$.subscribe((state) => {
      this.userProfile = state;
    });

    this.store.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE });
  }

  /**
   * Add Media
   */
  addMedia() {
    this.modalService.open('AddMedia');
  }

  /**
   * Create channel
   */
  createChannel() {
    this.modalService.open('CreateChannel');
  }

  /**
   * Create a community
   */
  createCommunity() {
    //
  }

  ngOnInit() {
  }


}

