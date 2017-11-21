import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Headers } from '@angular/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class FileUploadService {

    baseUrl = environment.API_ENDPOINT + '/api/1.0/portal';

    constructor(private _http: Http) { }

    upload(formData, user) {
        const url = `${this.baseUrl}/cdn/media/upload/multiple?handle=${user}` ;
        return this._http.post(url, formData)
            .map(x => x.json())
            .map((x: any[]) => x
                .map(item => Object
                  .assign({}, item, { url: `${this.baseUrl}/images/${item.id}` }))
            );
    }
}
