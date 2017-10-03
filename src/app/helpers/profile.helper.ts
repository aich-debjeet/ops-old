import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfileCard } from './../models/profile.model';

@Injectable()
export class ProfileHelper {
  constructor(private router: Router) { }
  /**
   * Map API response to Profile Card Model
   * @param profile
   */
  profileValueMapping(profileData: any, type: string) {
    let profile;
    // check if its other profile firs
    let maps  = new ProfileCard();
    if (type === 'other') {
      profile = profileData.profile_other;
    } else {
      profile = profileData.profileDetails;
    }

    maps  = new ProfileCard();
    maps = {
      name: profile.name,
      image: {
        profile: profile.profileImage,
        cover: profile.coverImage
      },
      userHandle: this.extractName(profile),
      userBio: profile.summary,
      userSkill: profile.profileType,
      userDetails: profile,
      followingCount: profile.followingCount,
      follwerCount: profile.followersCount,
      extra: profile.extra,
      isFollowing: this.checkFollowing(profile)
    }

    return maps;
  }

  /**
   * Find username from profile object
   * @param profile
   */
  extractName(profile: any) {
    let name;
    if ('username' in profile) {
      name = profile.username;
    } else {
      if ('extra' in profile) {
        name = profile['extra'].username;
      }
    }
    return name;
  }

  /**
   *
   */
  checkFollowing(profile: any) {
    let name = false;
    if ('extra' in profile) {
      const extra = profile['extra'];
      if ('isFollowing' in extra) {
        name = extra['isFollowing'];
      }
    }
    return name;
  }
}
