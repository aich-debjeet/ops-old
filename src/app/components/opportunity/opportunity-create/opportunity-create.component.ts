import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-opportunity-create',
  templateUrl: './opportunity-create.component.html',
  styleUrls: ['./opportunity-create.component.scss']
})
export class OpportunityCreateComponent implements OnInit {

  createOppFrm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {

    this.createOppFrm = fb.group({
      type: [null],
      role: [null],
      desc: [null],
    });

  }

  ngOnInit() {
  }

  postOpportunity(formData: any) {
    console.log('formData', formData);
    const reqObj = {
      title: 'freelance',
      role: 'manager',
      description: '',
      experience: {
        experienceFrom: 1,
        experienceTo: 2
      },
      salary: {
        amount: 0.0,
        salaryType: 'annual',
        currency: 'rs'
      },
      organization: '',
      jobType: 'collaborate',
      skills: [''],
      attachment: [''],
      qualifications: [''],
      count: {
        like: [],
        spots: [],
        channel: ['']
      }
    };
  }

}
