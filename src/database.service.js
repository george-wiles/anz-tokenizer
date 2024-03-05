const Loki = require('lokijs');

class TokenDatabase {
  constructor(filename) {
    this.db = new Loki(filename);
    this.tokens = this.db.addCollection('tokens', { unique: ['token'] });
    this.tokens.ensureUniqueIndex('accountNumber');
  }

  async insertToken(tokenData) {
    this.tokens.insert(tokenData);
  }

  async findTokenByAccountNumber(accountNumber) {
    const item = this.tokens.findOne({ accountNumber });
    return (item) ? item.token : null;
  }

  async findAccountNumberByToken(token) {
    const item = this.tokens.findOne({ token });
    return (item) ? item.accountNumber : null;
  }

}

module.exports = TokenDatabase;
