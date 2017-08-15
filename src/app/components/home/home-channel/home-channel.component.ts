import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

const CHANNEL = [
  {
        "spotfeedId": "z_449fdf3b-9502-4793-a56e-bbc79229f949",
        "spotfeedImage": "",
        "media": [
            {
                "mediaId": "z_25519804-2462-453f-a8fa-9781a58aa0bb",
                "repoPath": "images/T_24450973_EEC8_4273_BFA7_9F7B45DB08A7YASWANTH_RAJA_AEIONE_COM/c1a82787-98db-493d-95e3-37f245327f91.png",
                "mediaType": "image"
            }
        ],
        "spotfeedName": "santhosh android",
        "ownerHandle": "M_8549FF0B_5861_483F_A051_87AB7E867DABSACHIN_NAGALGAWE_SCRIPTUIT_COM",
        "ownerName": "Milind Soman",
        "ownerImage": "http://d206s58i653k1q.cloudfront.net/images/M_8549FF0B_5861_483F_A051_87AB7E867DABSACHIN_NAGALGAWE_SCRIPTUIT_COM/1c3c1a9a-de96-4862-94b5-4cbc0b697610.jpeg",
        "followersCount": 0,
        "mediaCount": 1,
        "isFollowing": false
    },
    {
        "spotfeedId": "s-87b939b9-5d33-4d7f-a047-23241964434c",
        "spotfeedImage": "",
        "media": [
            {
                "mediaId": "s_8a6a173c-82fa-4807-a1d8-e53f57ade526",
                "repoPath": "images/T_24450973_EEC8_4273_BFA7_9F7B45DB08A7YASWANTH_RAJA_AEIONE_COM/c1a82787-98db-493d-95e3-37f245327f91.png",
                "mediaType": "image"
            }
        ],
        "spotfeedName": "santhosh android",
        "ownerHandle": "M_8549FF0B_5861_483F_A051_87AB7E867DABSACHIN_NAGALGAWE_SCRIPTUIT_COM",
        "ownerName": "Milind Soman",
        "ownerImage": "http://d206s58i653k1q.cloudfront.net/images/M_8549FF0B_5861_483F_A051_87AB7E867DABSACHIN_NAGALGAWE_SCRIPTUIT_COM/1c3c1a9a-de96-4862-94b5-4cbc0b697610.jpeg",
        "followersCount": 0,
        "mediaCount": 1,
        "isFollowing": false
    },
    {
        "spotfeedId": "o-9a7ee435-ea9c-4445-b1e6-02fde3336e79",
        "spotfeedImage": "",
        "media": [
            {
                "mediaId": "e_cbc9b8c0-0fde-4fec-b804-12522c8a813e",
                "repoPath": "images/T_24450973_EEC8_4273_BFA7_9F7B45DB08A7YASWANTH_RAJA_AEIONE_COM/c1a82787-98db-493d-95e3-37f245327f91.png",
                "mediaType": "image"
            }
        ],
        "spotfeedName": "santhosh android",
        "ownerHandle": "M_8549FF0B_5861_483F_A051_87AB7E867DABSACHIN_NAGALGAWE_SCRIPTUIT_COM",
        "ownerName": "Milind Soman",
        "ownerImage": "http://d206s58i653k1q.cloudfront.net/images/M_8549FF0B_5861_483F_A051_87AB7E867DABSACHIN_NAGALGAWE_SCRIPTUIT_COM/1c3c1a9a-de96-4862-94b5-4cbc0b697610.jpeg",
        "followersCount": 0,
        "mediaCount": 1,
        "isFollowing": false
    }
];


@Component({
  selector: 'app-home-channel',
  templateUrl: './home-channel.component.html',
  styleUrls: ['./home-channel.component.scss']
})
export class HomeChannelComponent implements OnInit {

  channelList = CHANNEL;
  constructor(private http: Http) { }

  ngOnInit() {
  }

  channel(){
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var token = currentUser.access_token; // your token

    let headers = new Headers({ 'Content-Type': 'application/json'}); 
    headers.append('Authorization','Bearer '+token)

    this.http.get('http://devservices.greenroom6.com:9000/api/1.0/portal/network/spotfeed/range/0/5/spotfeed', { headers: headers })
        .map(res => res.json())
        .subscribe(data =>{console.log(data)} );
    
  }
}
