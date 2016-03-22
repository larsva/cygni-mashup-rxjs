require("babel-polyfill");
let Rx = require('rx');

let mb = require('../clients/musicbrainz-client');
let wiki = require('../clients/wikipedia-client');
let coverArt = require('../clients/coverart-client');
let MashupResult = require('./mashup-result');
let json = require('../common/json-traverser');

let handleMbResponse = (response,mbId,res) => {
  let mbData = response.body;
  let mashupResult = new MashupResult();

  Rx.Observable
    .merge(Rx.Scheduler.default,[wiki.fetch(json.scrapeWikipediaName(mbData))].concat(json.extractReleaseGroups(mbData).value().map(rg => coverArt.fetch(rg))))
    .subscribe(
      (data) => { mashupResult.addResultData(data)},
      (error)  => { console.log('Error ', error)},
      () => { res.json(createResult(mbId,mashupResult.description,mashupResult.albums))}
    )
};

let createResult = (mbid, description, albums) => ({id: mbid, biography: description, albums: albums});

module.exports.mashup = async function(req,res) {
  try {
    //noinspection JSUnresolvedVariable
    let mbId = req.params.mbid;
    mb
      .fetch(mbId)
      .subscribe(
        (response) => {handleMbResponse(response,mbId,res)},
        (error) => {res.status(error.status || 500).json(JSON.parse(error.response.text))}
      )
  } catch(e) { res.status(e.status || 500).json({error: e});}

}