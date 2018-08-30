import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../actions/auth.action';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-opportunity',
  templateUrl: './opportunity.component.html',
  styleUrls: ['./opportunity.component.scss']
})
export class OpportunityComponent implements OnInit, OnDestroy {
  routerSub: ISubscription;

  constructor(
    private router: Router,
    private loginStore: Store<any>,
  ) { }

  ngOnInit() {
    this.routerSub = this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    this.loginStore.dispatch({ type: AuthActions.LOAD_INDUSTRIES });
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
  }

}
