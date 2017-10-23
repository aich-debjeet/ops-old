import { Component, OnInit, Input } from '@angular/core';



@Component({
  selector: 'auth-right-block',
  templateUrl: './auth-right-block.component.html',
  styleUrls: ['./auth-right-block.component.scss']
})

export class AuthRightBlockComponent implements OnInit {

  @Input() rightCom;
  constructor() { }

  ngOnInit() {

  }

}
