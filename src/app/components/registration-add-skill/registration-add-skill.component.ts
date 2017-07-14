import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration-add-skill',
  templateUrl: './registration-add-skill.component.html',
  styleUrls: ['./registration-add-skill.component.css']
})
export class RegistrationAddSkillComponent implements OnInit {

  rForm: FormGroup;

  constructor(fb: FormBuilder) {
  this.rForm = fb.group({
    'profession' : [null, Validators.required],
    'searchskills': [null, Validators.required],
  })

}

  ngOnInit() {
  }

  addSkill(value: any) {
      console.log(value);
  }

}
