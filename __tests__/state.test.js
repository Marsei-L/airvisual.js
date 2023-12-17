const State = require('../models/state');
const APIBase = require('../apiBase');

describe('State Class', () => {
  it('should fetch cities for a given state', async () => {
    const mockCities = [{ city: 'Los Angeles' }, { city: 'San Francisco' }];

    APIBase.prototype.makeRequest.mockResolvedValue(mockCities);
    const state = new State({
      apiKey: 'testKey',
      country: 'USA',
      state: 'California',
    });

    const cities = await state.getCities();

    expect(cities).toEqual(mockCities);
    expect(APIBase.prototype.makeRequest).toHaveBeenCalledWith('cities', {
      country: 'USA',
      state: 'California',
    });
  });
});
