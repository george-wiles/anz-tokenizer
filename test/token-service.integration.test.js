const tokenService = require('../src/token.service');
const tokens = require('../src/database.service'); 

describe('Tokenization Integration Test', () => {
  beforeEach(() => {
    tokens.clear();
  });

  it('should roundtrip tokenization and detokenization', async () => {
    // Define some account numbers for testing
    const originalAccountNumbers = ['1234', '5678', '91011'];

    // Tokenize the account numbers
    const tokensData = await tokenService.tokenize(originalAccountNumbers);

    // Extract tokens from token data
    const tokensArray = tokensData.map(tokenData => tokenData.token);

    // Detokenize the tokens
    const detokenizedData = await tokenService.detokenize(tokensArray);

    // Extract detokenized account numbers
    const detokenizedAccountNumbers = detokenizedData.map(detokenizedItem => detokenizedItem.originalAccountNumber);

    // Assert that detokenized account numbers match original account numbers
    expect(detokenizedAccountNumbers).toEqual(originalAccountNumbers);
  });
});
