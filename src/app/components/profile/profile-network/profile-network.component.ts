import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Store } from '@ngrx/store';
import { ProfileModal, initialTag } from '../../../models/profile.model';
import { Observable } from 'rxjs/Observable';
import { ProfileActions } from '../../../actions/profile.action';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile-network',
  templateUrl: './profile-network.component.html',
  styleUrls: ['./profile-network.component.scss']
})
export class ProfileNetworkComponent implements OnInit {

  imageBaseUrl = environment.API_IMAGE;
  userProfile = initialTag ;
  tagState$: Observable<ProfileModal>;
  userHandle: String;
  sendRequestList: any[];

  constructor(
    private profileStore: Store<ProfileModal>,
    private toastr: ToastrService
  ) {
    this.tagState$ = this.profileStore.select('profileTags');
    this.tagState$.subscribe((state) => {
      this.userProfile = state;
      // console.log('state ', state)
      if ( state['network_sent_requests'] && state ['get_req']) {
      this.sendRequestList = state.network_sent_requests;
      // console.log(this.sendRequestList)
      }
    })

    this.profileStore.select('profileTags')
    .first(profile => profile['profile_user_info'] && profile['profile_navigation_details'].handle)
    .subscribe( data => {
      if (data['profile_user_info'].isCurrentUser === true) {
        this.userHandle = this.userProfile.profile_navigation_details.handle;
        this.profileStore.dispatch({ type: ProfileActions.SENT_REQUEST_LIST, payload: this.userHandle });
      }
    });

    this.profileStore.select('profileTags')
    .first(profile => profile['cancel_network_request'] && profile['cancel_sent_request'])
    .subscribe( data => {
      if (data['cancel_network_request'] === true) {
        // console.log('cancel rfequest')
        this.toastr.success('You have successfully cancelled the sent request', '', {
          timeOut: 3000
        });
      }
    });
  }

  cancelRequest(handle: string) {
    // console.log('receivers handle ', handle)
    const data = {
     'receiver_id': handle,
    }
    // console.log('data', data)
    this.profileStore.dispatch({ type: ProfileActions.CANCEL_NETWORK_REQUEST, payload: data });
    // this.removeElements(handle);
  }

  // removeElements(handle: string) {
  //   this.sendRequestList =  _filter(this.sendRequestList, function(item) {
  //     return item.owner.handle !== handle;
  //   });
  //   console.log(this.sendRequestList)
  // }

  ngOnInit() {
  }

}
