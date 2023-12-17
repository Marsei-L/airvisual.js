const City = require('../models/city');
const APIBase = require('../apiBase');

describe('City Class', () => {
  it('should fetch stations for a given city', async () => {
    const mockStations = [{ station: 'Station 1' }, { station: 'Station 2' }];

    APIBase.prototype.makeRequest.mockResolvedValue(mockStations);
    const city = new City({
      apiKey: 'testKey',
      country: 'USA',
      state: 'California',
      city: 'Los Angeles',
    });

    const stations = await city.getStations();

    expect(stations).toEqual(mockStations);
    expect(APIBase.prototype.makeRequest).toHaveBeenCalledWith('stations', {
      country: 'USA',
      state: 'California',
      city: 'Los Angeles',
    });
  });
});
