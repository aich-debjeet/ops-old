import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';
import { RegValue } from '../../../models/auth.model';

import 'rxjs/add/operator/map'

@Component({
  selector: 'app-registration-add-skill',
  templateUrl: './registration-add-skill.component.html',
  styleUrls: ['./registration-add-skill.component.scss']
})
export class RegistrationAddSkillComponent implements OnInit {

  rForm: FormGroup;
  rightCom: RegValue;
  skills: any;
  artistFollow: any;
  private headers: Headers;

  constructor(fb: FormBuilder,private http: Http) {
    this.rForm = fb.group({
      'profession' : [null, Validators.required],
      'searchskills': [null, Validators.required],
    });

    this.http = http;
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');

    
  


  }

  ngOnInit() {
    this.rightCom = { 
      mainTitle: 'Add Your Skills', 
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod long-and vitality, so that the labor expended. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod long-and vitality, so that the labor expended.',
      loginLink: true
    };

    this.skillList();
    this.artistList();
  }

  myEvent(event) {
    console.log(event);
    console.log(event.target.id );
    console.log(event.currentTarget);
  }

  skillList(){
    this.http.get('http://devservices.greenroom6.com:9000/api/1.0/portal/profiletype')
        // Call map on the response observable to get the parsed people object
        .map(res => res.json())
        // Subscribe to the observable to get the parsed people object and attach it to the
        // component
        .subscribe(skills => this.skills = skills);
  }

  artistList(){
    let val = {
      "isHuman":"1",
      "profileTypeCodeList":["DESKTOPONLINEADVERTISING"]
    };
    let headers = new Headers({ 'Content-Type': 'application/json'}); 
    this.http.put('http://devservices.greenroom6.com:9000/api/1.0/portal/searchprofiles', JSON.stringify(val), { headers: headers })
            .map((res: Response) => res.json())
            .subscribe(skills => {
              this.artistFollow = skills;
              console.log(skills);
            });
  }

  addSkill(value: any) {
      console.log(value);
  }

}
