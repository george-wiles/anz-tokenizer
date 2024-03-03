const TokenService = require('../../src/token.service');
const tokens = require('../../src/database.service');

jest.mock('../../src/database.service');

describe('TokenService', () => {
  beforeEach(() => {
    tokens.clear(); 
  });

  it('should tokenize account numbers', async () => {
    tokens.insert.mockReturnValueOnce(); // Mock the database insert method
    const accountNumbers = ['1234', '5678', '91011'];
    const tokensResult = await TokenService.tokenize(accountNumbers);
    expect(tokensResult).toHaveLength(accountNumbers.length);
    // Verify that tokens are inserted into the database
    expect(tokens.insert).toHaveBeenCalledTimes(accountNumbers.length);
  });

  it('should detokenize tokens', async () => {
    tokens.findOne.mockReturnValueOnce({ originalAccountNumber: '1234' }); // Mock the database findOne method
    const tokensToDetokenize = ['token1', 'token2', 'token3'];
    const detokenizedData = await TokenService.detokenize(tokensToDetokenize);
    expect(detokenizedData).toHaveLength(tokensToDetokenize.length);
    // Verify that detokenization logic is correct
    expect(detokenizedData[0].originalAccountNumber).toBe('1234');
  });


});
