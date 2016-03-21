"use strict";

let client = require("./client");
let json = require('./json-traverser');
let Rx = require('rx');

let queryParameters = ((name) => ({ action: 'query', format: 'json', prop: 'extracts', exintro: 'true', redirects: 'true', titles: name }));
let request = ((name)=>(client.createRequest(name, 'https://en.wikipedia.org/w/api.php', queryParameters(name))));

module.exports.fetch = ((name) => {
    return client.fetch(request(name))
      .map(result => ({key:'description', content: { id : name, description : json.extractWikipediaDescription(result.body)}}))
      .catch(e => (Rx.Observable.just({key: 'description', content: {id: name, description: 'N/A'}})));
});
