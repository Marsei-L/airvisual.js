const APIBase = require('../apiBase');

class State extends APIBase {
  constructor({ apiKey, country, state }) {
    super({ apiKey });
    this.country = country;
    this.state = state;
  }

  async getCities() {
    return this.makeRequest('cities', {
      country: this.country,
      state: this.state,
    });
  }
}

module.exports = State;
