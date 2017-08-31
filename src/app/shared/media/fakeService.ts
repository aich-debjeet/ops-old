import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Headers } from '@angular/http';

@Injectable()
export class FileUploadService {

    baseUrl = 'http://devservices.greenroom6.com:9000/api/1.0/portal';

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
