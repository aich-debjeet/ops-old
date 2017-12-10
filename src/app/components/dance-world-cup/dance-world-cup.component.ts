import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-dance-world-cup',
  templateUrl: './dance-world-cup.component.html',
  styleUrls: ['./dance-world-cup.component.scss']
})
export class DanceWorldCupComponent implements OnInit, AfterViewInit {

  navItem = '';
  window: Window;

  constructor(private elRef: ElementRef) { }

  ngOnInit() {
  }

  navigateTo(id: string) {
    this.navItem = id;
  }

  ngAfterViewInit() {
    this.elRef.nativeElement.querySelector('a.btn-fb-share').addEventListener('click', this.handleClick.bind(this));
  }

  handleClick() {
    const shareUrl = 'http://aurut.com';
    console.log('called');
    const windowObj = window.open();
    let popUp;
    if (shareUrl) {
      /** Open share dialog */
      popUp = window.open(shareUrl, 'newwindow', '800x800');
    }
  }

}
