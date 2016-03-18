"use strict";

((app) => {
    let configuration = require('./configuration');
    let morgan = require('morgan');
    let mb = require('./musicbrainz-client');
    let wiki = require('./wikipedia-client');
    let coverArt = require('./coverart-client');
    let Rx = require('rx');
    let MashupResult = require('./mashup-result');

    let createResult = (mbid, description, albums) => ({id: mbid, biography: description, albums: albums});
    app.use(morgan(configuration.logType));
    app.get('/:mbid', async function (req, res) {
        try {
            let mashupResult = new MashupResult();
            let mbId = req.params.mbid;
             mb
              .fetch(mbId)
              .subscribe(
                function onNext(response) {
                  let mbData = response.body;
                  Rx.Observable
                    .merge(Rx.Scheduler.default,[wiki.fetch(mb.extractWikipediaName(mbData))].concat(mb.extractReleaseGroups(mbData).map(rg => coverArt.fetch(rg))))
                      .subscribe(
                        function onNext(data) {
                            mashupResult.addResultData(data);
                        },
                        function onError(err) {
                          console.log('Error ', err);
                        },
                        function onComplete() {
                          res.json(createResult(mbId,mashupResult.description,mashupResult.albums));
                        }
                      )
                },
                function onError(e) {
                  res.status(e.status || 500).json(JSON.parse(e.response.text));
                })
        } catch(e) {
            console.log('error: ',e);
            res.status(e.status || 500).json({error: e});
        }
    });

    app.listen(configuration.port, () => console.log(`App listening on port ${configuration.port}`));
})(require('express')());

