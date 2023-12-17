const Country = require('../models/country');
const APIBase = require('../apiBase');

describe('Country Class', () => {
  it('should fetch states for a given country', async () => {
    const mockStates = [{ state: 'California' }, { state: 'Texas' }];

    APIBase.prototype.makeRequest.mockResolvedValue(mockStates);
    const country = new Country({ apiKey: 'testKey', country: 'USA' });

    const states = await country.getStates();

    expect(states).toEqual(mockStates);
    expect(APIBase.prototype.makeRequest).toHaveBeenCalledWith('states', {
      country: 'USA',
    });
  });
});
