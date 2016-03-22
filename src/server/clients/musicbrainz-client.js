"use strict";

let client = require("./client");

let queryParameters = {fmt: 'json', inc: 'url-rels+release-groups'};
let request = ((mbid) => (client.createRequest(mbid, `http://musicbrainz.org/ws/2/artist/${mbid}`, queryParameters)));

module.exports.fetch = ((mbid) => (client.fetch(request(mbid))));
