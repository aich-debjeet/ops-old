import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RegValue, ArtistFollow, RightBlockTag, initialTag, Login, artistFollowTag, Follow } from '../../../models/auth.model';
import { SearchFilterPipe } from '../../../pipes/search.pipe'
import { environment } from './../../../../environments/environment';

import _ from "lodash";

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
   private apiLink: string = environment.API_ENDPOINT;
   private image_base_url: string = environment.API_IMAGE;

  channelList: any;
  is_skill_open = false;

  tagState$: Observable<Follow>;
  private tagStateSubscription: Subscription;
  artistFollowList = artistFollowTag;

  rForm: FormGroup;
  rightCom: RightBlockTag;
  skills: any;
  artistFollow: any;
  private headers: Headers;

  description: string;
  title:string;
  searchPlaceholder:string;

  selectedSkills = [];
  addSkillResponse;

  constructor(fb: FormBuilder,private http: Http,private router: Router, private store: Store<Login>) {

    this.tagState$ = store.select('loginTags');
    this.tagState$.subscribe((state) => {
      console.log(state);
      this.artistFollowList = state;
    });

    this.rForm = fb.group({
      'profession' : [null, Validators.required],
      'searchskills': [null, Validators.required],
    });

    this.http = http;
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
  }

  ngOnInit() {

    var userType = JSON.parse(localStorage.getItem('userType'));
    for (var v in userType)   {
      if(userType[v].name == 'Performing Artist' || userType[v].name == 'Non Performing artist'){
        this.description = 'Select specific skill sets that you possess. You can click on as many options as you like.',
        this.title = 'Add Your Skills',
        this.searchPlaceholder = 'Search Skills'
      }
      else{
        this.description = 'Immerse yourself in arts and entertainment based on interests of your choice.',
        this.title = 'Follow Your Interest',
        this.searchPlaceholder = 'Search Interest'
      }
      console.log(userType[v].name)
    }
    console.log(userType)

    this.rightCom = {
      mainTitle: this.title,
      secondHead: '',
      description: this.description,
      loginLink: false,
      button_text: 'Login',
      button_link: '/login',
      page: false,
      img: 'http://d33wubrfki0l68.cloudfront.net/198702237b77cd4ad2209fd65cbeed2191783e66/d7533/img/reg_add_skill_illustration.png'
    };

    this.skillList();
  }

  ngOnDestroy() {

  }

  skillList() {
    // this.store.dispatch({ type: AuthActions.LOAD_SKILL});
    this.http.get('http://devservices.greenroom6.com:9000/api/1.0/portal/industry')
        .map(res => res.json())
        //.subscribe(skills => this.skills = skills);
        .subscribe((skills) => {
            this.skills = skills;
            var those = this;
            this.skills.forEach(function(element, index) {
              those.skills[index]['isSelected'] = false;
            });
            //console.log(this.skills);
        });
  }

  onChange(value){
    console.log(value);
  }

  artistList(code: string){
    //Temp disable this function
    // this.is_skill_open = true;
    let val = {
       "industryCodeList":[code]
    };
    this.store.dispatch({ type: AuthActions.USER_ARTIST_FOLLOW, payload: val});
    this.getChannels(code)
  }

  // find and return the skill from skills array using the skill code
  getSkill(skillCode) {

    return _.find(this.skills, function(s) { return s.code == skillCode; });

  }

  // select/deselect skills
  toggleSelectSkill(skillCode: string) {

    console.log('skill toggle: '+skillCode);

    // check if skill already selected
    var isSelected = _.find(this.selectedSkills, function(s) { return s.code == skillCode; });

    console.log('is selected: ');
    console.log(isSelected);

    // if skill exist then remove it from selection array
    if(isSelected !== undefined) {

      // mark it not selected in UI

      // searching for the skill in skills array
      var skillMeta = this.getSkill(skillCode);

      // removing skill from selected skills array
      this.selectedSkills = this.selectedSkills.filter(function(skill) {
        return skill.code !== skillCode;
      });

    } else {

      // mark it selected in UI

      // searching for the skill in skills array
      var skillMeta = this.getSkill(skillCode);

      console.log(skillMeta);

      //adding skill to the selection array
      this.selectedSkills.push({
        "name": skillMeta.name,
        "code": skillMeta.code,
        "active": true
      });

    }

    console.log('selected: ');
    console.log(this.selectedSkills);

  }

  toggleFollowBtn(i, handle){
    const value =  {
      'followedHandle': handle
    }

    if(this.artistFollowList.completed[i].isFollowing == true){
      this.artistUnfollowing(value)
      this.artistFollowList.completed[i].isFollowing = false
    }
    else{

      this.artistFollowing(value);
      this.artistFollowList.completed[i].isFollowing = true
      // this.store.dispatch({ type: AuthActions.ARTIST_FOLLOW, payload: value});
      //
    }

  }

  // Its Temp Code It need to change
  artistFollowing(req: any) {
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      var token = currentUser.access_token; // your token

      let headers = new Headers({ 'Content-Type': 'application/json'});
      headers.append('Authorization','Bearer '+token)

      return this.http.put(this.apiLink +'/portal/network/following/start', JSON.stringify(req), { headers: headers })
          .map((data) => data.json())
          .subscribe(data => {console.log(data)});
  }

  // Its Temp Code It need to change
  artistUnfollowing(req: any) {
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      var token = currentUser.access_token; // your token

      let headers = new Headers({ 'Content-Type': 'application/json'});
      headers.append('Authorization','Bearer '+token)

      return this.http.put(this.apiLink +'/portal/network/following/stop', JSON.stringify(req), { headers: headers })
          .map((data) => data.json())
          .subscribe(data => data);
  }

  //Its Temp code to change
  getChannels(code) {
    console.log('get channel');
    const value =  {
      "offset": 0,
      "limit": 10,
      "industryList":[code],
      "superType":"channel"
    }
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      var token = currentUser.access_token; // your token

      let headers = new Headers({ 'Content-Type': 'application/json'});
      headers.append('Authorization','Bearer '+token)

    return this.http.post(`${this.apiLink}/portal/network/spotfeed/search`, value,  { headers: headers })
        .map((data) => data.json())
        .subscribe(data => {this.channelList = data, console.log(data)});
  }


  addSkill(value: any) {
      console.log(value);
  }

  submitSkills(){

    // console.log('submitting');
    // console.log(this.selectedSkills);

    let skillsToSubmit = {
      "industryList": this.selectedSkills
    }

    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var token = currentUser.access_token; // your token

    let headers = new Headers({ 'Content-Type': 'application/json'});
    headers.append('Authorization','Bearer '+token);;

    console.log(JSON.stringify(skillsToSubmit));

    return this.http.put(`${this.apiLink}/portal/profile/updateProfile`, skillsToSubmit,  { headers: headers })
        .map((data) => data.json())
        .subscribe(data => {
          this.addSkillResponse = data, console.log(data);
          this.router.navigateByUrl("/reg/welcome");
        });

    //this.router.navigateByUrl("/reg/welcome");
    // if(this.addSkillResponse) {
    //
    // }

  }

  onClose(value) {
    console.log('close binid');
    console.log(value);
  }


}
