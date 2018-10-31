import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})

export class MediaComponent implements OnInit, OnDestroy {

  urlQuery: any;
  routerSub: ISubscription;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.routerSub = this.route.queryParams.subscribe(params => {
      this.urlQuery = params;
    });
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
  }

}
