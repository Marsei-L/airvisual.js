
declare class AirVisual {
    constructor({ apiKey: String, apiVersion: String })
    get apiKey(): string
    get apiVersion(): string
    async getCountries(): AirVisual.Types.Countries;
    getStatesByCountryName(countryName: String): AirVisual.Types.States;
    getCitiesByStateName(countryName, stateName: String): AirVisual.Types.Cities;
    getCityByIP(ipAddress: String): AirVisual.Types.City;
    getCityByCoordinates(lat, lon: String): AirVisual.Types.City;
    getCity(countryName, stateName, cityName: String): AirVisual.Types.City;
    getStationsByCityName(countryName, stateName, cityName: String): AirVisual.Types.Station;
    getStationByIP(ipAddress: String): AirVisual.Types.Station;
    getStationByCoordinates(lat, lon: String): AirVisual.Types.Station;
    getStation(countryName, stateName, cityName, stationName: String): AirVisual.Types.Station;
}

declare namespace AirVisual {
    export interface Location {
        type: String
        coordinates: Array<Number>
        getCoodinates(): Object
    }

    export interface Forecast {
        ts: String
        aqius: Number
        aqicn: Number
        tp: Number
        tp_min: Number
        pr: Number
        hu: Number
        ws: Number
        wd: Number
        ic: String
    }

    export interface Weather {
        ts: String
        tp: Number
        pr: Number
        hu: Number
        ws: Number
        wd: Number
        ic: String
    }

    export interface Metric {
        conc: Number
        aqius: Number
        aqicn: Number
    }

    export interface Pollution {
        ts: String
        aqius: Number
        mainus: String
        aqicn: Number
        maincn: String
        p2: Metric
        p1: Metric
        o3: Metric
        n2: Metric
        s2: Metric
        co: Metric
    }

    export interface Current {
        weather: Weather
        pollution: Pollution
    }

    export interface History {
        weather: Array<Weather>
        pollution: Array<Pollution>
    }
    export interface Country extends AirVisual {
        name: String;
        country: String;
        async getStates(): AirVisual.Types.States;
        get name(): string
    }
    export interface State extends AirVisual {
        name: String;
        country: String;
        state: String;
        async getCities(): AirVisual.Types.Cities;
        get name(): string
    }
    export interface City extends AirVisual {
        city: String;
        name: String;
        country: String;
        state: String;
        location?: Location;
        forecast?: Array<Forecast>;
        current?: Current;
        history?: History;
        async getStations(): AirVisual.Types.Stations;
        async getData(): AirVisual.Types.Station;
        get name(): string
    }
    export interface Station extends AirVisual {
        station: String;
        name: String;
        country: String;
        state: String;
        city: String;
        location?: Location;
        forecast?: Array<Forecast>;
        current?: Current;
        history?: History;
        async getData(): AirVisual.Types.Station;
        get name(): string
    }
    export type Countries = Country[];
    export type States = State[];
    export type Cities = City[];
    export type Stations = Station[];
    export import Types = AirVisual;
}


export = AirVisual;