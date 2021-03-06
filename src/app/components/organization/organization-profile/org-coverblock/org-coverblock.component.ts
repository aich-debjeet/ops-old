import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ProfileModal, initialTag } from '../../../../models/profile.model';
import { Follow, Login } from '../../../../models/auth.model';
import { AuthActions } from '../../../../actions/auth.action';
import { ProfileActions } from '../../../../actions/profile.action';
import { OrganizationActions } from '../../../../actions/organization.action';
import { environment } from '../../../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { GeneralUtilities } from 'app/helpers/general.utils';

@Component({
  selector: 'app-org-coverblock',
  templateUrl: './org-coverblock.component.html',
  styleUrls: ['./org-coverblock.component.scss']
})
export class OrgCoverblockComponent implements OnInit {

  tagState$: Observable<ProfileModal>;
  orgHandle: any;
  baseUrl = environment.API_IMAGE;
  orgProfile: any;
  orgState$: any;

  constructor(
    private gUtils: GeneralUtilities,
    private store: Store<Login>,
    private router: Router,
  ) {

    /* org state */
    this.orgState$ = this.store.select('profileTags');
    this.orgState$.subscribe((state) => {
      this.orgProfile = state;
      if (state) {
        if (this.gUtils.checkNestedKey(state, [''])) {

        }
      }
    });
    /* org state */


    // users own profile
    this.tagState$ = this.store.select('profileTags');
    this.tagState$.subscribe((state) => {
    });

   }

  ngOnInit() {
  }

}
