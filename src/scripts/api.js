"use strict";

((app) => {
    let configuration = require('./configuration');
    let morgan = require('morgan');
    let mb = require('./musicbrainz-client');
    let wiki = require('./wikipedia-client');
    let coverArt = require('./coverart-client');
    let Rx = require('rx');
    let MashupResult = require('./mashup-result');
    let json = require('./json-traverser');

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

    app.use(morgan(configuration.logType));
    app.get('/:mbid', async function (req, res) {
        try {
          let mbId = req.params.mbid;
          mb
            .fetch(mbId)
              .subscribe(
                (response) => {handleMbResponse(response,mbId,res)},
                (error) => {res.status(error.status || 500).json(JSON.parse(error.response.text))}
              )
        } catch(e) { res.status(e.status || 500).json({error: e});}
    });

    app.listen(configuration.port, () => console.log(`App listening on port ${configuration.port}`));

})(require('express')());

