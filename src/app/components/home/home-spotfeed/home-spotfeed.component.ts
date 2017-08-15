import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

@Component({
  selector: 'app-home-spotfeed',
  templateUrl: './home-spotfeed.component.html',
  styleUrls: ['./home-spotfeed.component.scss']
})
export class HomeSpotfeedComponent implements OnInit {

  constructor(private http: Http) { }

  ngOnInit() {
    this.spotfeed()
  }

  spotfeed(){
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var token = currentUser.access_token; // your token

    let headers = new Headers({ 'Content-Type': 'application/json'}); 
    headers.append('Authorization','Bearer '+token)

    this.http.get('http://devservices.greenroom6.com:9000/api/1.0/portal/network/spotfeed/range/0/5/spotfeed', { headers: headers })
        .map(res => res.json())
        .subscribe(data =>{console.log(data)} );
    
  }

}
