"use strict";

let client = require("./client");
let _ = require('lodash');
let Rx = require('rx');

let extractKey = ((res) => _.chain(res).get("query.pages", {}).keys().head().value());
let extractDescription = ((res) => _(res).get(`query.pages[${extractKey(res)}].extract`, 'n/a'));

let queryParameters = ((name) => ({ action: 'query', format: 'json', prop: 'extracts', exintro: 'true', redirects: 'true', titles: name }));
let request = ((name)=>(client.createRequest(name, 'https://en.wikipedia.org/w/api.php', queryParameters(name))));

module.exports.fetch = ((name) => {
    return client.fetch(request(name))
      .map(result => ({key:'description', content: { id : name, description : extractDescription(result.body)}}))
      .catch(e => (Rx.Observable.just({key: 'description', content: {id: name, description: 'N/A'}})));
});
