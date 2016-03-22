
import {Component, View} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {MashupService} from './MashupService'

class MashupComponent {
  constructor(mashupService) {
    this.mashup = {biography: {description: ''}};
    this.mashupService = mashupService;
    this.mashupService.getMashup('5b11f4ce-a62d-471e-81fc-a69a8278c7da')
      // Rxjs, we subscribe to the response
      .subscribe((res) => {
        this.mashup = res;
        console.log('Mashup>> ',this.mashup);
      });
  }

};

MashupComponent.annotations = [
  new Component({
    selector: 'mashup-app', // Tag to show app
    templateUrl: 'templates/MashupComponent',
    providers: [MashupService, HTTP_PROVIDERS] // Lets Angular know about MashupService and Http
  })
];

MashupComponent.parameters = [[MashupService]];

export {MashupComponent};
