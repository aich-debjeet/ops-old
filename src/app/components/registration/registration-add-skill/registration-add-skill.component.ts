import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Login } from '../../../models/auth.model';
import { environment } from './../../../../environments/environment';
import { AuthActions } from '../../../actions/auth.action'

import { find as _find } from 'lodash';

@Component({
  selector: 'app-registration-add-skill',
  templateUrl: './registration-add-skill.component.html',
  styleUrls: ['./registration-add-skill.component.scss']
})

export class RegistrationAddSkillComponent implements OnInit, OnDestroy {
  private apiLink = environment.API_ENDPOINT;
  image_base_url = environment.API_IMAGE;
  skillSelectionState$: Observable<Login>;
  searchSkillForm: FormGroup;
  skillSelectionState: any;
  selectedSkills = [];
  skills = [];
  search: String;
  activateSubmitBtn = false;
  isSearching = false;

  constructor(
    fb: FormBuilder,
    private store: Store<Login>
  ) {
    this.skillSelectionState$ = store.select('loginTags');
    this.skillSelectionState$.subscribe((state) => {
      this.skillSelectionState = state;
      this.skills = this.skillSelectionState['industries'];

      if (this.skillSelectionState
        && this.skillSelectionState['skills_loading'] === false
        && this.skillSelectionState['skills_loaded'] === true
      ) {
        this.isSearching = false;
      }
    });

    this.searchSkillForm = fb.group({
      profession: [null, Validators.required],
      searchskills: [null, Validators.required],
    });
    this.search = '';
  }

  ngOnInit() {
    // Load industries
    this.industriesList();
  }

  ngOnDestroy() {}

  /**
   * Save skills if all selected
   */
  saveSkills() {
    this.store.dispatch({ type: AuthActions.USER_SUBMIT_SKILLS, payload: this.selectedSkills });
  }

  /**
   * Skill Search input handler
   * @param query
   */
  onSearchChange(query) {
    if (query || query !== '') {
      this.isSearching = true;
      this.store.dispatch({ type: AuthActions.SEARCH_SKILL, payload: query });
    } else {
      this.industriesList();
    }
  }

  /**
   * Load List of Skills (High Level)
   */
  industriesList() {
    this.isSearching = true;
    this.store.dispatch({ type: AuthActions.LOAD_INDUSTRIES });
  }

  /**
   * selecting category to load respective result
   */
  // selectCategory(category) {
  //   this.search = category.toLowerCase();
  // }

  /**
   * Find Skill from API Skill List
   * @param skillCode
   */
  findSkill(skillCode) {
    return _find(this.skillSelectionState.skills, function(s: any) {
      return s.code === skillCode;
    });
  }

  /**
   * Add New Skill
   * @param name
   */
  addNewSkill(name) {
    if (name !== '') {
      this.skillSelectionState.skills.push({
        name: name,
        code: name.toUpperCase()
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
    console.log('selectedSkill', selectedSkill);

    // If skill exist then remove it from selection array
    if (selectedSkill !== undefined) {
      console.log('skill is already selected');
      // Searching for the skill in skills array
      const skillMeta = this.findSkill(skillCode);
      // Removing skill from selected skills array
      this.selectedSkills = this.selectedSkills.filter(function(skill) {
        return skill.code !== skillCode;
      });
      // Mark it not selected in UI
      this.skillSelectionState.skills = this.skillSelectionState.skills.filter(function(skill) {
        if (skill.code === skillCode) {
          skill.isSelected = false;
        }
        return skill;
      });

    } else {
      console.log('skill is NOT selected');
      // Mark it selected in UI
      this.skillSelectionState.skills = this.skillSelectionState.industries.filter(function(skill) {
        if (skill.code === skillCode) {
          skill.isSelected = true;
        }
        return skill;
      });

      // Searching for the skill in skills array
      const skillMeta = this.findSkill(skillCode);

      // Adding skill to the selection array
      this.selectedSkills.push({
        name: skillMeta.name,
        code: skillMeta.code,
        active: true
      });
    }

    if (this.selectedSkills.length > 0) {
      this.activateSubmitBtn = true;
    } else {
      this.activateSubmitBtn = false;
    }
  }
}
