# airvisual.js

IQAir AirVisual Public API Wrapper

```JavaScript
"use strict";

const AirVisual = require("@marseil/airvisual");

async function main() {
  const api = new AirVisual({
    apiKey: "YOUR-API-KEY",
    apiVersion: "v2",
  });
  const countries = await api.getCountries();
  const country = countries.find((c) => c.name === "USA");
  const states = await country.getStates();
  const cities = await states[0].getCities();

  const stations = await cities[0].getStations();
  const station = stations[0];
  console.log(station);
}
```
