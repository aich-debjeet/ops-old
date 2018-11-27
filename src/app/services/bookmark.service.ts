import { Injectable } from '@angular/core';
import { ApiService } from 'app/helpers/api.service';

@Injectable()
export class BookmarkService {

  constructor(
    private api: ApiService
  ) { }

  getBookmarks(reqBody: any) {
    return this.api.post('/portal/bookmark/search', reqBody);
  }

  getBookmarksCount() {
    return this.api.get('/portal/bookmark/all/counts/loggedInProfile');
  }

  bookmark(reqBody: any) {
    return this.api.post('/portal/bookmark', reqBody);
  }

  deleteBookmark(reqBody: any) {
    return this.api.delete('/portal/bookmark/' + reqBody.type + '/', reqBody.id);
  }

}
