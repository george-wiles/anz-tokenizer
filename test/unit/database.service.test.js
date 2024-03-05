const TokenDatabase = require('../../src/database.service');

describe('TokenDatabase', () => {
  let tokenDB;

  beforeEach(() => {
    tokenDB = new TokenDatabase();
  });

  afterEach(() => {
  });

  it('should insert token data into the tokens collection', async () => {
    // Arrange
    const tokenData = { token: 'abc123', accountNumber: '1234567890' };
    // Act
    await tokenDB.insertToken(tokenData);
    // Assert
    expect(await tokenDB.findAccountNumberByToken('abc123')).toEqual('1234567890');
    expect(await tokenDB.findTokenByAccountNumber('1234567890')).toEqual('abc123');
  });


  it('should return null on not found', async () => {
    // Arrange
    const tokenData = { token: 'abc123', accountNumber: '1234567890' };
    // Act
    await tokenDB.insertToken(tokenData);
    // Assert
    expect(await tokenDB.findAccountNumberByToken('not exist')).toBeNull();
    expect(await tokenDB.findTokenByAccountNumber('not exist')).toBeNull();
  });

});

