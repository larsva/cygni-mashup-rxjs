require("babel-polyfill");
let Rx = require('rx');

let mb = require('../clients/musicbrainz-client');
let wiki = require('../clients/wikipedia-client');
let coverArt = require('../clients/coverart-client');
let MashupResult = require('./mashup-result');
let json = require('../common/json-traverser');

let lookupDescriptionAndCoverArts = (mbData) => {
  return [wiki.fetch(json.scrapeWikipediaName(mbData))]
    .concat(json.extractReleaseGroups(mbData).value().map(rg => coverArt.fetch(rg)));
};

let handleSuccess = (response,mbId,res) => {
  let mbData = response.body;
  let mashupResult = new MashupResult(mbId);

  Rx.Observable
    .merge(Rx.Scheduler.default,lookupDescriptionAndCoverArts(mbData))
    .subscribe(
      (data) => { mashupResult.addResultData(data)},
      (error)  => { console.log('Error ', error)},
      () => { res.json(mashupResult.createResult())}
    )
};

let handleError = (error,res)=> {
  res.status(error.status || 500).json(JSON.parse(error.response.text));
};

module.exports.lookup = async function(req,res) {
  try {
    //noinspection JSUnresolvedVariable
    let mbId = req.params.mbid;
    mb
      .fetch(mbId)
      .subscribe(
        (response) => handleSuccess(response,mbId,res),
        (error) => handleError(error, res)
      )
  } catch(e) { res.status(e.status || 500).json({error: e});}

}