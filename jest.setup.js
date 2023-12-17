const APIBase = require('./apiBase');

jest.spyOn(APIBase.prototype, 'makeRequest').mockImplementation(() => {
  return Promise.resolve(['mocked-api-response']); // Mock implementation
});
