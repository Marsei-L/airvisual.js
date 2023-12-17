const APIBase = require('../apiBase');

class Station extends APIBase {
  constructor({ apiKey, country, state, city, station }) {
    super({ apiKey });
    this.country = country;
    this.state = state;
    this.city = city;
    this.station = station;
  }

  async getData() {
    return this.makeRequest('station', {
      country: this.country,
      state: this.state,
      city: this.city,
      station: this.station,
    });
  }
}

module.exports = Station;
