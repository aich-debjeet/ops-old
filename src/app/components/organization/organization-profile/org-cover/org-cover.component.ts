import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProfileModal } from '../../../../models/profile.model';
import { ModalService } from '../../../../shared/modal/modal.component.service';
import { Location } from '@angular/common';

import { OrganizationActions } from '../../../../actions/organization.action';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';
import { GeneralUtilities } from 'app/helpers/general.utils';

@Component({
  selector: 'app-org-cover',
  templateUrl: './org-cover.component.html',
  providers: [ ModalService ]
})
export class OrgCoverComponent implements OnInit, OnDestroy {

  tagState$: Observable<ProfileModal>;
  baseUrl = environment.API_IMAGE;
  coverImage: string;
  orgHandle: string;
  profSub: ISubscription;

  constructor(
    private _location: Location,
    private profStore: Store<ProfileModal>,
    private gUtils: GeneralUtilities
  ) {
    this.tagState$ = this.profStore.select('profileTags');
    this.profSub = this.tagState$.subscribe((state) => {
      if (this.gUtils.checkNestedKey(state, ['organization_details', 'coverImage']) && state['organization_details']['coverImage'] !== '') {
        this.coverImage = this.baseUrl + state['organization_details']['coverImage'];
        this.orgHandle = state['organization_details'].handle;
      } else {
        this.coverImage = 'https://s3-us-west-2.amazonaws.com/ops.defaults/user-avatar-male.png';
      }
    });
  }

  ngOnInit() { }

  saveImageClick(imgData) {
    const imageData = {
      imageType: 'coverImage',
      handle: this.orgHandle,
      image: imgData.split((/,(.+)/)[1])
    };
    this.profStore.dispatch({ type: OrganizationActions.ORG_COVER_IMAGE_UPLOAD, payload: imageData });
    this.profStore.select('profileTags')
      .first(org => org['orgCoverImageUploaded'] === true)
      .subscribe( data => {
        this.isClosed(null);
      });
  }

  isClosed(event?: any) {
    this._location.back();
  }

  ngOnDestroy() {
    this.profSub.unsubscribe();
  }

}
