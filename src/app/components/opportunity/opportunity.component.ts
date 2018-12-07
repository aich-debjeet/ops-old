import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../actions/auth.action';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-opportunity',
  templateUrl: './opportunity.component.html',
  styleUrls: ['./opportunity.component.scss']
})
export class OpportunityComponent implements OnInit, OnDestroy {
  routerSub: Subscription;

  constructor(
    private router: Router,
    private store: Store<any>
  ) { }

  ngOnInit() {
    this.routerSub = this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    this.store.dispatch({ type: AuthActions.LOAD_INDUSTRIES });
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
  }

}
