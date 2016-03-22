"use strict";

((app) => {

    let path = require('path');
    let express = require('express');
    let morgan = require('morgan');
    let configuration = require('./common/configuration');

    app.set('views', path.join(__dirname, '..', 'views'));
    app.set('view engine', 'jade');
    app.use(express.static(path.join(__dirname, '..', 'public')));

    app.use(morgan(configuration.logType));

    app.get('/', function (req, res) {
        res.render('index');
    });

    app.get('/templates/:template', function (req, res) {
        res.render('templates/' + req.params.template);
    });

    app.use('/mashup', require('./mashup'));

    app.listen(configuration.port, () => console.log(`App listening on port ${configuration.port}`));

})(require('express')());

