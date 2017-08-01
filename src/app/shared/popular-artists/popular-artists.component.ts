import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popular-artists',
  templateUrl: './popular-artists.component.html',
  styleUrls: ['./popular-artists.component.css']
})
export class PopularArtistsComponent {

  popularArtists: any = [];

  constructor() {

    this.popularArtists = [{
      id: 1,
      name: 'Fname Lname',
      username: 'fnam_lname',
      profileImage: 'https://via.placeholder.com/200x200',
    }, {
      id: 2,
      name: 'Fname Lname',
      username: 'fnam_lname',
      profileImage: 'https://via.placeholder.com/200x200',
    }, {
      id: 3,
      name: 'Fname Lname',
      username: 'fnam_lname',
      profileImage: 'https://via.placeholder.com/200x200',
    }];

  }

}
