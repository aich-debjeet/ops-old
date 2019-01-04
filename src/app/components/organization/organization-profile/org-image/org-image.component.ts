import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { ProfileModal } from '../../../../models/profile.model';
import { ModalService } from '../../../../shared/modal/modal.component.service';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs/Rx';
import { GeneralUtilities } from 'app/helpers/general.utils';
import { OrganizationActions } from 'app/actions/organization.action';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-org-image',
  templateUrl: './org-image.component.html',
  providers: [ ModalService ]
})
export class OrgImageComponent implements OnInit, OnDestroy {

  tagState$: Observable<ProfileModal>;
  baseUrl = environment.API_IMAGE;
  profileImage: string;
  orgHandle: string;
  profSub: ISubscription;

  constructor(
    private _location: Location,
    private profStore: Store<ProfileModal>,
    private gUtils: GeneralUtilities
  ) {
    this.tagState$ = this.profStore.select('profileTags');
    this.profSub = this.tagState$.subscribe((state) => {
      if (this.gUtils.checkNestedKey(state, ['organization_details', 'profileImage']) && state['organization_details']['profileImage'] !== '') {
        this.profileImage = this.baseUrl + state['organization_details']['profileImage'];
        this.orgHandle = state['organization_details'].handle;
      } else {
        this.profileImage = 'https://s3-us-west-2.amazonaws.com/ops.defaults/user-avatar-male.png';
      }
    });
  }

  ngOnInit() { }

  saveImageClick(imgData) {
    const imageData = {
      imageType: 'profile',
      handle: this.orgHandle,
      image: imgData.split((/,(.+)/)[1])
    };
    this.profStore.dispatch({ type: OrganizationActions.ORG_PROFILE_IMAGE_UPLOAD, payload: imageData });
    this.profStore.select('profileTags')
      .first(org => org['orgProfileImageUploaded'] === true)
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
