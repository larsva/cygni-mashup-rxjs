"use strict";

let configuration = require('./configuration');
let agent = require('superagent');
let logger = require('superagent-logger');
let superagentRx = require('superagent-rx');

superagentRx(agent);

function sendRequest(request) {
  return  agent
            .get(request.url)
            .use(logger)
            .query(request.queryParameters || {})
            .timeout(request.timeout || configuration.defaultTimeout)
            .observe();

};

module.exports.createRequest = function (id, url, queryParameters) {
  return { id: id, url : url, queryParameters : queryParameters };
};

module.exports.fetch = function (request) {
  return sendRequest(request);
};
