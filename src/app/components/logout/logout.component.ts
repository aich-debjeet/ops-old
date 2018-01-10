import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

// Action
import { AuthActions } from '../../actions/auth.action'

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private store: Store<any>,
    private router: Router
  ) { }

  ngOnInit() {
    this.store.dispatch({ type: AuthActions.USER_LOGOUT, payload: ''});
    // localStorage.clear();
    // this.router.navigate(['/login']);
  }

}
