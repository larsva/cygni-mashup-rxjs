"use strict";

let client = require("./client");
let Rx = require('rx');

let request = ((rg) => client.createRequest(rg.id, `http://coverartarchive.org/release-group/${rg.id}`));

module.exports.fetch = (rg => {
    return client.fetch(request(rg))
      .map(response => ({key: 'album', content: {id: rg.id, title: rg.title, images: response.body.images}}))
      .catch(e => (Rx.Observable.just({key: 'album', content: {id: rg.id, title: rg.title, images: 'N/A'}})));
  }
)
