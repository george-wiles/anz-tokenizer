const TokenService = require('../../src/token.service');

describe('TokenService', () => {
  let tokenService;

  beforeEach(() => {
    tokenService = new TokenService();
  });

  describe('tokenize', () => {
    it('should tokenize account numbers', async () => {
      // Arrange
      const accountNumbers = [123456, 987654]; 
      tokenService.tokenize = jest.fn().mockResolvedValue(['token1', 'token2']);
      // Act
      const tokens = await tokenService.tokenize(accountNumbers);
      // Verify
      expect(tokens).toEqual(['token1', 'token2']);
      expect(tokenService.tokenize).toHaveBeenCalledWith(accountNumbers);
    });
  });

  describe('detokenize', () => {
    it('should detokenize tokens', async () => {
      // Arrange
      const tokens = ['token1', 'token2']; // Example tokens
      tokenService.detokenize = jest.fn().mockResolvedValue([1234, 9876]);
      // Act
      const accountNumbers = await tokenService.detokenize(tokens);
      // Verify
      expect(accountNumbers).toEqual([1234, 9876]);
      expect(tokenService.detokenize).toHaveBeenCalledWith(tokens);
    });
  });
});