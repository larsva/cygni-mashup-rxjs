
import {Component} from 'angular2/core';
import {MashupService} from '../services/MashupService'

@Component({
  selector: 'mashup-view', // Tag to show app
  templateUrl: 'templates/MashupComponent',
  inputs:['selectedArtist'],
})

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


MashupComponent.parameters = [[MashupService]];

export {MashupComponent};
