const { v4: uuidv4 } = require('uuid');
const tokenDB = require('./database.service');

class TokenService {

  static async tokenize(accountNumbers) {
    const tokenizedData = accountNumbers.map(accountNumber => {
      const token = uuidv4();
      tokenDB.insert({ token, originalAccountNumber: accountNumber });
      return { token };
    });
    return tokenizedData;
  }

  static async detokenize(tokensToDetokenize) {
    const detokenizedData = tokensToDetokenize.map(token => {
      const tokenData = tokenDB.findOne({ token });
      if (tokenData) {
        return { originalAccountNumber: tokenData.originalAccountNumber };
      } else {
        return { error: 'Token not found' };
      }
    });
    return detokenizedData;
  }

}

module.exports = TokenService;
