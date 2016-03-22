
import {Component} from 'angular2/core';
import {MashupComponent} from './MashupComponent';

class AppComponent {
  constructor() {
    this.selectedArtist = {};
    this.artists = [
      {name: 'Nirvana', id:'5b11f4ce-a62d-471e-81fc-a69a8278c7da'},
      {name: 'Neil Young', id: '75167b8b-44e4-407b-9d35-effe87b223cf'}
    ];
  }

  onSelect(artist) {
    this.selectedArtist = artist;
    console.log('Selected artist>> ', this.selectedArtist);
  }
};

AppComponent.annotations = [
  new Component({
    selector: 'mashup-app', // Tag to show app
    templateUrl: 'templates/AppComponent',
    directives:[MashupComponent]
  })
];

export {AppComponent};
