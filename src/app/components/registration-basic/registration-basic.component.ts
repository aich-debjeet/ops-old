import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration-basic',
  templateUrl: './registration-basic.component.html',
  styleUrls: ['./registration-basic.component.css']
})
export class RegistrationBasicComponent implements OnInit {

  public regFormBasic: FormGroup;
  public user;

  constructor(fb: FormBuilder) {

    this.regFormBasic = fb.group({
      'name' : [null, Validators.required],
      'username' : [null, Validators.required],
      'dob' : [null, Validators.required],
      'email' : [null, Validators.required],
      'number' : [null, Validators.required],
      'password' : [null, Validators.required],
      'confirm_password' : [null, Validators.required],
      // 'photo' : [null, Validators.required],
      // 'gender' : [null, Validators.required],
    })

  }

  ngOnInit() { }

  submitForm(value: any): void {
    console.log('Reactive Form Data: ')
    console.log(value);
  }

}
