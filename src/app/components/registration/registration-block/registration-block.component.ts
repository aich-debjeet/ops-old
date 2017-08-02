import { Component, OnInit, Input } from '@angular/core';

export class RegValue {
  mainTitle: string;
  description: string;
  loginLink: Boolean;
}

@Component({
  selector: 'app-registration-block',
  templateUrl: './registration-block.component.html',
  styleUrls: ['./registration-block.component.css']
})

export class RegistrationBlockComponent implements OnInit {

  @Input() rightCom: RegValue;
  constructor() { }

  ngOnInit() {
    console.log(this.rightCom.mainTitle);
  }

}
