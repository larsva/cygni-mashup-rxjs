"use strict";

let jsonQ = require('jsonq');

module.exports  = {

  scrapeWikipediaName: (mb) => {
    return jsonQ(jsonQ.clone(mb))
      .find('relations')
      .find('type', function() {return this == 'wikipedia';} )
      .parent()
      .find('url')
      .find('resource')
      .value(function(url) {return url.substring(url.lastIndexOf("/") + 1, url.length)})
      .firstElm();

  },

  extractReleaseGroups:(mb) => {
    return jsonQ(mb)
      .find('release-groups')
      .find('primary-type', function() {return this === 'Album';} )
      .parent()
      .find('secondary-types',function() {return this.length === 0;})
      .parent();
  },

  extractWikipediaDescription: (wp) => {
  return jsonQ(wp)
          .find('extract', '0')
          .firstElm();
  }

};