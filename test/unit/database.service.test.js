// database.test.js

const tokens = require('../../src/database.service');

describe('Persistence Layer', () => {
  it('should insert data into the tokens collection', () => {
    const data = { token: 'token1', originalAccountNumber: '1234' };
    tokens.insert(data);
    const result = tokens.findOne({ token: 'token1' });
    expect(result).toEqual(data);
  });
});
