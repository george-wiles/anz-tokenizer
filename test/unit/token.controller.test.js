const TokenController = require('../../src/token.controller');

describe('TokenController', () => {
  let tokenServiceMock;
  let tokenController;

  beforeEach(() => {

    tokenServiceMock = {
      tokenize: jest.fn(),
      detokenize: jest.fn()
    };

    tokenController = new TokenController();
    tokenController.tokenService = tokenServiceMock;
  });

  describe('tokenize', () => {
    it('should call TokenService.tokenize with account numbers from request body', async () => {
      // Arrange
      const req = { body:  [123, 456] };
      const reply = { code: jest.fn().mockReturnThis(), send: jest.fn() };
      tokenServiceMock.tokenize.mockResolvedValue(['token1', 'token2']);
      // Act
      await tokenController.tokenize(req, reply);
      // Assert
      expect(tokenServiceMock.tokenize).toHaveBeenCalledWith([123, 456]);
    });
  });

  describe('detokenize', () => {
    it('should call TokenService.detokenize with tokens from request body', async () => {
      // Arrange
      const req = { body:  ['token1', 'token2'] };
      const reply = { code: jest.fn().mockReturnThis(), send: jest.fn() };
      tokenServiceMock.detokenize.mockResolvedValue([789, 101]);
      // Act
      await tokenController.detokenize(req, reply);
      // Assert
      expect(tokenServiceMock.detokenize).toHaveBeenCalledWith(['token1', 'token2']);
    });
  });
});
