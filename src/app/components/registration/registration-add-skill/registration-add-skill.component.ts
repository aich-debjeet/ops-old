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

import { find as _find } from 'lodash';

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
  skillSelectionPage: any;
  selectedSkills = [];
  search: String;
  activateSubmitBtn = false;

  constructor(fb: FormBuilder, private http: Http, private router: Router, private store: Store<Login>) {

    this.tagState$ = store.select('loginTags');
    this.tagState$.subscribe((state) => {
      this.skillSelectionPage = state;
      // console.log('this.skillSelectionPage.skills');
      // console.log(this.skillSelectionPage.skills);
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
    // Load industries
    this.industriesList();
  }

  /**
   * Save skills if all selected
   */
  saveSkills() {
    console.log(this.selectedSkills);
    this.store.dispatch({ type: AuthActions.USER_SUBMIT_SKILLS, payload: this.selectedSkills });
    this.tagState$.subscribe(
      data => {
        console.log(data.success);
        if (data.success === true) {
          this.router.navigateByUrl('/profile/user')
        }
      }
    )
  }

  /**
   * Skill Search input handler
   * @param query
   */
  onSearchChange(query) {
    console.log('searching: ' + query);
    if (query || query !== '') {
      this.store.dispatch({ type: AuthActions.SEARCH_SKILL, payload: query });
    }
  }

  /**
   * Load List of Skills (High Level)
   */
  industriesList() {
    this.store.dispatch({ type: AuthActions.LOAD_INDUSTRIES});
  }

  /**
   * selecting category to load respective result
   */
  selectCategory(category) {
    this.search = category.toLowerCase();
  }

  /**
   * Find Skill from API Skill List
   * @param skillCode
   */
  findSkill(skillCode) {
    return _find(this.skillSelectionPage.skills, function(s: any) {
      return s.code === skillCode;
    });
  }

  /**
   * Add New Skill
   * @param name
   */
  addNewSkill(name) {
    if (name !== '') {
      this.skillSelectionPage.skills.push({
        'name': name,
        'code': name.toUpperCase()
      });
      this.toggleSelectSkill(name.toUpperCase());
      this.store.dispatch({ type: AuthActions.SAVE_SKILL, payload: name });
    }
  }

  /**
   * Handle Skill selection
   * @param skillCode
   */
  toggleSelectSkill(skillCode: string) {
    // Check if skill is already selected
    const selectedSkill = _find(this.selectedSkills, function(s) {
      return s.code === skillCode;
    });

    // If skill exist then remove it from selection array
    if (selectedSkill !== undefined) {
      // Searching for the skill in skills array
      const skillMeta = this.findSkill(skillCode);
      // Removing skill from selected skills array
      this.selectedSkills = this.selectedSkills.filter(function(skill) {
        return skill.code !== skillCode;
      });
      // Mark it not selected in UI
      this.skillSelectionPage.skills = this.skillSelectionPage.skills.filter(function(skill) {
        if (skill.code === skillCode) {
          skill.isSelected = false;
        }
        return skill;
      });

    } else {
      // Mark it selected in UI
      this.skillSelectionPage.skills = this.skillSelectionPage.skills.filter(function(skill) {
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
    // console.log(this.selectedSkills);

    if (this.selectedSkills.length > 0) {
      this.activateSubmitBtn = true;
    } else {
      this.activateSubmitBtn = false;
    }
  }
}
