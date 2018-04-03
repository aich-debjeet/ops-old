import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, FormArray } from '@angular/forms';

// Action
import { AuthActions } from '../../actions/auth.action';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription, ISubscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-communities',
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.scss']
})
export class CommunitiesComponent implements OnInit {

  industries: any[];
  basePath = environment.API_IMAGE;
  public communityForm: FormGroup;
  industryState$: Observable<any>;
  private subscription: ISubscription;
  selectedIndustry = '';
  constructor(
    private fb: FormBuilder,
    private store: Store<any>,
    private toastr: ToastrService,
  ) {
    this.industryState$ = store.select('loginTags');
    this.subscription = this.industryState$.subscribe((state) => {
      if (typeof state !== 'undefined') {
        this.industries = state.industries;
      }
    });
  }

  ngOnInit() {
    this.buildForm();
    this.store.dispatch({ type: AuthActions.LOAD_INDUSTRIES });
  }

  buildForm() {
    this.communityForm = this.fb.group({
      'community_name' : ['', [Validators.required]],
      'brief': ['', [Validators.required]],
      'access': [0, [Validators.required]],
      'industry': ['', [Validators.required]]
    })

  }

  submitForm(value) {
    console.log(value);
    if ( this.communityForm.valid === true ) {
      const data = {
        title: value.community_name,
        brief: value.brief,
        accessSettings: {
          access: Number(value.access)
        },
        industryList: [ value.industry ]
      }
      console.log(data);
    }else {
      this.toastr.warning('Please fill all required fields');
    }
  }
}
