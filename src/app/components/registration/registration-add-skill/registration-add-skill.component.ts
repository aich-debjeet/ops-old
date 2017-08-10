import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { RegValue, ArtistFollow } from '../../../models/auth.model';
import { SearchFilterPipe } from '../../../pipes/search.pipe'

// Action
import { AuthActions } from '../../../actions/auth.action'  

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

export class Channel {
  follow: boolean;
  owner_name: string;
  handle_name: string;
  conver_image: string;
  owner_image:string;
  followers:string;
}


const CHANNEL: Channel[] = [
  { follow: true, handle_name:'Name1', owner_name: 'Mr. Nice', conver_image:'http://d33wubrfki0l68.cloudfront.net/e6502eb0a89408a7d1bdd25e4e6393d9e57afb1e/f32e4/img/channel.jpg', owner_image:'http://d33wubrfki0l68.cloudfront.net/e6502eb0a89408a7d1bdd25e4e6393d9e57afb1e/f32e4/img/channel.jpg', followers: '10 followers' },
  { follow: false, handle_name:'Name1', owner_name: 'Mr. Nice', conver_image:'http://d33wubrfki0l68.cloudfront.net/e6502eb0a89408a7d1bdd25e4e6393d9e57afb1e/f32e4/img/channel.jpg', owner_image:'http://d33wubrfki0l68.cloudfront.net/e6502eb0a89408a7d1bdd25e4e6393d9e57afb1e/f32e4/img/channel.jpg', followers: '10 followers'},
  { follow: false, handle_name:'Name1', owner_name: 'Mr. Nice', conver_image:'http://d33wubrfki0l68.cloudfront.net/e6502eb0a89408a7d1bdd25e4e6393d9e57afb1e/f32e4/img/channel.jpg', owner_image:'http://d33wubrfki0l68.cloudfront.net/e6502eb0a89408a7d1bdd25e4e6393d9e57afb1e/f32e4/img/channel.jpg', followers: '10 followers' },
  { follow: true, handle_name:'Name1', owner_name: 'Mr. Nice', conver_image:'http://d33wubrfki0l68.cloudfront.net/e6502eb0a89408a7d1bdd25e4e6393d9e57afb1e/f32e4/img/channel.jpg', owner_image:'http://d33wubrfki0l68.cloudfront.net/e6502eb0a89408a7d1bdd25e4e6393d9e57afb1e/f32e4/img/channel.jpg' ,followers: '10 followers'},
  { follow: false, handle_name:'Name1', owner_name: 'Mr. Nice', conver_image:'http://d33wubrfki0l68.cloudfront.net/e6502eb0a89408a7d1bdd25e4e6393d9e57afb1e/f32e4/img/channel.jpg', owner_image:'http://d33wubrfki0l68.cloudfront.net/e6502eb0a89408a7d1bdd25e4e6393d9e57afb1e/f32e4/img/channel.jpg', followers: '10 followers' },
  { follow: false, handle_name:'Name1', owner_name: 'Mr. Nice', conver_image:'http://d33wubrfki0l68.cloudfront.net/e6502eb0a89408a7d1bdd25e4e6393d9e57afb1e/f32e4/img/channel.jpg', owner_image:'http://d33wubrfki0l68.cloudfront.net/e6502eb0a89408a7d1bdd25e4e6393d9e57afb1e/f32e4/img/channel.jpg', followers: '10 followers' },
];





@Component({
  selector: 'app-registration-add-skill',
  templateUrl: './registration-add-skill.component.html',
  styleUrls: ['./registration-add-skill.component.scss']
})
export class RegistrationAddSkillComponent implements OnInit {


  channelList = CHANNEL;
  is_skill_open = false;

  tagState$: Observable<ArtistFollow>;
  private tagStateSubscription: Subscription;
  artistFollowList: ArtistFollow;

  rForm: FormGroup;
  rightCom: RegValue;
  skills: any;
  artistFollow: any;
  private headers: Headers;

  constructor(fb: FormBuilder,private http: Http, private store: Store<ArtistFollow>) {

    this.tagState$ = store.select('loginTags');
    this.tagState$.subscribe((state) => {
        this.artistFollowList = state;

         console.log(this.artistFollowList);
        // this.done = !!(this.petTag.shape && this.petTag.text);
      });

    this.rForm = fb.group({
      'profession' : [null, Validators.required],
      'searchskills': [null, Validators.required],
    });

    this.http = http;
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');

    
  


  }

  // tripLikeState() {
  //   if (!this.trip) return 'inactive';
  //   return this.trip.is_liked_by_current_user ? 'active' : 'inactive';
  // }

  ngOnInit() {
    this.rightCom = { 
      mainTitle: 'Select your profile type', 
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod long-and vitality, so that the labor expended. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      loginLink: true,
      button_text: 'Sign Up',
      button_link: '/home'
    };

    this.skillList();
    // this.artistList();
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

  onChange(value){
    console.log(value);
  }

  artistList(code: string){
    this.is_skill_open = true;
    let val = {
      "isHuman":"1",
      "profileTypeCodeList":[code]
    };
    this.store.dispatch({ type: AuthActions.USER_ARTIST_FOLLOW, payload: val});
    
    // let headers = new Headers({ 'Content-Type': 'application/json'}); 
    // this.http.put('http://devservices.greenroom6.com:9000/api/1.0/portal/searchprofiles', JSON.stringify(val), { headers: headers })
    //         .map((res: Response) => res.json())
    //         .subscribe(skills => {
    //           this.artistFollow = skills;
    //           console.log(skills);
    //         });
  }

  addSkill(value: any) {
      console.log(value);
  }

  onClose(value) {
    console.log('close binid');
    console.log(value);
  }


}
