import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Login } from '../../../models/auth.model';
import { environment } from './../../../../environments/environment';
import { AuthActions } from '../../../actions/auth.action'

import { find as _find } from 'lodash';
import { GeneralUtilities } from '../../../helpers/general.utils';

@Component({
  selector: 'app-registration-add-skill',
  templateUrl: './registration-add-skill.component.html',
  styleUrls: ['./registration-add-skill.component.scss']
})

export class RegistrationAddSkillComponent implements OnInit, OnDestroy, AfterViewInit {
  image_base_url = environment.API_IMAGE;
  skillSelectionState$: Observable<Login>;
  searchSkillForm: FormGroup;
  skillSelectionState: any;
  selectedSkills = [];
  skills = [];
  searchQuery: String;
  skillsSelected = false;
  uploadingSkills = false;
  search;
  skillSearchScrollId = '';
  searchType = 'industry';
  @ViewChild('searchInput') searchInput: ElementRef;

  constructor(
    fb: FormBuilder,
    private router: Router,
    private store: Store<Login>,
    private generalUtils: GeneralUtilities
  ) {
    this.skillSelectionState$ = store.select('loginTags');
    this.skillSelectionState$.subscribe((state) => {
      this.skillSelectionState = state;
      if (state) {
        if (state['industries']) {
          this.skills = state['industries'];
        }
        if (typeof state['uploadingUserSkills'] !== 'undefined'
          && state['uploadingUserSkills'] === false
          && state['uploadedUserSkills'] === true
        ) {
          this.uploadingSkills = false;
          this.router.navigate(['/profile/user']);
        }
        if (this.generalUtils.checkNestedKey(state, ['signup_search_skill_result', 'scrollId'])) {
          this.skillSearchScrollId = state['signup_search_skill_result']['scrollId'];
        }
      }
    });

    this.searchSkillForm = fb.group({
      profession: [null, Validators.required],
      searchskills: [null, Validators.required],
    });
    this.searchQuery = '';
  }

  ngOnInit() {
    // load initial industries
    this.industriesList();
  }

  ngAfterViewInit() {
    // set focus to input
    this.searchInput.nativeElement.focus();
  }

  ngOnDestroy() {}

  /**
   * submit all selected skills
   */
  saveSkills() {
    this.uploadingSkills = true;
    this.store.dispatch({ type: AuthActions.USER_SUBMIT_SKILLS, payload: this.selectedSkills });
  }

  /**
   * search skills
   * @param query
   */
  onSearchChange(query) {
    if (query && query !== '') {
      this.searchQuery = query;
      this.searchType = 'skill';
      this.triggerSearchSkills(false);
    } else {
      this.searchType = 'industry';
      this.industriesList();
    }
  }

  triggerSearchSkills(loadMore: boolean) {
    if (this.searchType === 'industry') {
      return false;
    }
    let scrollId;
    if (loadMore === true) {
      scrollId = this.skillSearchScrollId;
    } else {
      scrollId = '';
    }
    const params = {
      limit: 50,
      searchString: this.searchQuery,
      scrollId: scrollId
    }
    this.store.dispatch({ type: AuthActions.SIGNUP_SEARCH_SKILL, payload: params });
  }

  /**
   * load list of skills (High Level)
   */
  industriesList() {
    this.store.dispatch({ type: AuthActions.LOAD_INDUSTRIES });
  }

  /**
   * find a specific skill within the loaded list
   * @param skillCode
   */
  findSkill(skillCode) {
    return _find(this.skillSelectionState.industries, function(s: any) {
      return s.code === skillCode;
    });
  }

  /**
   * add new skill if doesn't exist
   * @param name
   */
  addNewSkill(name: string) {
    if (name !== '') {
      const skillCode = name.replace(/ /g, '_').toUpperCase();
      this.skillSelectionState.industries.push({
        name: name,
        code: skillCode
      });
      this.toggleSelectSkill(skillCode);
      this.store.dispatch({ type: AuthActions.SAVE_SKILL, payload: name });
      // this.newSkillAdded = true;
    }
  }

  /**
   * Load more skill while scrolling
   */
  loadMoreSkills() {
    this.triggerSearchSkills(true);
  }

  /**
   * toggle select/deselect skill
   * @param skillCode
   */
  toggleSelectSkill(skillCode: string) {
    // check if skill is already selected
    const selectedSkill = _find(this.selectedSkills, function(s) {
      return s.code === skillCode;
    });

    // if skill exist then remove it from selection array
    if (selectedSkill !== undefined) {
      // searching for the skill in skills array
      const skillMeta = this.findSkill(skillCode);

      // removing skill from selected skills array
      this.selectedSkills = this.selectedSkills.filter(function(skill) {
        return skill.code !== skillCode;
      });

      // mark it not selected in UI
      this.skillSelectionState.industries = this.skillSelectionState.industries.filter(function(skill) {
        if (skill.code === skillCode) {
          skill.isSelected = false;
        }
        return skill;
      });

    } else {

      // mark it selected in UI
      this.skillSelectionState.industries = this.skillSelectionState.industries.filter(function(skill) {
        if (skill.code === skillCode) {
          skill.isSelected = true;
        }
        return skill;
      });

      // searching for the skill in skills array
      const skillMeta = this.findSkill(skillCode);

      // adding skill to the selection array
      this.selectedSkills.push({
        name: skillMeta.name,
        code: skillMeta.code,
        active: true
      });
    }

    if (this.selectedSkills.length > 0) {
      this.skillsSelected = true;
    } else {
      this.skillsSelected = false;
    }
  }
}
