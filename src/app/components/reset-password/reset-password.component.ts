import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    // subscribe to router event
    // this.activatedRoute.params.subscribe((params: Params) => {
    //     let email = params['email'];
    //     console.log(email);
    //   });
  }

}
