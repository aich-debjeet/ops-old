import { Component, OnInit } from '@angular/core';

export class RegValue {
  mainTitle: string;
  description: string;
  loginLink: Boolean;
}


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {
  rightCom: RegValue;
  constructor() { }

  ngOnInit() {
    this.rightCom = { 
      mainTitle: 'Select your profile type', 
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod long-and vitality, so that the labor expended. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod long-and vitality, so that the labor expended.',
      loginLink: true
    };
  }

}
