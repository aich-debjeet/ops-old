import { Injectable } from '@angular/core';
import { ApiService } from 'app/helpers/api.service';

@Injectable()
export class BookmarkService {

  constructor(
    private api: ApiService
  ) { }

  getAllBookmarks(reqBody: any) {
    return this.api.post('/portal/bookmark/search', reqBody);
  }

}
