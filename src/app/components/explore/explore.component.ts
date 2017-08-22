import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
spotfeeds: any= [];
channels: any= [];
artistFollow: any= [];
  constructor() {
    this.spotfeeds = [
      {'image': '/assets/img/art1.png', 'heading': 'Hypnosis Myth Reality', 'subheading': 'Living in the now' +
      ' use it to Enrich your life', 'selected': false},
      {'image': '/assets/img/art2.png', 'heading': 'Its A Habbit', 'subheading': 'Fire Up Your Motivation', 'selected': false},
      {'image': '/assets/img/art3.jpg', 'heading': 'Do Your Think Motivational', 'subheading': 'Effective Ways to quit', 'selected': false},
      {'image': '/assets/img/art4.png', 'heading': 'Motivate Yourself', 'subheading': 'Fire Up Your Motivation', 'selected': false},
      ];

    this.artistFollow = [
    {'button': 'FOLLOW', 'iconImage': '/assets/img/svg/ico_plus_white.svg', 'image': '/assets/img/' +
    'avatar2.jpg', 'heading': 'Eljah Fletcher', 'heading12': '@Elijah', 'selected': false},
    {'button': 'FOLLOWING', 'iconImage': '', 'image': '/assets/img/' +
    'avatar2.jpg', 'heading': 'Eljah Fletcher', 'heading12': '@Elijah', 'selected': false},
    {'button': 'FOLLOW', 'iconImage': '/assets/img/svg/ico_plus_white.svg', 'image': '/assets/img/' +
    'avatar2.jpg', 'heading': 'Eljah Fletcher', 'heading12': '@Elijah', 'selected': false},
    {'button': 'FOLLOW', 'iconImage': '/assets/img/svg/ico_plus_white.svg', 'image': '/assets/img/' +
    'avatar2.jpg', 'heading': 'Eljah Fletcher', 'heading12': '@Elijah', 'selected': false},
    {'button': 'FOLLOW', 'iconImage': '/assets/img/svg/ico_plus_white.svg', 'image': '/assets/img/' +
    'avatar2.jpg', 'heading': 'Eljah Fletcher', 'heading12': '@Elijah', 'selected': false},
  ];

    this.channels = [
      { 'image1': '/assets/img/pro_block.jpg', 'image2': '/assets/img/pro_block2.jpg',
      'image3': '/assets/img/pro_block3.jpg', 'channelName': 'Motorhome Or Trailer',
      'channelThumb': 'Tobias Van Schneider', 'thumbImage': '/assets/img/avatar.jpg',
      'followersCount': '705', 'followersImage': '/assets/img/svg/ico_follower.svg',
      'postCount': '705', 'postImage': '/assets/img/svg/ico_post.svg', 'button': 'FOLLOW',
      'plusImage': '/assets/img/svg/ico_plus_white.svg', 'selected': false},
      { 'image1': '/assets/img/pro_block.jpg', 'image2': '/assets/img/pro_block2.jpg',
      'image3': '/assets/img/pro_block3.jpg', 'channelName': 'Motorhome Or Trailer',
      'channelThumb': 'Tobias Van Schneider', 'thumbImage': '/assets/img/avatar.jpg',
      'followersCount': '705', 'followersImage': '/assets/img/svg/ico_follower.svg',
      'postCount': '705', 'postImage': '/assets/img/svg/ico_post.svg', 'button': 'FOLLOW',
      'plusImage': '/assets/img/svg/ico_plus_white.svg', 'selected': false},
      { 'image1': '/assets/img/pro_block.jpg', 'image2': '/assets/img/pro_block2.jpg',
      'image3': '/assets/img/pro_block3.jpg', 'channelName': 'Motorhome Or Trailer',
      'channelThumb': 'Tobias Van Schneider', 'thumbImage': '/assets/img/avatar.jpg',
      'followersCount': '705', 'followersImage': '/assets/img/svg/ico_follower.svg',
      'postCount': '705', 'postImage': '/assets/img/svg/ico_post.svg', 'button': 'FOLLOW',
      'plusImage': '/assets/img/svg/ico_plus_white.svg', 'selected': false},
      { 'image1': '/assets/img/pro_block.jpg', 'image2': '/assets/img/pro_block2.jpg',
      'image3': '/assets/img/pro_block3.jpg', 'channelName': 'Motorhome Or Trailer',
      'channelThumb': 'Tobias Van Schneider', 'thumbImage': '/assets/img/avatar.jpg',
      'followersCount': '705', 'followersImage': '/assets/img/svg/ico_follower.svg',
      'postCount': '705', 'postImage': '/assets/img/svg/ico_post.svg', 'button': 'FOLLOW',
      'plusImage': '/assets/img/svg/ico_plus_white.svg', 'selected': false},
    ];

  }

  ngOnInit() {}

}
