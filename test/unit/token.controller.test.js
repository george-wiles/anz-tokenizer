const tokenController = require('../../src/token.controller');
const tokenService = require("../../src/token.service");

describe('TokenController', () => {
  describe('tokenize', () => {
    it('should tokenize account numbers', async () => {
      // Mock request and reply objects
      const req = { body: { accountNumbers: ['1234', '5678', '91011'] } };
      const reply = {
        code: jest.fn().mockReturnThis(), // Mock the code method and return the reply object itself
        send: jest.fn() // Mock the send method
      };

      // Call the tokenize method with the mock request and reply objects
      await tokenController.tokenize(req, reply);

      // Verify
      expect(reply.code).toHaveBeenCalledWith(200);
      const jsonResponse = JSON.parse(reply.send.mock.calls[0]);
      expect(jsonResponse.tokens.length).toEqual(3);

    });
  });

  describe('detokenize', () => {
    it('should detokenize tokens', async () => {
      // Mock request and reply objects
      const req = { body: { tokens: ['token1', 'token2'] } };
      const reply = {
        code: jest.fn().mockReturnThis(), // Mock the code method and return the reply object itself
        send: jest.fn() // Mock the send method
      };

      // Mock the database call for token lookup
      tokenService.detokenize = jest.fn().mockImplementation(tokens => {
        const accountNumbers = [];
        tokens.forEach(token => {
          if (token === 'token1') {
            accountNumbers.push('1111-2222');
          } else if (token === 'token2') {
            accountNumbers.push('2222-3333');
          } else {
            accountNumbers.push({ error: 'Token not found' });
          }
        });
        return accountNumbers;
      });

      // Call the detokenize method
      await tokenController.detokenize(req, reply);

      // Verify
      expect(reply.code).toHaveBeenCalledWith(200);
      const jsonResponse = JSON.parse(reply.send.mock.calls[0][0]);
      expect(jsonResponse.accountNumbers.length).toEqual(2);
    });
  });

});
