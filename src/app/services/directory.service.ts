import { Injectable } from '@angular/core';
import { ApiService } from '../helpers/api.service';

@Injectable()
export class DirectoryService {

    constructor(
        private api: ApiService
    ) { }

    /**
     * Load directory profiles
     */
    loadDirectory(body: any) {
      return this.api.put('/portal/directory', body);
    }

}
