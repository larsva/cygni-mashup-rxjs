import {Inject,Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable } from 'rxjs/Rx';

@Injectable()
class MashupService {
  constructor(http) {
    this.http = http;
    this.loadingChange = new Observable((observer) => this._observer = observer);
  }

  getMashup(mbId) {
    this._observer.next(true);
    return this.http.get('/mashup/' + mbId)
       .map((res) => {
        this._observer.next(false);
        return JSON.parse(res._body);
       })
      .catch((e) => {
        this._observer.next(false);
        return Observable.throw(e.json().error || 'Server error');
      });
  }

}

MashupService.parameters = [new Inject(Http)];

export {MashupService}

