const superagent = require('superagent');
const baseURl = 'https://api.airvisual.com';

class APIBase {
  constructor({ apiKey, apiVersion = 'v2' }) {
    this.apiKey = apiKey;
    this.apiVersion = apiVersion;
  }

  async makeRequest(endpoint, queryParams = {}, headers = {}) {
    try {
      const response = await superagent
        .get(`${baseURl}/${this.apiVersion}/${endpoint}`)
        .query({ key: this.apiKey, ...queryParams })
        .set('accept', 'json')
        .set(headers)
        .timeout(3 * 1000)
        .retry(3);

      if (response.statusCode !== 200) {
        throw new Error(`API Error: ${response.statusCode}`);
      }

      return response.body.data;
    } catch (error) {
      console.error('Error making request:', error.message || error);
      throw error;
    }
  }
}

module.exports = APIBase;
