import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ExploreActions } from '../../../actions/explore.action';
import { ExploreModel } from '../../../models/explore.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-explore-posts',
  templateUrl: './explore-posts.component.html',
  styleUrls: ['./explore-posts.component.scss']
})
export class ExplorePostsComponent implements OnInit {
  @Input() posts: any;

  constructor(
    private exploreStore: Store<ExploreModel>,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  /**
   * Delete Post
   */
  deletePost(media) {
    const id = media['id'];
    this.exploreStore.dispatch({ type: ExploreActions.EXPLORE_MEDIA_POST_DELETE, payload: id });
    this.exploreStore.select('exploreTags')
      .first(state => state['exploreDeletedMediaPost'] === true)
      .subscribe(data => {
        this.toastr.success('Media deleted successfully', 'Success!', {
          timeOut: 3000
        });
      });
  }

}
