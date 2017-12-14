import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
// action
import { ProfileActions } from '../../../actions/profile.action';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dwc-progress-bar',
  templateUrl: './dwc-progress-bar.component.html',
  styleUrls: ['./dwc-progress-bar.component.scss']
})
export class DwcProgressBarComponent implements OnInit {
  tagState$: Observable<any>;
  dataDwc: any;
  isAuthed: boolean;
  constructor(
    private store: Store<any>,
    private router: Router,
  ) {
    // this.tagState$ = store.select('profileTags')
    //  this.tagState$.subscribe((state) => {
    //    this.dataDwc = state
    //   console.log(state)
    // })
    this.isAuthed = false;

    /**
     * Check currenct status
     */

     this.store.select('profileTags')
    .first(profile => profile['profile_navigation_details'].handle)
    .subscribe( data => {
      this.isAuthed = true;
    });

    /**
     * Check currenct status
     */
    this.store.select('profileTags')
      .first(profile => profile['profile_navigation_details'].DWCcompleteStatus)
      .subscribe( data => {

        this.dataDwc = data
        if (this.router.url !== '/dwc/details') {
          if (data['profile_navigation_details'].DWCcompleteStatus === 2) {
            this.router.navigateByUrl('/dwc/payment');
          }

          if (data['profile_navigation_details'].DWCcompleteStatus === 1) {
            this.router.navigateByUrl('/dwc/payment');
          }
        }
      });
  }

  ngOnInit() {
  }

}
