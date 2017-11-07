import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ProfileModal, initialTag } from '../../../../models/profile.model';
import { Follow, Login } from '../../../../models/auth.model';
import { AuthActions } from '../../../../actions/auth.action';
import { ProfileActions } from '../../../../actions/profile.action';
import { OrganizationActions } from '../../../../actions/organization.action';
import { environment } from '../../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-org-coverblock',
  templateUrl: './org-coverblock.component.html',
  styleUrls: ['./org-coverblock.component.scss']
})
export class OrgCoverblockComponent implements OnInit {
  tagState$: Observable<ProfileModal>;
  organization: any;
  baseUrl = environment.API_IMAGE;
  constructor(
    private toastr: ToastrService,
    private ngZone: NgZone,
    private store: Store<Login>
  ) {
    this.store.select('profileTags')
      .subscribe( data => {
        console.log(data);
      });

      // Own Profile
    this.tagState$ = this.store.select('profileTags');
    this.tagState$.subscribe((state) => {
      if (state['profileUser'].organization) {
        this.organization = state['profileUser'].organization;
      }
      console.log(this.organization);
    });
   }

  ngOnInit() {
  }

}
