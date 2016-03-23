import {bootstrap} from 'angular2/platform/browser'; // Angular magic to bootstrap the application in a web browser
import {HTTP_PROVIDERS} from 'angular2/http';
import {AppComponent} from './AppComponent';

let boot = document.addEventListener('DOMContentLoaded', () => {
  bootstrap(AppComponent,[HTTP_PROVIDERS]);
});

// Expose boot so it can be required by webpack.
module.exports = boot;