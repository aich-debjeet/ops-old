import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}


// import { Component } from '@angular/core';
// import { ApiService } from '../../services/api.service';

// import { Store } from '@ngrx/store';
// import { UserProfile } from '../../models/user-profile.model';
// import { UserMedia } from '../../models/user-media.model';

// // action
// import { ProfileActions } from '../../actions/profile.action';
// import { SharedActions } from '../../actions/shared.action';

// // rx
// import { Observable } from 'rxjs/Observable';
// import { Subscription } from 'rxjs/Subscription';

// @Component({
//   selector: 'app-profile',
//   templateUrl: './profile.component.html',
//   styleUrls: ['./profile.component.scss']
// })
// export class ProfileComponent {

//   userProfile$: Observable<UserProfile>;
//   userMedia$: Observable<UserMedia>;
//   userId: number = 12;
//   userProfile; userMedia;

//   mediaLoadMoreParams = {
//     offset: -10,
//     limit: 10,
//     mediaType: "image"
//   };

//   //tempSkills = ['web', 'web design', 'ui/ux', 'technology', 'typography', 'branding', 'art'];

//   constructor(private profileStore: Store<UserProfile>, private mediaStore: Store<UserMedia>) {

//     this.userProfile$ = this.profileStore.select('profileTags');

//     this.userProfile$.subscribe((state) => {
//       this.userProfile = state;
//       console.log(this.userProfile);
//     });

//     this.profileStore.dispatch({ type: ProfileActions.LOAD_USER_PROFILE });

//     this.loadMoreMedia();

//   }

//   getUserMedia() {

//     // dummy response
//     this.userMedia = [{
//       "spotfeedId": "p-77fcbe2d-fc89-472b-ad9f-5d8e0a38b534",
//       "spotfeedImage": "",
//       "media": [ {}, {}],
//       "spotfeedName": "My First Feed",
//       "ownerName": "Yaswanth",
//       "ownerImage": "http://d206s58i653k1q.cloudfront.net/images/R_75C6D906_ED50_4DE4_A355_D919FE92A2E0YASWANTHMDH_GMAIL_COM/6addd27f-6967-4b84-b07b-5ec4cb4368e8.jpeg",
//       "followersCount": 1321,
//       "isFollowing": false,
//       "mediaCount":25
//     }, {
//       "spotfeedId": "p-77fcbe2d-fc89-472b-ad9f-5d8e0a38b534",
//       "spotfeedImage": "",
//       "media": [ {}, {}, {} ],
//       "spotfeedName": "My Feed test",
//       "ownerName": "Abhijeet",
//       "ownerImage": "http://d206s58i653k1q.cloudfront.net/images/R_75C6D906_ED50_4DE4_A355_D919FE92A2E0YASWANTHMDH_GMAIL_COM/6addd27f-6967-4b84-b07b-5ec4cb4368e8.jpeg",
//       "followersCount": 3213,
//       "isFollowing": false,
//       "mediaCount":32
//     }, {
//       "spotfeedId": "p-77fcbe2d-fc89-472b-ad9f-5d8e0a38b534",
//       "spotfeedImage": "",
//       "media": [ {} ],
//       "spotfeedName": "My Feed",
//       "ownerName": "Manoj",
//       "ownerImage": "http://d206s58i653k1q.cloudfront.net/images/R_75C6D906_ED50_4DE4_A355_D919FE92A2E0YASWANTHMDH_GMAIL_COM/6addd27f-6967-4b84-b07b-5ec4cb4368e8.jpeg",
//       "followersCount": 984,
//       "isFollowing": false,
//       "mediaCount":103
//     }];

//     // this.mediaLoadMoreParams.offset = this.mediaLoadMoreParams.offset + this.mediaLoadMoreParams.limit;
//     // console.log(this.mediaLoadMoreParams);
//     //
//     // this.userMedia$ = this.mediaStore.select('userMediaTags');
//     //
//     // this.userMedia$.subscribe((state) => {
//     //   this.userMedia = state;
//     // });
//     //
//     // this.mediaStore.dispatch({
//     //   type: ProfileActions.LOAD_USER_MEDIA,
//     //   payload: this.mediaLoadMoreParams
//     // });

//   }

//   loadMoreMedia() {
//     this.getUserMedia();
//   }

// }
