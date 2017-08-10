import { Component, OnInit, Input } from '@angular/core';

export class RegValue {
  mainTitle: string;
  description: string;
  loginLink: Boolean;
}

@Component({
  selector: 'auth-right-block',
  templateUrl: './auth-right-block.component.html',
  styleUrls: ['./auth-right-block.component.scss']
})

export class AuthRightBlockComponent implements OnInit {

  @Input() rightCom: RegValue;
  constructor() { }

  ngOnInit() {
    console.log(this.rightCom.mainTitle);
  }

}
