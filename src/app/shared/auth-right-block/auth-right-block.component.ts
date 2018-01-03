import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'auth-right-block',
  templateUrl: './auth-right-block.component.html',
  styleUrls: ['./auth-right-block.component.scss']
})

export class AuthRightBlockComponent implements OnInit {

  @Input() rightCom;
  imageBaseLink: string = environment.API_IMAGE;
  constructor() { }

  ngOnInit() {

  }

}
