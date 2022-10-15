"use strict";

const superagent = require("superagent");
const AirVisual = require("../index");

describe("airvisual.js tests", () => {
  it(" should initialize api wrapper with input params", () => {
    const api = new AirVisual({
      apiKey: "YOUR-API-KEY",
      apiVersion: "v2",
    });
    console.log(AirVisual);
    expect(api.apiKey).toEqual("YOUR-API-KEY");
    expect(api.apiVersion).toEqual("v2");
  });
});
