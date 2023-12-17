const Station = require('../models/station');
const APIBase = require('../apiBase');

describe('Station Class', () => {
  it('should fetch data for a given station', async () => {
    const mockStationData = { data: 'Station data' };

    APIBase.prototype.makeRequest.mockResolvedValue(mockStationData);
    const station = new Station({
      apiKey: 'testKey',
      country: 'USA',
      state: 'California',
      city: 'Los Angeles',
      station: 'Station 1',
    });

    const data = await station.getData();

    expect(data).toEqual(mockStationData);
    expect(APIBase.prototype.makeRequest).toHaveBeenCalledWith('station', {
      country: 'USA',
      state: 'California',
      city: 'Los Angeles',
      station: 'Station 1',
    });
  });
});
