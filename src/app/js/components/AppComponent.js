import {Component,EventEmitter} from 'angular2/core';
import {MashupComponent} from './MashupComponent';
import {MashupService} from '../services/MashupService';
import {CORE_DIRECTIVES } from 'angular2/common';
import {PROGRESSBAR_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  selector: 'mashup-app', // Tag to show app
  templateUrl: 'templates/AppComponent',
  directives: [MashupComponent, PROGRESSBAR_DIRECTIVES,CORE_DIRECTIVES]
})

class AppComponent {

  constructor(mashupService) {
    this.mashupService = mashupService;
    this.selectedArtist = {};
    this.count = 0;
    this.artists = [
      {name: 'Nirvana', id: '5b11f4ce-a62d-471e-81fc-a69a8278c7da'},
      {name: 'Neil Young', id: '75167b8b-44e4-407b-9d35-effe87b223cf'}
    ];

    this.max = 100;
    this.loadingState = new EventEmitter();
    this.loadingProgress = new EventEmitter(0);
  }

  handleLoadingChange(loading) {
    if (loading) {
      this.loadingStarted();
    } else {
      this.loadingFinished();
    }
  }

  loadingStarted() {
    this.loadingState.next(true);
    var count = 0;
    this.loadingProgress.next(count);
    this.progressInterval = setInterval(() => {
      count += 4;
      this.loadingProgress.next(count);
    }, 50);
  }

  loadingFinished() {
    clearInterval(this.progressInterval);
    this.loadingState.next(false);
    this.loadingProgress.next(0);
  }

  ngOnInit() {
    this.loadingState.next(false);
    this.mashupService.loadingChange.subscribe((loading) => this.handleLoadingChange(loading));
  }

  onSelect(artist) {
    this.selectedArtist = artist;
  }

}
;

AppComponent.parameters = [[MashupService]];

export {AppComponent};
