const superagent = require("superagent");
const baseURl = "https://api.airvisual.com";

class AirVisual {
  #apiVersion;
  #apiKey;
  constructor({ apiKey, apiVersion = "v2" }) {
    this.#apiKey = apiKey;
    this.#apiVersion = apiVersion;
  }
  get apiKey() {
    return this.#apiKey;
  }
  get apiVersion() {
    return this.#apiVersion;
  }

  async getCountries() {
    const endpoint = `${baseURl}/${this.#apiVersion}/countries`;
    const response = await superagent
      .get(endpoint)
      .query({ key: this.#apiKey })
      .set("accept", "json")
      .timeout(3 * 1000)
      .retry(3)
      .catch((e) => e);

    if (response?.statusCode !== 200) return [];
    return response.body.data.map(
      (c) =>
        new Country({ apiKey: this.#apiKey, apiVersion: this.#apiVersion, c })
    );
  }
  getStatesByCountryName(countryName) {
    const country = new Country({
      apiKey: this.#apiKey,
      apiVersion: this.#apiVersion,
      c: { country: countryName },
    });
    return country.getStates();
  }
  getCitiesByStateName(countryName, stateName) {
    const state = new State({
      apiKey: this.#apiKey,
      apiVersion: this.#apiVersion,
      s: { country: countryName, state: stateName },
    });
    return state.getCities();
  }
  async getCityByIP(ipAddress) {
    const endpoint = `${baseURl}/${this.#apiVersion}/nearest_city`;
    const response = await superagent
      .get(endpoint)
      .query({ key: this.#apiKey })
      .set("accept", "json")
      .set("x-forwarded-for", ipAddress)
      .timeout(3 * 1000)
      .retry(3)
      .catch((e) => e);

    if (response?.statusCode !== 200) return;

    return new City({
      apiKey: this.#apiKey,
      apiVersion: this.#apiVersion,
      c: response.body.data,
    });
  }
  async getCityByCoordinates(lat, lon) {
    const endpoint = `${baseURl}/${this.#apiVersion}/nearest_city`;
    const response = await superagent
      .get(endpoint)
      .query({ key: this.#apiKey, lat, lon })
      .set("accept", "json")
      .timeout(3 * 1000)
      .retry(3)
      .catch((e) => e);

    if (response?.statusCode !== 200) return;

    return new City({
      apiKey: this.#apiKey,
      apiVersion: this.#apiVersion,
      c: response.body.data,
    });
  }
  getCity(countryName, stateName, cityName) {
    const city = new City({
      apiKey: this.#apiKey,
      apiVersion: this.#apiVersion,
      c: { country: countryName, state: stateName, city: cityName },
    });
    return city.getData();
  }
  getStationsByCityName(countryName, stateName, cityName) {
    const city = new City({
      apiKey: this.#apiKey,
      apiVersion: this.#apiVersion,
      c: { country: countryName, state: stateName, city: cityName },
    });
    return city.getStations();
  }
  async getStationByIP(ipAddress) {
    const endpoint = `${baseURl}/${this.#apiVersion}/nearest_station`;
    const response = await superagent
      .get(endpoint)
      .query({ key: this.#apiKey })
      .set("accept", "json")
      .set("x-forwarded-for", ipAddress)
      .timeout(3 * 1000)
      .retry(3)
      .catch((e) => e);

    if (response?.statusCode !== 200) return;

    return new Station({
      apiKey: this.#apiKey,
      apiVersion: this.#apiVersion,
      s: response.body.data,
    });
  }
  async getStationByCoordinates(lat, lon) {
    const endpoint = `${baseURl}/${this.#apiVersion}/nearest_station`;
    const response = await superagent
      .get(endpoint)
      .query({ key: this.#apiKey, lat, lon })
      .set("accept", "json")
      .timeout(3 * 1000)
      .retry(3)
      .catch((e) => e);

    if (response?.statusCode !== 200) return;

    return new Station({
      apiKey: this.#apiKey,
      apiVersion: this.#apiVersion,
      s: response.body.data,
    });
  }
  async getStation(countryName, stateName, cityName, stationName) {
    const station = new Station({
      apiKey: this.#apiKey,
      apiVersion: this.#apiVersion,
      s: {
        country: countryName,
        state: stateName,
        city: cityName,
        station: stationName,
      },
    });
    return station.getData();
  }
}

class Location {
  type;
  coordinates;
  constructor(l) {
    this.type = l.type;
    this.coordinates = l.coordinates;
  }
  getCoodinates() {
    return { lat: this.coordinates[1], lon: this.coordinates[0] };
  }
}

class Station extends AirVisual {
  #apiVersion;
  #apiKey;
  constructor({ apiKey, apiVersion, s }) {
    super({ apiKey, apiVersion });
    Object.assign(this, s);
    this.location = new Location(s.location);
    this.#apiKey = apiKey;
    this.#apiVersion = apiVersion;
  }
  async getData() {
    const endpoint = `${baseURl}/${this.#apiVersion}/station`;
    const response = await superagent
      .get(endpoint)
      .query({
        key: this.#apiKey,
        country: this.country,
        state: this.state,
        city: this.city,
        station: this.station,
      })
      .set("accept", "json")
      .timeout(3 * 1000)
      .retry(3)
      .catch((e) => e);

    if (response.statusCode === 200) Object.assign(this, response.body.data);
    return this;
  }
  get name() {
    return this.station;
  }
}

class City extends AirVisual {
  #apiVersion;
  #apiKey;
  constructor({ apiKey, apiVersion, c }) {
    super({ apiKey, apiVersion });
    Object.assign(this, c);
    this.#apiKey = apiKey;
    this.#apiVersion = apiVersion;
  }
  async getStations() {
    const endpoint = `${baseURl}/${this.#apiVersion}/stations`;
    const response = await superagent
      .get(endpoint)
      .query({
        key: this.#apiKey,
        country: this.country,
        state: this.state,
        city: this.city,
      })
      .set("accept", "json")
      .timeout(3 * 1000)
      .retry(3)
      .catch((e) => e);
    if (response?.statusCode !== 200) return [];
    return response.body.data.map(
      (s) =>
        new Station({
          apiKey: this.#apiKey,
          apiVersion: this.#apiVersion,
          s: {
            ...s,
            country: this.country,
            state: this.state,
            city: this.city,
          },
        })
    );
  }
  async getData() {
    const endpoint = `${baseURl}/${this.#apiVersion}/city`;
    const response = await superagent
      .get(endpoint)
      .query({
        key: this.#apiKey,
        country: this.country,
        state: this.state,
        city: this.city,
      })
      .set("accept", "json")
      .timeout(3 * 1000)
      .retry(3)
      .catch((e) => e);

    if (response.statusCode === 200) Object.assign(this, response.body.data);
    return this;
  }
  get name() {
    return this.city;
  }
}

class State extends AirVisual {
  #apiVersion;
  #apiKey;
  constructor({ apiKey, apiVersion, s }) {
    super({ apiKey, apiVersion });
    Object.assign(this, s);
    this.#apiKey = apiKey;
    this.#apiVersion = apiVersion;
  }
  async getCities() {
    const endpoint = `${baseURl}/${this.#apiVersion}/cities`;
    const response = await superagent
      .get(endpoint)
      .query({ key: this.#apiKey, country: this.country, state: this.state })
      .set("accept", "json")
      .timeout(3 * 1000)
      .retry(3)
      .catch((e) => e);
    if (response?.statusCode !== 200) return [];
    return response.body.data.map(
      (c) =>
        new City({
          apiKey: this.#apiKey,
          apiVersion: this.#apiVersion,
          c: { ...c, country: this.country, state: this.state },
        })
    );
  }
  get name() {
    return this.state;
  }
}

class Country extends AirVisual {
  #apiVersion;
  #apiKey;
  constructor({ apiKey, apiVersion, c }) {
    super({ apiKey, apiVersion });
    Object.assign(this, c);
    this.#apiKey = apiKey;
    this.#apiVersion = apiVersion;
  }
  async getStates() {
    const endpoint = `${baseURl}/${this.#apiVersion}/states`;
    const response = await superagent
      .get(endpoint)
      .query({ key: this.apiKey, country: this.country })
      .set("accept", "json")
      .timeout(3 * 1000)
      .retry(3)
      .catch((e) => e);
    if (response?.statusCode !== 200) return [];
    return response.body.data.map(
      (s) =>
        new State({
          apiKey: this.#apiKey,
          apiVersion: this.#apiVersion,
          s: { ...s, country: this.country },
        })
    );
  }
  get name() {
    return this.country;
  }
}

module.exports = AirVisual;
