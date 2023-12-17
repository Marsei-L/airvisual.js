const APIBase = require('../apiBase');

class Country extends APIBase {
  constructor({ apiKey, country }) {
    super({ apiKey });
    this.country = country;
  }

  async getStates() {
    return this.makeRequest('states', { country: this.country });
  }
}

module.exports = Country;
