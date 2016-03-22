
import {Component,ChangeDetectionStrategy} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {MashupService} from './MashupService'

class MashupComponent {
  selectedArtist;

  constructor( mashupService) {
    this.mashup = {biography: {description: 'N/A'}};
    this.mashupService = mashupService;
   }

  ngOnChanges(change) {
    if (change.selectedArtist) {
      if (this.selectedArtist.id) {
        console.log('selectedArtist has changed>> ', this.selectedArtist.name);
        this.mashupService.getMashup(this.selectedArtist.id)
          .subscribe((res) => {
            this.mashup = res;
            console.log('Mashup id>> ', this.mashup.id);
          });
      } else {
        this.mashup = {biography: {description: 'N/A'}};
      }
    }
  }

};

MashupComponent.annotations = [
  new Component({
    selector: 'mashup-view', // Tag to show app
    templateUrl: 'templates/MashupComponent',
 //   changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [MashupService, HTTP_PROVIDERS],
    inputs:['selectedArtist']
  })
];

MashupComponent.parameters = [[MashupService]];

export {MashupComponent};
