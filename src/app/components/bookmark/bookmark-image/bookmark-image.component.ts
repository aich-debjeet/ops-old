import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { BookmarkModel } from 'app/models/bookmark.model';
import { Store } from '@ngrx/store';
import { ISubscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { BookmarkActions } from 'app/actions/bookmark.action';
import { ToastrService } from 'ngx-toastr';
import { Modal } from 'app/shared/modal-new/Modal';

@Component({
  selector: 'app-bookmark-image',
  templateUrl: './bookmark-image.component.html',
  styleUrls: ['./../bookmark.component.scss']
})
export class BookmarkImageComponent implements OnInit, OnDestroy {

  showPreloader: boolean;
  bookmarkSub: ISubscription;
  bookmarkStore$: Observable<BookmarkModel>;
  bookmarkState: any;
  bookmarks = [];
  @ViewChild('confirmDeleteModal') confirmDeleteModal: Modal;
  delBookData: any;

  constructor(
    private store: Store<BookmarkModel>,
    private toastr: ToastrService
  ) {
    this.bookmarkStore$ = this.store.select('bookmarkStore');
    this.bookmarkSub = this.bookmarkStore$.subscribe((state) => {
      this.bookmarkState = state;
      if (state.bookmarkType && state.bookmarkType === 'image') {
        if (state.loadingBookmarks === false && state.loadedBookmarks === true) {
          this.showPreloader = false;
          this.bookmarks = state.bookmarks;
        }
        if (state.loadingBookmarks === true && state.loadedBookmarks === false) {
          this.showPreloader = true;
        }
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.bookmarkSub.unsubscribe();
  }

  deleteBookmarkAction(data) {
    this.delBookData = data;
    this.confirmDeleteModal.open();
  }

  confirmation(action: string) {
    this.confirmDeleteModal.close();
    if (action === 'yes') {
      this.deleteBookmark();
    }
  }

  deleteBookmark() {
    this.store.dispatch({ type: BookmarkActions.DELETE_BOOKMARK, payload: this.delBookData });
    const bookmarkSub = this.store.select('bookmarkStore')
      .take(2)
      .subscribe(resp => {
        if (resp['deletingBookmark'] === false && resp['deletedBookmark'] === true) {
          this.toastr.success('Bookmark deleted successfully', 'Success!');
          bookmarkSub.unsubscribe();
        }
      });
  }

}
