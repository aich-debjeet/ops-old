import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { RegValue, ArtistFollow, RightBlockTag, initialTag, Login, artistFollowTag, Follow } from '../../../models/auth.model';
import { SearchFilterPipe } from '../../../pipes/search.pipe'
import { environment } from './../../../../environments/environment';
import { AuthActions } from '../../../actions/auth.action'

import _ from 'lodash';

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

  /**
   * Change messaging based on user type selected on the previous screen
   */
  getUserStrings() {
    const userType = JSON.parse(localStorage.getItem('userType'));
    for (const obj in userType) {
      if (obj) {
        if (userType[obj].name === 'Performing Artist' || userType[obj].name === 'Non Performing artist') {
          this.description = 'Select specific skill sets that you possess. You can click on as many options as you like.',
          this.title = 'Add Your Skills',
          this.searchPlaceholder = 'Search Skills'
        } else {
          this.description = 'Immerse yourself in arts and entertainment based on interests of your choice.',
          this.title = 'Follow Your Interest',
          this.searchPlaceholder = 'Search Interest'
        }
      }
    }
    // Build strings
    return {
      mainTitle: this.title,
      secondHead: '',
      description: this.description,
      loginLink: false,
      button_text: 'Login',
      button_link: '/login',
      page: false,
      img: 'http://d33wubrfki0l68.cloudfront.net/198702237b77cd4ad2209fd65cbeed2191783e66/d7533/img/reg_add_skill_illustration.png'
    };
  }

  ngOnInit() {
    // Change messaging based on user type selected on the previous screen
    this.rightCom = this.getUserStrings();

    // Load Initial set of Skills
    this.skillList();
  }

  /**
   * Skill Search input handler
   * @param query
   */
  onSearchChange(query) {
    if (query || query !== '') {
      this.searchSkill(query);
    }else {
      this.skillList();
    }
  }

  /**
   * Load list of Artists to follow
   * @param code
   */

  artistList(code: string) {
    const indList = {
       'industryCodeList': [code]
    };
    this.store.dispatch({ type: AuthActions.USER_ARTIST_FOLLOW, payload: indList });
  }

  /**
   * Load List of Skills (High Level)
   */
  skillList() {
    this.store.dispatch({ type: AuthActions.LOAD_SKILL});
  }


  /**
   * Search Skills ( Second Level)
   * @param q
   */
  searchSkill(q: string) {
    this.store.dispatch({ type: AuthActions.SEARCH_SKILL, payload: q });
  }

  /**
   * Find Skill from API Skill List
   * @param skillCode
   */
  findSkill(skillCode) {
    return _.find(this.followpage.skills, function(s) {
      return s.code === skillCode;
    });
  }

  /**
   * Add New Skill
   * @param name
   */
  addNewSkill(name) {
    if (name !== '') {
      this.store.dispatch({ type: AuthActions.SAVE_SKILL, payload: name });
    }
  }

  /**
   * Handle Skill selection
   * @param skillCode
   */
  toggleSelectSkill(skillCode: string) {
    // Check if skill is already selected
    const isSelected = _.find(this.selectedSkills, function(s) {
      return s.code === skillCode;
    });

    // If skill exist then remove it from selection array
    if (isSelected !== undefined) {
      // Searching for the skill in skills array
      const skillMeta = this.findSkill(skillCode);
      // Removing skill from selected skills array
      this.selectedSkills = this.selectedSkills.filter(function(skill) {
        return skill.code !== skillCode;
      });
      // Mark it not selected in UI
      this.followpage.skills = this.followpage.skills.filter(function(skill) {
        if (skill.code === skillCode) {
          skill.isSelected = false;
        }
        return skill;
      });

    } else {
      // Mark it selected in UI
      this.followpage.skills = this.followpage.skills.filter(function(skill) {
        if (skill.code === skillCode) {
          skill.isSelected = true;
        }
        return skill;
      });

      // Searching for the skill in skills array
      const skillMeta = this.findSkill(skillCode);

      // Adding skill to the selection array
      this.selectedSkills.push({
        'name': skillMeta.name,
        'code': skillMeta.code,
        'active': true
      });
    }
  }
}
