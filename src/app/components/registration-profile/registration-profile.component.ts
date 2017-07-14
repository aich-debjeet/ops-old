import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration-profile',
  templateUrl: './registration-profile.component.html',
  styleUrls: ['./registration-profile.component.css']
})
export class RegistrationProfileComponent implements OnInit {

  rForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.rForm = fb.group({
      'artCheckbox' : [null, Validators.required],
      'study': [null, Validators.required],
    })
  }
  ngOnInit() { }

  addPost(value: any) {
      console.log(value);
  }

}
