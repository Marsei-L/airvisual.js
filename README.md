# airvisual.js

Get an API key on [iqair.com/air-pollution-data-api](https://www.iqair.com/air-pollution-data-api])

IQAir AirVisual Public API Wrapper

```JavaScript
const AirVisual = require("./AirVisual");

async function main() {
  const apiKey = "YOUR_API_KEY"; // Replace with your actual API key

  const country = new AirVisual.Country({ apiKey, country: "USA" });

  const states = await country.getStates();
  console.log("States in USA:", states);
  console.table(states.slice(0, 5));
  const city = new AirVisual.City({
    apiKey,
    country: "USA",
    state: "California",
    city: "Los Angeles",
  });

  const stations = await city.getStations();
  console.log("Stations in Los Angeles:", stations);
}

main();
```
