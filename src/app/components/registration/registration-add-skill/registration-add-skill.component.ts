import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { RegValue, ArtistFollow, RightBlockTag, initialTag, Login, artistFollowTag, Follow } from '../../../models/auth.model';
import { SearchFilterPipe } from '../../../pipes/search.pipe'

// Action
import { AuthActions } from '../../../actions/auth.action'  

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

export class Channel {
  follow: boolean;
  owner_name: string;
  handle_name: string;
  conver_image: string;
  owner_image:string;
  followers:string;
}


const CHANNEL = [
  {
        "spotfeedId": "z_449fdf3b-9502-4793-a56e-bbc79229f949",
        "spotfeedImage": "",
        "media": [
            {
                "mediaId": "z_25519804-2462-453f-a8fa-9781a58aa0bb",
                "repoPath": "images/T_24450973_EEC8_4273_BFA7_9F7B45DB08A7YASWANTH_RAJA_AEIONE_COM/c1a82787-98db-493d-95e3-37f245327f91.png",
                "mediaType": "image"
            }
        ],
        "spotfeedName": "santhosh android",
        "ownerHandle": "M_8549FF0B_5861_483F_A051_87AB7E867DABSACHIN_NAGALGAWE_SCRIPTUIT_COM",
        "ownerName": "Milind Soman",
        "ownerImage": "http://d206s58i653k1q.cloudfront.net/images/M_8549FF0B_5861_483F_A051_87AB7E867DABSACHIN_NAGALGAWE_SCRIPTUIT_COM/1c3c1a9a-de96-4862-94b5-4cbc0b697610.jpeg",
        "followersCount": 0,
        "mediaCount": 1,
        "isFollowing": false
    },
    {
        "spotfeedId": "s-87b939b9-5d33-4d7f-a047-23241964434c",
        "spotfeedImage": "",
        "media": [
            {
                "mediaId": "s_8a6a173c-82fa-4807-a1d8-e53f57ade526",
                "repoPath": "images/T_24450973_EEC8_4273_BFA7_9F7B45DB08A7YASWANTH_RAJA_AEIONE_COM/c1a82787-98db-493d-95e3-37f245327f91.png",
                "mediaType": "image"
            }
        ],
        "spotfeedName": "santhosh android",
        "ownerHandle": "M_8549FF0B_5861_483F_A051_87AB7E867DABSACHIN_NAGALGAWE_SCRIPTUIT_COM",
        "ownerName": "Milind Soman",
        "ownerImage": "http://d206s58i653k1q.cloudfront.net/images/M_8549FF0B_5861_483F_A051_87AB7E867DABSACHIN_NAGALGAWE_SCRIPTUIT_COM/1c3c1a9a-de96-4862-94b5-4cbc0b697610.jpeg",
        "followersCount": 0,
        "mediaCount": 1,
        "isFollowing": false
    },
    {
        "spotfeedId": "o-9a7ee435-ea9c-4445-b1e6-02fde3336e79",
        "spotfeedImage": "",
        "media": [
            {
                "mediaId": "e_cbc9b8c0-0fde-4fec-b804-12522c8a813e",
                "repoPath": "images/T_24450973_EEC8_4273_BFA7_9F7B45DB08A7YASWANTH_RAJA_AEIONE_COM/c1a82787-98db-493d-95e3-37f245327f91.png",
                "mediaType": "image"
            }
        ],
        "spotfeedName": "santhosh android",
        "ownerHandle": "M_8549FF0B_5861_483F_A051_87AB7E867DABSACHIN_NAGALGAWE_SCRIPTUIT_COM",
        "ownerName": "Milind Soman",
        "ownerImage": "http://d206s58i653k1q.cloudfront.net/images/M_8549FF0B_5861_483F_A051_87AB7E867DABSACHIN_NAGALGAWE_SCRIPTUIT_COM/1c3c1a9a-de96-4862-94b5-4cbc0b697610.jpeg",
        "followersCount": 0,
        "mediaCount": 1,
        "isFollowing": false
    }
];






@Component({
  selector: 'app-registration-add-skill',
  templateUrl: './registration-add-skill.component.html',
  styleUrls: ['./registration-add-skill.component.scss']
})
export class RegistrationAddSkillComponent implements OnInit {


  channelList = CHANNEL;
  is_skill_open = false;

  tagState$: Observable<Follow>;
  private tagStateSubscription: Subscription;
  artistFollowList = artistFollowTag;

  rForm: FormGroup;
  rightCom: RightBlockTag;
  skills: any;
  artistFollow: any;
  private headers: Headers;

  constructor(fb: FormBuilder,private http: Http, private store: Store<Login>) {

    this.tagState$ = store.select('loginTags');
    this.tagState$.subscribe((state) => {
        console.log(state);
          this.artistFollowList = state;
        // console.log(state);
        //  console.log(this.artistFollowList);
        // this.done = !!(this.petTag.shape && this.petTag.text);
      });

    this.rForm = fb.group({
      'profession' : [null, Validators.required],
      'searchskills': [null, Validators.required],
    });

    this.http = http;
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
}

  // tripLikeState() {
  //   if (!this.trip) return 'inactive';
  //   return this.trip.is_liked_by_current_user ? 'active' : 'inactive';
  // }

  ngOnInit() {
    this.rightCom = { 
      mainTitle: 'Add Your Interest', 
      secondHead: '',
      description: 'Select specific skill sets that you possess. Can click on as many options as you like there are no restrictions .',
      loginLink: false,
      button_text: 'Login',
      button_link: '/login',
      page: true,
      img: ''
    };

    this.skillList();
    // this.artistList();
  }

myEvent(event) {
  console.log(event);
  console.log(event.target.id );
  console.log(event.currentTarget);
}

skillList() {
  // this.store.dispatch({ type: AuthActions.LOAD_SKILL});
  this.http.get('http://devservices.greenroom6.com:9000/api/1.0/portal/industry')
      .map(res => res.json())
      .subscribe(skills => this.skills = skills);
  }

  onChange(value){
    console.log(value);
  }

  artistList(code: string){
    this.is_skill_open = true;
    let val = {
      // "industryCodeList":["DANCE"]
       "industryCodeList":[code]
    };
    this.store.dispatch({ type: AuthActions.USER_ARTIST_FOLLOW, payload: val});
  }
  isFoo:boolean = false;

  toggleFollowBtn(i){
    
    console.log(i);
   let ss = this.artistFollowList.completed[i].isFollowing
        console.log(ss);

     return  this.artistFollowList.completed[i].isFollowing == true?  this.artistFollowList.completed[i].isFollowing = false :  this.artistFollowList.completed[i].isFollowing = true
  }

  addSkill(value: any) {
      console.log(value);
  }

  onClose(value) {
    console.log('close binid');
    console.log(value);
  }


}
