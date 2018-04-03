import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-communities',
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.scss']
})
export class CommunitiesComponent implements OnInit {

  comingsoon: any;
  basePath = environment.API_IMAGE;
  public communityForm: FormGroup;
  constructor(
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.communityForm = this.fb.group({
      'community_name' : ['', [Validators.required]],
      'brief': ['', [Validators.required]],
      'access': ['', [Validators.required]],
      'industry': ['', [Validators.required]]
    })

  }

  submitForm(value) {
    console.log(value);
  }
}
