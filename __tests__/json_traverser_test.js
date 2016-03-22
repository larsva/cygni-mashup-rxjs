'use strict';

let jsonQ = require('jsonq');
let jsonTraverser = require('../src/server/common/json-traverser.js');

jest.unmock('jsonq');
jest.unmock('../src/server/common/json-traverser');

let mbData = {
  "type": "Group",
  "life-span": {
    "end": "1994-04-05",
    "ended": true,
    "begin": "1988-01"
  },
  "sort-name": "Nirvana",
  "begin_area": {
    "sort-name": "Aberdeen",
    "name": "Aberdeen",
    "disambiguation": "",
    "id": "a640b45c-c173-49b1-8030-973603e895b5"
  },
  "release-groups": [
    {
      "id": "01cf1391-141b-3c87-8650-45ade6e59070",
      "first-release-date": "1992-12-14",
      "secondary-types": [
        "Compilation"
      ],
      "primary-type": "Album",
      "title": "Incesticide",
      "disambiguation": ""
    },
    {
      "primary-type": "Album",
      "title": "Verse Chorus Verse",
      "disambiguation": "",
      "id": "1a0edfef-ed8a-4664-8911-1ee69c39ae26",
      "first-release-date": "1994",
      "secondary-types": [

      ]
    },
    {
      "primary-type": "Album",
      "title": "Nevermind",
      "disambiguation": "",
      "first-release-date": "1991-07-11",
      "id": "1b022e01-4da6-387b-8658-8678046e4cef",
      "secondary-types": [

      ]
    },
    {
      "secondary-types": [
        "Compilation"
      ],
      "id": "178b993e-fa9c-36d3-9d73-c5a8ba0c748d",
      "first-release-date": "1993",
      "title": "Wipeout",
      "disambiguation": "",
      "primary-type": "Album"
    }
  ],
  "gender": null,
  "end_area": null,
  "disambiguation": "90s US grunge band",
  "name": "Nirvana",
  "relations": [
    {
      "attributes": [

      ],
      "target-credit": "",
      "attribute-values": {

      },
      "direction": "forward",
      "begin": null,
      "type-id": "d028a975-000c-4525-9333-d3c8425e4b54",
      "source-credit": "",
      "ended": false,
      "type": "BBC Music page",
      "url": {
        "resource": "http:\/\/www.bbc.co.uk\/music\/artists\/5b11f4ce-a62d-471e-81fc-a69a8278c7da",
        "id": "627ce98c-0eef-41c7-b28f-cc3387b98aab"
      },
      "target-type": "url",
      "end": null
    },
    {
      "direction": "forward",
      "attribute-values": {

      },
      "target-credit": "",
      "attributes": [

      ],
      "begin": null,
      "source-credit": "",
      "type-id": "e4d73442-3762-45a8-905c-401da65544ed",
      "end": null,
      "url": {
        "resource": "http:\/\/lyrics.wikia.com\/Nirvana",
        "id": "47e69f92-e4b3-46ca-9f95-28cc11bedf34"
      },
      "target-type": "url",
      "ended": false,
      "type": "lyrics"
    },
    {
      "attribute-values": {

      },
      "direction": "forward",
      "target-credit": "",
      "attributes": [

      ],
      "begin": null,
      "source-credit": "",
      "type-id": "29651736-fa6d-48e4-aadc-a557c6add1cb",
      "url": {
        "id": "d99c5574-096b-45af-bf20-c3dc3e94fde5",
        "resource": "http:\/\/en.wikipedia.org\/wiki\/Nirvana_(band)"
      },
      "target-type": "url",
      "end": null,
      "ended": false,
      "type": "wikipedia"
    }
  ],
  "ipis": [

  ],
  "area": {
    "disambiguation": "",
    "sort-name": "United States",
    "name": "United States",
    "id": "489ce91b-6658-3307-9877-795b68554c98",
    "iso-3166-1-codes": [
      "US"
    ]
  },
  "country": "US",
  "id": "5b11f4ce-a62d-471e-81fc-a69a8278c7da"
};

let wikipediaData = {
  "batchcomplete": "",
  "query": {
    "normalized": [
      {
        "from": "Nirvana_(band)",
        "to": "Nirvana (band)"
      }
    ],
    "pages": {
      "21231": {
        "pageid": 21231,
        "ns": 0,
        "title": "Nirvana (band)",
        "extract": "<p><b>Nirvana<\/b> was an American rock band that was formed by singer and guitarist Kurt Cobain and bassist Krist Novoselic in Aberdeen, Washington, in 1987. Nirvana went through a succession of drummers, the longest-lasting being Dave Grohl, who joined the band in 1990. Despite releasing only three full-length studio albums in their seven-year career, Nirvana has come to be regarded as one of the most influential and important rock bands of the modern era.<\/p>\n<p>In the late 1980s Nirvana established itself as part of the Seattle grunge scene, releasing its first album <i>Bleach<\/i> for the independent record label Sub Pop in 1989. The band eventually came to develop a sound that relied on dynamic contrasts, often between quiet verses and loud, heavy choruses. After signing to major label DGC Records, Nirvana found unexpected success with \"Smells Like Teen Spirit\", the first single from the band's second album <i>Nevermind<\/i> (1991). Nirvana's sudden success widely popularized alternative rock as a whole, and the band's frontman Cobain found himself referred to in the media as the \"spokesman of a generation\", with Nirvana being considered the \"flagship band\" of Generation X. In response, Nirvana's third studio album, <i>In Utero<\/i> (1993), featured an abrasive, less-mainstream sound and challenged the group's audience. The album did not match the sales figures of <i>Nevermind<\/i>, but was still a commercial success and critically acclaimed.<\/p>\n<p>Nirvana's brief run ended following the death of Kurt Cobain in 1994, but various posthumous releases have been issued since, overseen by Novoselic, Grohl, and Cobain's widow Courtney Love. Since its debut, the band has sold over 25 million records in the United States alone, and over 75 million records worldwide, making them one of the best-selling bands of all time. Nirvana was inducted into the Rock and Roll Hall of Fame in 2014, in its first year of eligibility.<\/p>\n<p><\/p>"
      }
    }
  }
};

describe('json-traverser', () => {

  it('should extract wikipedia name in mbData', () => {
    let wikipediaName = jsonTraverser.scrapeWikipediaName(mbData);
    expect(wikipediaName).toBe('Nirvana_(band)');
  }),

  it('should extract release groups from mbData', () => {
    let releaseGroups = jsonTraverser
      .extractReleaseGroups(mbData)
      .value()

    expect(releaseGroups.length).toBe(2);
  }),

  it('should be possible to map extracted release groups from mbData', () => {

    let titles = jsonTraverser.extractReleaseGroups(mbData)
      .value()
      .map(rg => rg.title);

    expect(titles.length).toBe(2);
    expect(titles[0]).toBe('Verse Chorus Verse');
    expect(titles[1]).toBe('Nevermind');

  }),

  it('should extract description from wikipedia result', () => {

    let description = jsonQ(wikipediaData)
                        .find('extract', '0')
                        .firstElm();
    expect(description).toContain('<p><b>Nirvana<\/b>');

  })
})