import {bootstrap} from 'angular2/platform/browser'; // Angular magic to bootstrap the application in a web browser
import {MashupComponent} from './MashupComponent';

let boot = document.addEventListener('DOMContentLoaded', () => {
  bootstrap(MashupComponent);
});

// Expose boot so it can be required by webpack.
module.exports = boot;