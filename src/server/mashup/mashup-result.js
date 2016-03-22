'use strict'

class MashupResult {

  constructor(mbId) {
    this._mbId =mbId;
    this._albums = [];
  }

  get description() {
    return this._description || 'N/A';
  }

  set description(description) {
    this._description = description;
  }

  get albums() {
    return this._albums;
  }

  addResultData(data) {
    if ('description' === data.key) {
      this._description = data.content;
    } else if ('album' === data.key) {
      //     console.log('Album for ',data.content.id,' received');
      this._albums.push(data.content);
    } else {
      console.log('Unknown key in ',data);
    }
  }

  createResult() {
    return {id: this._mbId, biography: this._description, albums: this._albums}
  }
}

module.exports = MashupResult;