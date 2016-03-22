import {bootstrap} from 'angular2/platform/browser'; // Angular magic to bootstrap the application in a web browser
import {AppComponent} from './AppComponent';

let boot = document.addEventListener('DOMContentLoaded', () => {
  bootstrap(AppComponent);
});

// Expose boot so it can be required by webpack.
module.exports = boot;