import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit, OnDestroy {

  // router subscription
  routerSub: any;
  medias = [{
    type: 'image',
    repoPath: ''
  }, {
    type: 'audio',
    repoPath: ''
  }, {
    type: 'video',
    repoPath: ''
  }];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.routerSub = this.route.params.subscribe((params) => {
      console.log('params', params);
    });
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
  }

}
