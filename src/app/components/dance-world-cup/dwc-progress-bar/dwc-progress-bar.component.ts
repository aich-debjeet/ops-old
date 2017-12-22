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

    this.isAuthed = false;

    /**
     * Check currenct status
     */

     this.store.select('profileTags')
    .first(profile => profile['profile_navigation_details'].handle)
    .subscribe( data => {
      this.isAuthed = true;
    });

  }

  ngOnInit() {
    /**
     * Check currenct status
     */
    this.store.select('profileTags')
      .take(2)
      .subscribe( data => {
        this.dataDwc = data
        if (this.router.url !== '/dwc/details') {
          if (data['profile_navigation_details'].DWCcompleteStatus === 1) {
            this.router.navigateByUrl('/dwc/payment');
          }

          if (data['profile_navigation_details'].DWCcompleteStatus === 2) {
            this.router.navigate(['/post'], { queryParams: { event: 'dwc' } });
          }

          if (data['profile_navigation_details'].DWCcompleteStatus === 3) {
            this.router.navigateByUrl('/dwc/completed');
          }

          if (data['profile_navigation_details'].DWCcompleteStatus === 0) {
            this.router.navigateByUrl('/dwc/reg');
          }
        }
      });
  }

  mediaClick(step) {
    if (step >= 2) {
      this.router.navigate(['/post'], { queryParams: { event: 'dwc' } });
    }
  }

}
