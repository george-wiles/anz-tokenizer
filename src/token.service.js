const { v4: uuidv4 } = require('uuid');
const TokenDatabase = require('./database.service');

class TokenService {

  constructor() {
    this.tokenDB = new TokenDatabase();
  }

  async tokenize(accountNumbers) {
    const tokenizedData = await Promise.all(accountNumbers.map(async (accountNumber) => {
      let token = await this.tokenDB.findTokenByAccountNumber(accountNumber);
      if (!token) {
        token = uuidv4();
        const tokenData = {
          token: token,
          accountNumber: accountNumber
        };
        await this.tokenDB.insertToken(tokenData)
      }
      return {token};
    }));
    return tokenizedData;
  }

  async detokenize(tokensToDetokenize) {
    const detokenizedData = await Promise.all(tokensToDetokenize.map(async token => {
      const accountNumber = await this.tokenDB.findAccountNumberByToken(token);
      if (accountNumber) {
        return { accountNumber };
      } else {
        return { error: 'Token not found' };
      }
    }));
    return detokenizedData;
  }

}

module.exports = TokenService;
