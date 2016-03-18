"use strict";

let client = require("./client");
let _ = require('lodash');

let isAlbum = ((rg) => (rg["primary-type"] === "Album" && _(rg).get("secondary-types", []).length == 0));

module.exports.extractReleaseGroups = ((mb) => (_.chain(_(mb).get("release-groups", [])).filter(rg => isAlbum(rg)).value()));

module.exports.extractWikipediaName = function(mb) {
    return _.chain(_(mb).get("relations", []))
            .filter(relation => relation.type === "wikipedia")
            .map(relation => relation.url.resource)
            .map(url => url.substring(url.lastIndexOf("/") + 1, url.length))
            .head()
            .value();
};

let queryParameters = {fmt: 'json', inc: 'url-rels+release-groups'};
let request = ((mbid) => (client.createRequest(mbid, `http://musicbrainz.org/ws/2/artist/${mbid}`, queryParameters)));

module.exports.fetch = ((mbid) => (client.fetch(request(mbid))));
