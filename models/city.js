const APIBase = require('../apiBase');

class City extends APIBase {
  constructor({ apiKey, country, state, city }) {
    super({ apiKey });
    this.country = country;
    this.state = state;
    this.city = city;
  }

  async getStations() {
    return this.makeRequest('stations', {
      country: this.country,
      state: this.state,
      city: this.city,
    });
  }
}

module.exports = City;
