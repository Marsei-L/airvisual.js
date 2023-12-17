const APIBase = require('./apiBase');
const Country = require('./models/country');
const State = require('./models/state');
const City = require('./models/city');
const Station = require('./models/station');

class AirVisual extends APIBase {
  /**
   * Fetches all countries from the AirVisual API.
   * @returns {Promise<Object[]>} A promise that resolves with the list of countries.
   */
  async getAllCountries() {
    return this.makeRequest('countries');
  }

  static get Country() {
    return Country;
  }

  static get State() {
    return State;
  }

  static get City() {
    return City;
  }

  static get Station() {
    return Station;
  }
}

module.exports = AirVisual;
