const AirVisual = require('../AirVisual');

describe('AirVisual Class', () => {
  it('should create an instance with the given apiKey and default apiVersion', () => {
    const airVisual = new AirVisual({ apiKey: 'testKey' });
    expect(airVisual.apiKey).toBe('testKey');
    expect(airVisual.apiVersion).toBe('v2');
  });

  it('should call makeRequest when getAllCountries is invoked', async () => {
    const airVisual = new AirVisual({ apiKey: 'testKey' });
    const result = await airVisual.getAllCountries();
    console.log(result);
    expect(airVisual.makeRequest).toHaveBeenCalledWith('countries');
    expect(result).toEqual(['mocked-api-response']);
  });
});
