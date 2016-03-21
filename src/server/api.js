"use strict";

((app) => {

    require("babel-polyfill");
    let configuration = require('./configuration');
    let morgan = require('morgan');
    let mb = require('./musicbrainz-client');
    let wiki = require('./wikipedia-client');
    let coverArt = require('./coverart-client');
    let Rx = require('rx');
    let MashupResult = require('./mashup-result');
    let json = require('./json-traverser');
    let path = require('path');
    let express = require('express');

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

    app.set('views', path.join(__dirname, '..', 'views'));
    app.set('view engine', 'jade');
    app.use(express.static(path.join(__dirname, '..', 'public')));

    app.use(morgan(configuration.logType));
    app.get('/', function (req, res) {
        res.render('index');
    });

    app.get('/mashup/:mbid', async function (req, res) {
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

    app.get('/templates/:template', function (req, res) {
        res.render('templates/' + req.params.template);
    });

    app.listen(configuration.port, () => console.log(`App listening on port ${configuration.port}`));

})(require('express')());

