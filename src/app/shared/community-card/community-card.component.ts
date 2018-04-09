import { Component, OnInit, Input } from '@angular/core';
import { environment } from './../../../environments/environment';
import { CommunitiesActions } from '../../actions/communities.action';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-community-card',
  templateUrl: './community-card.component.html',
  styleUrls: ['./community-card.component.scss']
})
export class CommunityCardComponent implements OnInit {
  @Input() data;
  @Input() loader: boolean = false;

  imageLink: string = environment.API_IMAGE;
  constructor(
    private store: Store<any>,
  ) { }

  ngOnInit() {
  }

  joinCommunity(id) {
    console.log(id);
    this.store.dispatch({ type: CommunitiesActions.COMMUNITY_JOIN, payload: id });
  }

}
