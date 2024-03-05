const TokenController = require('../src/token.controller');

describe('TokenController Integration Tests', () => {
  let tokenController;

  beforeAll(() => {
    tokenController = new TokenController();
  });

  describe('POST /tokenize', () => {
    it('should return status 200 and tokens', async () => {
      // Setup
      const req = { body: [123, 456] };
      const reply = {
        code: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      // Act
      await tokenController.tokenize(req, reply);

      // Verify
      expect(reply.code).toHaveBeenCalledWith(200);
      expect(reply.send).toHaveBeenCalled();
      const result = JSON.parse(reply.send.mock.calls[0][0]);
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(2);
    });
  });

  describe('POST /detokenize', () => {
    it('should return status 200 and account numbers', async () => {
      // Mock the request and reply objects
      const req = { body: ['token1', 'token2'] };
      const reply = {
        code: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      // Mock the detokenize method of tokenService
      const mockAccounts = [{ accountNumber: '12345' }, { accountNumber: '67890' }];
      tokenController.tokenService.detokenize = jest.fn().mockResolvedValue(mockAccounts);

      // Call the detokenize method on the tokenController instance
      await tokenController.detokenize(req, reply);

      // Assert the response
      expect(reply.code).toHaveBeenCalledWith(200);
      expect(reply.send).toHaveBeenCalledWith(JSON.stringify(['12345', '67890']));

    });
  });
});
