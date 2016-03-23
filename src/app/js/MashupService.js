import {Inject,Injectable} from 'angular2/core'; // Allows us to inject a dependency into a module that's not a component
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map' // Allows us to map the HTTP response from raw to JSON format

@Injectable()
class MashupService {
  constructor(http) {
    this.http = http;
  }
  getMashup(mbId) {
    return this.http.get('/mashup/' + mbId)
      .map((res) => {
        return JSON.parse(res._body);
      });
  }

}

MashupService.parameters = [new Inject(Http)];

export {MashupService}

