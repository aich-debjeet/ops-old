import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { OrganizationActions } from '../../../../actions/organization.action';
import { AuthActions } from '../../../../actions/auth.action';
import { environment } from '../../../../../environments/environment';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Organization, initialOrganization } from '../../../../models/organization.model';

@Component({
  selector: 'app-org-leftblock',
  templateUrl: './org-leftblock.component.html',
  styleUrls: ['./org-leftblock.component.scss']
})
export class OrgLeftblockComponent implements OnInit {

  orgState$: Observable<Organization>;
  orgProfile: any;
  baseUrl = environment.API_IMAGE;

  constructor(
    private store: Store<Organization>
  ) {
    this.orgState$ = this.store.select('profileTags');
    this.orgState$.subscribe((state) => {
      this.orgProfile = state;
    })
  }

  ngOnInit() {
  }

}
