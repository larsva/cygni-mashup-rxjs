import {Inject} from 'angular2/core'; // Allows us to inject a dependency into a module that's not a component
import {Http, Headers} from 'angular2/http';
import 'rxjs/add/operator/map' // Allows us to map the HTTP response from raw to JSON format

class MashupService {
  constructor(http) {
    this.http = http; // http is an instance of the main Http class
  }
  getMashup(mbId) {
    return this.http.get('/mashup/' + mbId)
      .map((res) => {
        return JSON.parse(res._body);
      });
  }

}

// Declares that Http should be injected each time a new instance of TodoService is created
MashupService.parameters = [new Inject(Http)];

export {MashupService}

