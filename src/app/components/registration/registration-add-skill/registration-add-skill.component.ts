import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RegValue, ArtistFollow, RightBlockTag, initialTag, Login, artistFollowTag, Follow } from '../../../models/auth.model';
import { SearchFilterPipe } from '../../../pipes/search.pipe'
import { environment } from './../../../../environments/environment';

import { find as _find } from 'lodash/find';

// Action
import { AuthActions } from '../../../actions/auth.action'

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

export class Channel {
  follow: boolean;
  owner_name: string;
  handle_name: string;
  conver_image: string;
  owner_image: string;
  followers: string;
}

@Component({
  selector: 'app-registration-add-skill',
  templateUrl: './registration-add-skill.component.html',
  styleUrls: ['./registration-add-skill.component.scss']
})
export class RegistrationAddSkillComponent implements OnInit {
  private apiLink: string = environment.API_ENDPOINT;
  private image_base_url: string = environment.API_IMAGE;

  channelList: any;
  is_skill_open: false;
  tagState$: Observable<Follow>;
  private tagStateSubscription: Subscription;
  private headers: Headers;
  rForm: FormGroup;
  rightCom: RightBlockTag;
  // @TODO cleanup unwanted vars - @muneef
  artistFollowList = artistFollowTag;
  skills: any;
  artistFollow: any;
  followpage: any;
  description: string;
  title: string;
  searchPlaceholder: string;
  selectedSkills = [];
  addSkillResponse;
  search: String;

  constructor(fb: FormBuilder, private http: Http, private router: Router, private store: Store<Login>) {

    this.tagState$ = store.select('loginTags');
    this.tagState$.subscribe((state) => {
      this.followpage = state;
    });

    this.rForm = fb.group({
      'profession' : [null, Validators.required],
      'searchskills': [null, Validators.required],
    });

    this.http = http;
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.search = '';
  }

  ngOnInit() {

    const userType = JSON.parse(localStorage.getItem('userType'));
    // Needs work here
    for (var v in userType) {
      if(userType[v].name === 'Performing Artist' || userType[v].name === 'Non Performing artist'){
        this.description = 'Select specific skill sets that you possess. You can click on as many options as you like.',
        this.title = 'Add Your Skills',
        this.searchPlaceholder = 'Search Skills'
      }else {
        this.description = 'Immerse yourself in arts and entertainment based on interests of your choice.',
        this.title = 'Follow Your Interest',
        this.searchPlaceholder = 'Search Interest'
      }
      console.log(userType[v].name)
    }

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
  /**
   * Load List of Skills (High Level)
   */
  skillList() {
    this.store.dispatch({ type: AuthActions.LOAD_SKILL});
  }

  /**
   * Search input handler
   * @param query
   */
  onChange(query) {
    if (query || query !== '') {
      this.searchSkill(query);
    }else {
      this.skillList();
    }
  }

  artistList(code: string) {
    const indList = {
       'industryCodeList': [code]
    };
    this.store.dispatch({ type: AuthActions.USER_ARTIST_FOLLOW, payload: indList });
    this.getChannels(code)
  }

  /**
   * Search Skills ( Second Level)
   * @param q
   */
  searchSkill(q: string) {
    this.store.dispatch({ type: AuthActions.SEARCH_SKILL, payload: q });
  }

  // find and return the skill from skills array using the skill code
  getSkill(skillCode) {
    return _find(this.skills, function(s) { return s.code === skillCode; });
  }

  addNewSkill(name) {
    if (name !== '') {
      this.store.dispatch({ type: AuthActions.SAVE_SKILL, payload: name });
    }
  }

  // select/deselect skills
  toggleSelectSkill(skillCode: string) {

    // check if skill already selected
    const isSelected = _find(this.selectedSkills, function(s) {
      return s.code === skillCode;
    });

    // if skill exist then remove it from selection array
    if (isSelected !== undefined) {

      // searching for the skill in skills array
      const skillMeta = this.getSkill(skillCode);

      // removing skill from selected skills array
      this.selectedSkills = this.selectedSkills.filter(function(skill) {
        return skill.code !== skillCode;
      });

      // mark it not selected in UI
      this.skills = this.skills.filter(function(skill) {
        if (skill.code === skillCode) {
          skill.isSelected = false;
        }
        return skill;
      });

    } else {

      // mark it selected in UI
      this.skills = this.skills.filter(function(skill) {
        if (skill.code === skillCode) {
          skill.isSelected = true;
        }
        return skill;
      });

      // searching for the skill in skills array
      const skillMeta = this.getSkill(skillCode);

      // Adding skill to the selection array
      this.selectedSkills.push({
        'name': skillMeta.name,
        'code': skillMeta.code,
        'active': true
      });
    }
  }

  toggleFollowBtn(i, handle) {
    const value =  {
      'followedHandle': handle
    }

    if (this.followpage.completed[i].isFollowing === true) {
      this.artistUnfollowing(value)
      this.followpage.completed[i].isFollowing = false
    } else {

      this.artistFollowing(value);
      this.followpage.completed[i].isFollowing = true
    }
  }

  // @TODO
  // To be removed
  artistFollowing(req: any) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      const token = currentUser.access_token; // your token

      let headers = new Headers({ 'Content-Type': 'application/json'});
      headers.append('Authorization', 'Bearer ' + token)

      return this.http.put(this.apiLink + '/portal/network/following/start', JSON.stringify(req), { headers: headers })
          .map((data) => data.json())
          .subscribe(data => {console.log(data)});
  }

  // @TODO
  // To be removed
  artistUnfollowing(req: any) {
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      var token = currentUser.access_token; // your token

      let headers = new Headers({ 'Content-Type': 'application/json'});
      headers.append('Authorization', 'Bearer ' + token)

      return this.http.put(this.apiLink + '/portal/network/following/stop', JSON.stringify(req), { headers: headers })
          .map((data) => data.json())
          .subscribe(data => data);
  }

  // @TODO
  // To be removed
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
      headers.append('Authorization', 'Bearer ' + token)

    return this.http.post(`${this.apiLink}/portal/network/spotfeed/search`, value,  { headers: headers })
        .map((data) => data.json())
        .subscribe(data => {this.channelList = data, console.log(data)});
  }


  addSkill(value: any) {
      console.log(value);
  }

  submitSkills() {

    let skillsToSubmit = {
      'industryList': this.selectedSkills
    }

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const token = currentUser.access_token; // your token

    let headers = new Headers({ 'Content-Type': 'application/json'});
    headers.append('Authorization', 'Bearer ' + token);

    return this.http.put(`${this.apiLink}/portal/profile/updateProfile`, skillsToSubmit,  { headers: headers })
        .map((data) => data.json())
        .subscribe(data => {
          this.addSkillResponse = data, console.log(data);
          this.router.navigateByUrl('/reg/welcome');
        });
  }

  onClose(value) {
    console.log('close binid');
    console.log(value);
  }
}
