import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal/modal.component.service';

import { Store } from '@ngrx/store';
import { ProfileModal, initialTag } from '../../models/profile.model';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { environment } from '../../../environments/environment.prod';

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
    private profileStore: Store<ProfileModal>,
    public modalService: ModalService,
  ) {
    this.baseUrl = environment.API_IMAGE;
    this.tagState$ = this.profileStore.select('profileTags');
    // this.test = 'salabeel';
    this.tagState$.subscribe((state) => {
      this.userProfile = state;
    });
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
  /**
   * Show/Hide Menu
   */
  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  ngOnInit() {
  }

  toggleNav(elem: string) {
    console.log(this.topNav[elem]);
    if (this.topNav[elem].open === true) {
      this.topNav[elem].open = false;
    } else {
      this.topNav[elem].open = true;
    }
  }

}
